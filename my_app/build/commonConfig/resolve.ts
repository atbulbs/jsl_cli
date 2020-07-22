import { Resolve } from 'webpack';
const path = require('path')

const resolveConfig: Resolve = {
  extensions: ['.js', '.ts', '.jsx', '.json'],
  alias: {
    "@root": path.resolve(__dirname, '../../'),
  }
}

module.exports = resolveConfig
