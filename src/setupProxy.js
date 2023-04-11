const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = app => {
    app.use(createProxyMiddleware("/api/v2/ranger", {
        target: "wss://beta.elephantccx.com",
        secure: false,
        ws: true,
        changeOrigin: true
    }))
}
