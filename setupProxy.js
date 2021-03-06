// setupProxy.js
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/api', {
      // target: 'http://118.190.208.149:9000',
      target: 'http://localhost:9000',
      changeOrigin: true,
      pathRewrite: function(path) {
        return path.replace('/api', '');
      }
    })
  );
};
