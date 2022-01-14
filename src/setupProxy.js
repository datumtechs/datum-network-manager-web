const {
  createProxyMiddleware
} = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/metis-admin', {
      // target: 'http://192.168.21.26:8080',
      target: 'http://192.168.10.150:9090',
      // target: 'http://192.168.120.131:9090',
      // target: 'http://192.168.10.146:9090',
      changeOrigin: true,
      pathRewrite: {
        '^/metis-admin': '/metis-admin',
      },
    }),
  )
}