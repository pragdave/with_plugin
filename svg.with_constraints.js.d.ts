type Coordinate = [ number, number ]

declare module '@svgdotjs/svg.js' {
  interface Element {
    c(x: number, y: number): Coordinate
    c(): Coordinate
  }
}