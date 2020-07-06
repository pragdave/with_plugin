/// <reference types="jest" />

const SVG = require("@svgdotjs/svg.js")
require("../dist/svg.with_constraint.js")
const assert = require("assert")


let svg = SVG()
const rect = svg.rect(40, 50).center(50,60)

assert.deepEqual(rect.c(), [ 50, 60 ])