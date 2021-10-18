const {
  createProxyMiddleware
} = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/metis-admin', {
      // target: 'http://192.168.10.146:9091',
      target: 'http://192.168.120.157:9090',
      changeOrigin: true,
      pathRewrite: {
        '^/metis-admin': '/metis-admin',
      },
    }),
  )
}