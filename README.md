# Constraint-based placement for SVG.JS

~~~ js
let r1 = svg.rect(20,30).fill("#a66").center(100,100)

// position a rectangle diagonally off the south-east corner
let r2 = svg.rect(30, 40).with({nw: r1.se()}).fill("#6a6")

// and off the south-west corner, offset by 10 pixels away from r2
let r3 = svg.rect(30, 40).with({ne: r1.sw(-10, 10)}).fill("#66A")

// «r1.cardinal point» just returns an [ x, y ] array, so
let l1 = svg.line(...r3.se(), ...r2.sw()).stroke("#fff")
~~~

This plugin adds 9 position query functions and one position setting
function to all svg.js shapes.

### Install

t.b.a. For now, npm/yarn i from this URL

### Position query functions

The position-query functions represent the cardinal points and center of
the shape's bounding box:

    nw ---  n  --- ne
    |       |       |
    w       c       e
    |       |       |
    sw ---  s  --- se

The functions can be called with no arguments, in which case the
coordinates of the corresponding point are returns. THey can also be
called with two offset parameters, which are added to the returned X and
Y respectively.

~~~ js
let r1 = svg.rect(20,30).fill("#a66").center(100,100)

r1.c()           // => [100, 100]
r1.nw()         // => [ 90, 85 ]
r1.ne(-5, -5)   // [ 85, 80 ]
~~~

### `with`: The Position Setting Function

The `with` function takes a parameter of the form

~~~ js
{ «cardinal»:  [ targetx, targety ] }
~~~

for example:

~~~ js
svg.rect(40, 50).with({ nw: [ 150, 120 ]})

svg.rect(40, 50).with({ sw: r1.ne(20, 20) })
~~~

Internally, it uses the shape's bounding box to determine the offset of
the given cardinal point from the center, and then works out where the
center should be to place the cardinal point at the target. It then
calls the `center` function to place the shape.
