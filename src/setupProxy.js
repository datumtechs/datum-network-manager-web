const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/rosettanet-admin', {
      target: 'http://192.168.10.146:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/rosettanet-admin': '/rosettanet-admin',
      },
    }),
  )
}
