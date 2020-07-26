import typescript from 'rollup-plugin-typescript2'
import sourceMaps from 'rollup-plugin-sourcemaps'
import JsonPlugin from 'rollup-plugin-json'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

const json = require('./package.json')

export default {
  input: './src/main.ts',
  output: [
    {
      file: json.main,
      format: 'umd',
      name: 'main',
      sourcemap: true,
      minify: true
    },
    {
      file: json.module,
      format: 'es',
      sourcemap: true,
      minify: true
    },
  ],
  plugins: [
    JsonPlugin(),
    typescript({
      useTsconfigDeclarationDir: true,
      clean: true,
      abortOnError: true
    }),
    sourceMaps(),
    nodeResolve(),
    commonjs({
      include: [
        /src/,
        /node_modules\/prop-types/,
        /node_modules\/hoist-non-react-statics/,
        /node_modules\/invariant/,
        /node_modules\/react-is/,
        /node_modules\/warning/,
        /node_modules\/chalk/,
        /node_modules\/inquirer/,
        /node_modules\/request-promise-any/,
        /node_modules\/ora/,
        /node_modules\/download-git-repo/,
        /node_modules\/metalsmith/,
        /node_modules\/handlebars/,
        /node_modules\/rimraf/,
        /node_modules\/fs/,
      ],
    }),
  ],
}