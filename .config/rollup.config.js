import * as pkg from '../package.json'
import babel from '@rollup/plugin-babel'
import filesize from 'rollup-plugin-filesize'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'

const buildDate = Date()

const headerLong = `/*!
* ${pkg.name} - ${pkg.description}
* @version ${pkg.version}
* ${pkg.homepage}
*
* @copyright ${pkg.author.name}
* @license ${pkg.license}
*
* BUILT: ${buildDate}
*/;`

const headerShort = `/*! ${pkg.name} v${pkg.version} ${pkg.license}*/;`

const getBabelConfig = (targets, corejs = false) =>
  babel({
    include: 'src/**',
    babelrc: false,
    babelHelpers: 'runtime',
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: targets || pkg.browserslist
        }
      ]
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: corejs,
          helpers: true,
          useESModules: true
        }
      ]
    ]
  })

// When few of these get mangled nothing works anymore
// We loose literally nothing by let these unmangled
const classes = []

const config = (node = false, min = false, esm = false) => ({
  external: ['@svgdotjs/svg.js'],
  input: 'src/svg.with_constraint.js',
  output: {
    file: esm
      ? './dist/svg.with_constraint.esm.js'
      : node
      ? './dist/svg.with_constraint.node.js'
      : min
      ? './dist/svg.with_constraint.min.js'
      : './dist/svg.with_constraint.js',
    format: esm ? 'esm' : node ? 'cjs' : 'iife',
    sourcemap: true,
    banner: headerLong,
    freeze: false,
    globals: {
      '@svgdotjs/svg.js': 'SVG'
    }
  },
  treeshake: {
    // property getter have no sideeffects
    propertyReadSideEffects: false
  },
  plugins: [
    resolve(),
    getBabelConfig(node && 'maintained node versions'),
    commonjs(),
    filesize(),
    !min
      ? {}
      : uglify({
          mangle: {
            reserved: classes
          },
          output: {
            preamble: headerShort
          }
        })
  ]
})

// [node, minified, esm]
const modes = [[false], [false, true], [false, false, true]]

export default modes.map(m => config(...m))