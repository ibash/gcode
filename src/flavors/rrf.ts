import { Buildable } from '~/builder'

enum InputShapingType {
  NONE = 'none',
  DAA = 'daa'
}

enum MoveType {
  TERMINATE = '0',
  INDIVIDUAL = '1'
}

export function Rrf<TBase extends Buildable>(Base: TBase) {
  return class Rrf extends Base {
    home(params?: { x?: boolean; y?: boolean; z?: boolean }) {
      if (params) {
        this.out('G28', params)
      } else {
        this.out('G28')
      }
      return this
    }

    bedLevel() {
      this.out('G32')
      return this
    }

    move(params: {
      x?: number
      y?: number
      z?: number
      e?: number
      f?: number
      h?: number
    }) {
      this.out('G1', params)
      return this
    }

    setBedTemperature(temperature: number) {
      this.out('M140', { s: temperature })
      return this
    }

    waitForBedTemperature(temperature: number) {
      this.out('M190', { s: temperature })
      return this
    }

    tool(tool: number) {
      this.out(`T${tool}`)
      return this
    }

    setTemperature(temperature: number, tool?: number) {
      this.out('G10', { s: temperature, p: tool })
      return this
    }

    waitForTemperature(tool?: number) {
      this.out('M116', { p: tool })
      return this
    }

    speed(speed: number) {
      return this.move({ f: speed })
    }

    extrude(amount: number, speed?: number) {
      return this.move({ e: amount, f: speed })
    }
  }
}
