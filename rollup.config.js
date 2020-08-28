import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'
// import commonjs from 'rollup-plugin-commonjs'
// import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'

const config = {
  input: process.env.input,
  output: [
    {
      file: process.env.output,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    postcss({
      extract: process.env.cssOutput
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    // resolve(),
    // commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(uglify())
}

export default config
