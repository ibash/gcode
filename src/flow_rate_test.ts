import fs from 'fs'
import Builder from '~/builder'
import { Rrf } from '~/flavors/rrf'

const ExtendedBuilder = Rrf(Builder)
const builder = new ExtendedBuilder()

// TODO(ibash) add start gcode and end gcode
builder
  .home()
  .speed(50 * 60)
  .move({ x: 10, y: 10, z: 20 })
  .exec(
    `
    G21 ; set units to millimeters
    G90 ; absolute cooridinates
    M83 ; relative distances for extrusion`
  )
  .tool(0)

const temperatures = [215, 220, 225, 230, 235]

// volumetric flow rates in mm^3/s
const rates = [3, 6, 9, 12, 15]

// weight = pi * (1.75/2)^2 * 50 * 1.25
// where density is 1.25 g/cm^3
// and extruding 50cm

temperatures.forEach((temperature, i) => {
  builder
    .move({ x: 10, y: 10 })
    .setTemperature(temperature)
    .waitForTemperature()
    // purge a bit of filament to prime
    .extrude(20, 3 * 60)

  rates.forEach((rate, j) => {
    // weight = pi * (1.75/2)^2 * <length cm> * <density cm^3/g>
    // volumetric flow rate = extrusion speed * pi * (1.75/2)^2
    // extrusion speed = volumetric flow rate /  (pi * (1.75/2)^2)
    // use mm/s here, we'll convert to mm/min when setting
    const extrusionSpeed = rate / (Math.PI * Math.pow(1.75 / 2, 2))

    // console.log(`EXTRUSION SPEED... rate=${rate} speed=${extrusionSpeed}`)

    builder
      .comment(`Testing temp=${temperature}, rate=${rate}`)
      // retract
      .extrude(-0.8, 35 * 60)

      // move to position, we'll put all the same temperatures in a row
      .move({ x: 20 * j + 10, y: 20 * i + 10, f: 50 * 60 })

      // unretract
      .extrude(0.8, 35 * 60)

      // do the actual extrusion
      // TODO(ibash) marlin has a max extrusion limit (EXTRUDE_MAXLENGTH)... does reprap have one too?
      .extrude(500, extrusionSpeed * 60)
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

fs.writeFileSync('./flow_rate_Test.gcode', builder.build())
