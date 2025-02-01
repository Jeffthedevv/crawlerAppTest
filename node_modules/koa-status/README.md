Koa Status
----------
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Installs a `/status` endpoint that will always respond with status code `200` if the server is up.

Instalation
===========

```bash
$ npm install koa
```

Example
=======

```js
var koa = require('koa')
var koaStatus = require('koa-status')

var app = koa()
app.use(koaStatus())
app.listen(1234)
```

Running tests
=============

```bash
$ make test
```