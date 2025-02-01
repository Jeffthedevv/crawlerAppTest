module.exports = function koaStatus (options) {
  options = options || {}
  options.path = options.path || '/status'
  return function * statusEndpoint (next) {
    if (this.request.path === options.path) {
      this.status = 200
    }
    yield next
  }
}
