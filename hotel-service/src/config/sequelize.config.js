require('ts-node/register');
// This line enable typescipt support
const config = require('./db.config');
module.exports = config.default || config;
