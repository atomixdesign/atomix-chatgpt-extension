const path = require('path');

module.exports = ({ config , ...remainting}) => {
  config.resolve.modules = [
    path.resolve(__dirname, ".."),
    "node_modules",
  ]
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, '../'),
  }

  return config
}
