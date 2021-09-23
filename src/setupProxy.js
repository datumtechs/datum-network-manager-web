const {
  createProxyMiddleware
} = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/metis-admin', {
      // target: 'http://192.168.21.201:9090', // 树禹
      target: 'http://192.168.10.146:9091',
      changeOrigin: true,
      pathRewrite: {
        '^/metis-admin': '/metis-admin',
      },
    }),
  )
}