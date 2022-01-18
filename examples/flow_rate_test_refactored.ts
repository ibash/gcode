import Builder, { Buildable, Position } from '~/builder'
import fs from 'fs'
import path from 'path'
import { Rrf } from '~/flavors/rrf'

class CustomBuilder extends Rrf(Builder) {
  constructor() {
    // config
    super({
      limits: {
        x: { min: 0, max: 288 },
        y: { min: 0, max: 305 }
      },
      speeds: {
        retraction: 35 * 60,
        travel: 50 * 60
      }
    })
  }

  start() {
    this.home()
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

    return this
  }

  end() {
    // end gcode, too lazy to make this a function
    this.exec(`
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
    return this
  }

  runTest() {
    const temperatures = [215, 220, 225, 230, 235]
    // volumetric flow rates in mm^3/s
    const rates = [3, 6, 9, 12, 15]

    temperatures.forEach((temperature, i) => {
      this.prime(temperature, i)

      rates.forEach((rate, j) => {
        this.comment(`Testing temp=${temperature}, rate=${rate}`)
          .display(`Testing temp=${temperature}, rate=${rate}`)
          .extrudePile(rate, i, j)
      })
    })

    return this
  }

  // prime in the top right corner, i is used as an offset so we don't have
  // overlapping pieces of plastic
  prime(temperature: number, i: number) {
    const { limits, speeds } = this.config

    const start = { x: limits.x.max - 10, y: limits.y.max, z: 0.2 }
    start.y = start.y - i * 50

    const end = { x: start.x, y: start.y - 40, z: start.z, e: 20, f: 17 * 60 }

    this.speed(speeds.travel)
      .move(start)
      .setTemperature({ temperature: temperature, tool: 0 })
      .waitForTemperature({ tool: 0 })
      .move(end)

    return this
  }

  extrudePile(rate: number, i: number, j: number) {
    const { speeds } = this.config
    // weight = pi * (1.75/2)^2 * <length cm> * <density cm^3/g>
    // volumetric flow rate = extrusion speed * pi * (1.75/2)^2
    // extrusion speed = volumetric flow rate /  (pi * (1.75/2)^2)
    // use mm/s here, we'll convert to mm/min when setting
    const speed = rate / (Math.PI * Math.pow(1.75 / 2, 2))

    // start at the top left of the build and proceed to the bottom left -- we
    // do this because my fan shroud is on the right, so we can avoid hitting it
    // when we kiss the build plate
    const position = {
      x: 50 * (i + 1),
      y: 50 * (j + 1),
      z: 50
    }

    builder
      .retract()
      .speed(speeds.travel)
      .move(position)
      .unretract()

      // do the actual extrusion
      // TODO(ibash) marlin has a max extrusion limit (EXTRUDE_MAXLENGTH)... does reprap have one too?
      //.extrude(500, speed * 60)
      .extrude(50, speed * 60)

      // kiss the plate to cut off the ooze, we kiss just to the right of the
      // pile we made, then move back up to help cut the ooze
      .kiss(position)
  }

  kiss(position: Position) {
    const { speeds } = this.config
    this.speed(speeds.travel)
      .move({ x: position.x + 20, y: position.y, z: 0.2 })
      .move(position)
    return this
  }

  retract() {
    this.extrude(-0.8, this.config.speeds.retraction)
    return this
  }

  unretract() {
    this.extrude(0.8, this.config.speeds.retraction)
    return this
  }
}

const builder = new CustomBuilder()

builder.start().runTest().end()

fs.writeFileSync(path.join(__dirname, 'flow_rate_test.gcode'), builder.build())
