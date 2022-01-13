// gcode dsl

// all config is optional until it's used... e.g. if xmax is never used, then it
// doesn't need to be set.
// all config _is_ strongly typed, however... maybe typescript?
gcode.config({
  dialect: 'rrf',
  xMax: 280,
  yMax: 280
  // ...
})

// Thread local storage... don't want to have to pass context around everywhere,
// so assume global. Maybe can let people create context...
function example() {
  // TODO(ibash) instead of absolute values xMax/yMax could be symbols, so they
  // don't need to be explicitly set until the gcode is serialized...
  // that is, could make it so that this compiles/works:
  //
  // gcode.move({x: gcode.xMax()})
  // gcode.config({xMax: 100})
  //
  // gcode.toString()
  //
  //
  let xMax = gcode.xMax()
  let yMax = gcode.yMax()

  let gcode = new Gcode().home().move({ x: 0, y: 0 }).move({ x: xMax, y: yMax })

  // gives the gcode
  console.log(result.toString())

  // loops should work...
  let moveAlot = new Gcode()
  for (var i = 0; i < 100; i++) {
    moveAlot = moveAlot.move({ x: 0, y: 0 }).move({ x: xMax, y: yMax })
  }

  // and appending
  let allTogether = gcode.append(moveAlot)

  // oh, and decorating! (i.e. macros)
  // for example, below we define what calling "gcode.home()" actually means...
  Gcode.decorate({
    home(gcode) {
      gcode
        .moveRelative({ z: 4, f: 500, h: 2 })
        // can mixin gcode directly whenever you want
        .execute('G1 X-350 F3600 H1')
        .move({ x: 4, f: 600 })
        .move({ x: -10, h: 1 })
        .move({ z: -4, f: 500, h: 2 })
    },

    pause(gcode) {
      // ...
    }
  })
}
