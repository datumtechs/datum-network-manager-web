const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://10.1.1.48:6800',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  )
}
