const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/rosettanet-admin', {
      // target: 'http://192.168.21.201:9090', // 树禹
      target: 'http://192.168.10.150:9090',
      changeOrigin: true,
      pathRewrite: {
        '^/rosettanet-admin': '/rosettanet-admin',
      },
    }),
  )
}
