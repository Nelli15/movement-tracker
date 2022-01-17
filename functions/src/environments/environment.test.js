const prodEnvironment = require('./environment')

module.exports = {
  ...prodEnvironment,
  isTest: true,
  schema: {
    movements: 'test-movements'
  }
}
