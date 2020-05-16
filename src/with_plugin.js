// Add builders to polygon
import * as SVG from "@svgdotjs/svg.js"
SVG.extend(SVG.Shape, {
  with(constraint) {
    let box = (this.target ? this.target() : this).bbox()

    let [myCardinal, targetXY] = Object.entries(constraint)[0]
    let newCenter = findNewCenter(myCardinal, box, targetXY)
    return this.center(newCenter.x, newCenter.y)
  },

  nw(dx = 0, dy = 0) {
    return positionOf(this, "nw", dx, dy)
  },

  n(dx = 0, dy = 0) {
    return positionOf(this, "n", dx, dy)
  },

  ne(dx = 0, dy = 0) {
    return positionOf(this, "ne", dx, dy)
  },

  e(dx = 0, dy = 0) {
    return positionOf(this, "e", dx, dy)
  },

  se(dx = 0, dy = 0) {
    return positionOf(this, "se", dx, dy)
  },

  s(dx = 0, dy = 0) {
    return positionOf(this, "s", dx, dy)
  },

  sw(dx = 0, dy = 0) {
    return positionOf(this, "sw", dx, dy)
  },

  w(dx = 0, dy = 0) {
    return positionOf(this, "w", dx, dy)
  },

  c(dx = 0, dy = 0) {
    return positionOf(this, "c", dx, dy)
  }

})


// we want to box the element defined by myBox so that its corner
// denoted by myCardinal becomes coincident with targetXY

function findNewCenter(myCardinal, myBox, targetXY) {

  let cx = targetXY[0]
  let cy = targetXY[1]

  switch (myCardinal) {
    case "c":
      break

    case "n":
      cy += myBox.height/2
      break

    case "ne":
      cx -= myBox.width/2
      cy += myBox.height/2
      break

    case "e":
      cx -= myBox.width/2
      break

    case "se":
      cx -= myBox.width/2
      cy -= myBox.height/2
      break

    case "s":
      cy -= myBox.height/2
      break

    case "sw":
      cx += myBox.width/2
      cy -= myBox.height/2
      break

    case "w":
      cx += myBox.width/2
      break

    case "nw":
      cx += myBox.width/2
      cy += myBox.height/2
      break
  }
  return { x: cx, y: cy }
}


function _offsetFromCenter(bbox, corner) {
  let
    halfHeight = bbox.height / 2,
    halfWidth = bbox.width / 2

  switch (corner) {
    case "nw": return { x: -halfWidth, y: -halfHeight }
    case "n":  return { x: 0,          y: -halfHeight }
    case "ne": return { x: halfWidth,  y: -halfHeight }
    case "e":  return { x: halfWidth,  y: 0 }
    case "se": return { x: halfWidth,  y: halfHeight }
    case "s":  return { x: 0,          y: halfHeight }
    case "sw": return { x: -halfWidth, y: halfHeight }
    case "w":  return { x: -halfWidth, y: 0 }
    case "c":  return { x: 0,          y: 0 }
    default:
      throw new Error("unknown cardinal: " + corner)
  }
}

function positionOf(element, corner, dx, dy) {
  let box = (element.target ? element.target() : element).bbox()
  let offset = _offsetFromCenter(box, corner)
  return [  box.cx + offset.x + dx, box.cy + offset.y + dy ]
}
