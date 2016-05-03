var config = {
  uploadsPath: './public/uploads/',
  staticPath: './public',
  mongooseOptions: { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } },
  mongoDbUri: "mongodb://admin:132435@ds059375.mongolab.com:59375/gallerydb",
  adminLogin: "ИванХаритонов",
  adminPass: "132435"
};

module.exports = config;