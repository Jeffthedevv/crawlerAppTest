const Koa = require("koa");
const parser = require("koa-bodyparser");
const router = require("./router");
const logger = require("koa-logger")
const cors = require("@koa/cors");
const serve = require("koa-static");
const mount = require("koa-mount");

const App = new Koa();
const PORT = process.env.PORT || 3000;
const static_pages = new Koa();

App
  .use(parser())
  .use(logger())
  .use(cors())

  .use(mount("/", static_pages))
    static_pages.use(serve(__dirname + "/front-end/build"))

  .use(router.routes())
  .use(router.allowedMethods())
  
  .listen(PORT, () => {
    console.log(`🚀 Listening on port %s. Visit http://localhost:%s/`, PORT, PORT, ` 🚀`);
  });
