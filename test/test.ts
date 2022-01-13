import Builder from '~/builder'
import test from 'ava'
import { Rrf } from '~/flavors/rrf'

test('should build', (t) => {
  const ExtendedBuilder = Rrf(Builder)
  const builder = new ExtendedBuilder()

  builder.home().move({ x: 0, y: 0 }).move({ x: 2 })

  t.is(
    builder.build(),
    `G28
G1 X0 Y0
G1 X2`
  )

  t.pass()
})
