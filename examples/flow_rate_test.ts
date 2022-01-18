import Builder from '~/builder'
import fs from 'fs'
import path from 'path'
import { Rrf } from '~/flavors/rrf'

const ExtendedBuilder = Rrf(Builder)
const builder = new ExtendedBuilder()

// TODO(ibash) add start gcode and end gcode
builder
  .home()
  .speed(50 * 60)
  .move({ x: 10, y: 10, z: 50 })
  .exec(
    `
    G21 ; set units to millimeters
    G90 ; absolute cooridinates
    M83 ; relative distances for extrusion`
  )
  // the filament gets dragged around the bed, hopefully this helps
  .setBedTemperature(60)
  .waitForBedTemperature(60)
  .tool(0)

const temperatures = [215, 220, 225, 230, 235]

// volumetric flow rates in mm^3/s
const rates = [3, 6, 9, 12, 15]

const limits = {
  x: { min: 0, max: 288 },
  y: { min: 0, max: 305 }
}

const positions = {
  prime: { x: limits.x.max - 10, y: limits.y.max, z: 0.2 }
}

const speeds = {
  retraction: 35 * 60,
  travel: 50 * 60
}

// weight = pi * (1.75/2)^2 * 50 * 1.25
// where density is 1.25 g/cm^3
// and extruding 50cm

temperatures.forEach((temperature, i) => {
  const start = { ...positions.prime }
  start.y = start.y - i * 50
  const end = { x: start.x, y: start.y - 40, z: start.z, e: 20, f: 17 * 60 }

  builder
    .speed(speeds.travel)
    .move(start)
    .setTemperature({ temperature: temperature, tool: 0 })
    .waitForTemperature({ tool: 0 })
    .move(end)

  // prime a bit of filament to prime
  //.extrude(30, 5 * 60)

  rates.forEach((rate, j) => {
    // weight = pi * (1.75/2)^2 * <length cm> * <density cm^3/g>
    // volumetric flow rate = extrusion speed * pi * (1.75/2)^2
    // extrusion speed = volumetric flow rate /  (pi * (1.75/2)^2)
    // use mm/s here, we'll convert to mm/min when setting
    const extrusionSpeed = rate / (Math.PI * Math.pow(1.75 / 2, 2))

    // console.log(`EXTRUSION SPEED... rate=${rate} speed=${extrusionSpeed}`)

    // start at the top left of the build and proceed to the bottom left -- we
    // do this because my fan shroud is on the right, so we can avoid hitting it
    // when we kiss the build plate
    const position = {
      x: 50 * (i + 1),
      y: 50 * (j + 1),
      z: 50
    }

    builder
      .comment(`Testing temp=${temperature}, rate=${rate}`)
      .display(`Testing temp=${temperature}, rate=${rate}`)
      // retract
      .extrude(-0.8, speeds.retraction)

      // move to position, we'll put all the same temperatures in a row
      .speed(speeds.travel)
      .move(position)

      // unretract
      .extrude(0.8, speeds.retraction)

      // do the actual extrusion
      // TODO(ibash) marlin has a max extrusion limit (EXTRUDE_MAXLENGTH)... does reprap have one too?
      //.extrude(500, extrusionSpeed * 60)
      .extrude(50, extrusionSpeed * 60)

      // kiss the plate to cut off the ooze, we kiss just to the right of the
      // pile we made, then move back up to help cut the ooze
      .speed(speeds.travel)
      .move({ x: position.x + 20, y: position.y, z: 0.2 })
      .move(position)
  })
})

// end gcode, too lazy to make this a function
builder.exec(`
; end gcode
M400
G10 P0 R0 S0              ; turn off extruder heater
M140 S0                   ; turn off bed heater
M106 S0                   ; turn off parts cooling fan
G91                       ; Relative move
G1 E-1.0 Z+60.0 F1000.0   ; E : Nozzle Up/Bed Down 10mm and retract - (E to exclude from layer count)
G90                       ; Absolute moves
G1 X10 Y280 F3600         ; Move Y-carriage for part removal
G4 S30                    ; Wait 30 seconds (since M84 seems ignored with arguments)
G29 S2                    ; Clear Mesh Bed leveling (if any)
M84                       ; disable motors
                          ; end of end code
`)

fs.writeFileSync(path.join(__dirname, 'flow_rate_test.gcode'), builder.build())
