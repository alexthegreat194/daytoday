const pino = require('pino');
const pretty = require('pino-pretty');

const logger = pino(pretty())

logger.level = 'debug' || process.env.LOG_LEVEL

module.exports = { logger };