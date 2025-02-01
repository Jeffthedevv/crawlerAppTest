/* global describe, before, after, it */

var koa = require('koa')
var http = require('http')
var expect = require('chai').expect
var request = require('request-promise')

var koaStatus = require('../koa-status')

function createApp () {
  var app = koa()
  app.use(koaStatus())

  return new Promise(resolve => {
    var server = http.createServer(app.callback())
    server.listen(5932, function () {
      resolve(server)
    })
  })
}

describe('koaStatus', function () {
  var app
  before(function () {
    return createApp().then(function (server) { app = server })
  })
  after(function (done) {
    app.close(done)
  })

  it('should return status 200 from a get to /status', function () {
    return request({
      uri: 'http://localhost:5932/status',
      method: 'GET',
      resolveWithFullResponse: true
    }).then(function (response) {
      expect(response.statusCode).to.equal(200)
    })
  })
})
