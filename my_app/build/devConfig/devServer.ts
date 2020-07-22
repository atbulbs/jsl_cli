import WebpackDevServer from 'webpack-dev-server'

const devServerConfig: WebpackDevServer.Configuration = {
  open: true,
  host: '0.0.0.0',
  openPage: '',
  useLocalIp: true,
  port: 8007,
  https: false,
  historyApiFallback: true,
  overlay: {
    errors: true
  },
  hot: true,
  disableHostCheck: true,
  hotOnly: false,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  contentBase: '/',
  // publicPath: '/',
  proxy: {
  }
}

module.exports = devServerConfig
