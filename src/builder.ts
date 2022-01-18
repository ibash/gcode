// Builder handles
// 1. Setting the config
// 2. Manipulating gcode objects
// 3. Serialization
//
// While the gcode class should handle actually mapping friendly name to gcode
// code

// use mixins to support a customizable, but still strongly typed, builder
// ref: https://www.typescriptlang.org/docs/handbook/mixins.html#constrained-mixins
export type GConstructor<T = {}> = new (...args: any[]) => T
export type Buildable = GConstructor<Builder>

interface Params {
  // TODO(ibash) maybe don't want undefined here
  [k: string]: boolean | number | string | undefined
}

export default class Builder {
  private lines: string[] = []
  private config: any

  constructor(config?: any) {
    // TODO(ibash) strongly type the config
    // some things I want in the config
    // 1. speeds: travel speed, retraction speed, etc
    // 2. build plate size (min/max x, y, z)
    // 3. flavor: to auto construct a builder for the user
    // 4. dry run: automatically skip any temperature setting and extrusions, just move.
    this.config = config || {}
  }

  build() {
    return this.lines.join('\n')
  }

  exec(code: string, params: Params): this
  exec(lines: string): this
  exec(codeOrLines: string, params?: Params) {
    if (params === undefined) {
      this.out(codeOrLines)
    } else {
      this.out(codeOrLines, params)
    }
    return this
  }

  // out accepts multiple formats for gcode
  //
  // e.g. these all work:
  //
  // this.out(`G1 X10 Y10`)
  // this.out('G1', { x: x, y: y })
  // this.out(
  //   `G1 X10 Y10
  //    G1 X1 Y2 Z3`
  // )
  out(code: string, params: Params): void
  out(lines: string): void
  out(codeOrLines: string, params?: Params) {
    let lines: string[]

    if (params === undefined) {
      lines = codeOrLines.trim().split('\n')
    } else {
      let code = codeOrLines
      let line = Object.entries(params)
        .filter(([k, v]) => typeof v !== 'undefined')
        .map(([k, v]) => {
          k = k.toUpperCase()
          if (typeof v === 'boolean') {
            return `${k}`
          } else {
            return `${k}${v}`
          }
        })
        .join(' ')

      line = `${code} ${line}`
      lines = [line]
    }

    // TODO(ibash) maybe some light validation?
    lines = lines.map((line) => line.trim().replace(/\s+/g, ' '))
    this.lines.push(...lines)
  }

  comment(comment: string): this {
    this.out(`; ${comment.trim()}`)
    return this
  }

  // TODO(ibash) want to be able to take in a pre-sliced gcode here too... would
  // be especially cool to programatically change a gcode, for example by
  // changing the z height by some amount (to construct a temperature tower for
  // example)
  append(other: Builder) {
    this.lines.push(...other.lines)
  }
}
