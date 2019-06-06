// Exporting the parser
const Parser = require('./lib/parser');
const buybox = require('./config/buybox');

module.exports = {
  Parser,
  config: {
    buybox
  }
};
