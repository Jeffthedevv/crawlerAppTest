const Koa = require("koa");
const parser = require("koa-bodyparser");
const router = require("./router");
const logger = require("koa-logger")
const cors = require("@koa/cors");

const startCrawler = require("./crawler/main"); // Import the crawler function

const App = new Koa();
const PORT = process.env.PORT || 3000;

// ✅ Middleware must be added BEFORE calling `App.listen()`
App
  .use(parser())
  .use(logger())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

(async () => {
    try {
        console.log("🚀 Starting crawler...");
        await startCrawler(); // ✅ Runs the crawler asynchronously
        console.log("✅ Crawler started successfully.");
    } catch (error) {
        console.error("❌ Crawler failed to start:", error);
    }

    // ✅ `App.listen()` should be the LAST call
    App.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}/`);
    });
})();