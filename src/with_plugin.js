import * as SVG from "@svgdotjs/svg.js"

SVG.extend(SVG.Element, {
  with(constraint) {
    let box = (this.target ? this.target() : this).bbox()
    let [myCardinal, targetXY] = Object.entries(constraint)[0]
    let newCenter = findNewCenter(myCardinal, box, targetXY)
    return this.center(newCenter.x, newCenter.y)
  },

  nw(dx = 0, dy = 0) { return positionOf(this, "nw", dx, dy) },
  n (dx = 0, dy = 0) { return positionOf(this, "n",  dx, dy) },
  ne(dx = 0, dy = 0) { return positionOf(this, "ne", dx, dy) },
  e (dx = 0, dy = 0) { return positionOf(this, "e",  dx, dy) },
  se(dx = 0, dy = 0) { return positionOf(this, "se", dx, dy) },
  s (dx = 0, dy = 0) { return positionOf(this, "s",  dx, dy) },
  sw(dx = 0, dy = 0) { return positionOf(this, "sw", dx, dy) },
  w (dx = 0, dy = 0) { return positionOf(this, "w",  dx, dy) },
  c (dx = 0, dy = 0) { return positionOf(this, "c",  dx, dy) }
})

// This table gives the offsets of each cardinal point from the center,
// each expressed as a fraction of the height or width

const Offsets = {
  c:  { x:    0, y:    0 },
  n:  { x:    0, y: -0.5 },
  ne: { x:  0.5, y: -0.5 },
  e:  { x:  0.5, y:    0 },
  se: { x:  0.5, y:  0.5 },
  s:  { x:    0, y:  0.5 },
  sw: { x: -0.5, y:  0.5 },
  w:  { x: -0.5, y:    0 },
  nw: { x: -0.5, y: -0.5 }
}

// we want to move the element defined by myBox so that its corner
// denoted by myCardinal becomes coincident with targetXY

function findNewCenter(myCardinal, myBox, targetXY) {

  let cx = targetXY[0]
  let cy = targetXY[1]
  let offset = _findOffset(myCardinal)

  cx -= offset.x * myBox.height
  cy -= offset.y * myBox.width
  return { x: cx, y: cy }
}

function _findOffset(cardinal) {
  let offset = Offsets[cardinal]
  if (offset)
    return offset
  throw new Error("unknown cardinal:  " + cardinal)
}

function _offsetFromCenter(bbox, cardinal) {
  let offset = _findOffset(cardinal)
  return { x: bbox.width*offset.x, y: bbox.height*offset.y }
}

function positionOf(element, cardinal, dx, dy) {
  let box = (element.target ? element.target() : element).bbox()
  let offset = _offsetFromCenter(box, cardinal)
  return [box.cx + offset.x + dx, box.cy + offset.y + dy]
}
