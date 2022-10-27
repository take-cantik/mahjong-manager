import './alias'

// ------------
// https

if (!process.env.FUNCTION_TARGET || process.env.FUNCTION_TARGET === 'lineBot') {
  exports.lineBot = require('./triggers/https/line-bot')
}

if (!process.env.FUNCTION_TARGET || process.env.FUNCTION_TARGET === 'auth') {
  exports.auth = require('./triggers/https/auth')
}

// ------------
// pubsub

if (!process.env.FUNCTION_TARGET || process.env.FUNCTION_TARGET === 'notification') {
  exports.notification = require('./triggers/pubsub/line-bot')
}
