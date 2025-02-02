const Koa = require("koa");
const parser = require("koa-bodyparser");
const router = require("./router");
const logger = require("koa-logger")
const cors = require("@koa/cors");
const connectDB = require("./db"); 

const startCrawler = require("./crawler/main"); // Import the crawler function

const App = new Koa();
const PORT = process.env.PORT || 3000;

App
  .use(parser())
  .use(logger())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

(async () => {
    // Here we try to run the crawler. 
    // Calling the crawler module here is not ideal but for simplicity sake, I did. 
    // Why not? If this is in production, I don't want an app build to trigger a call
    // this can be done using an endpoint trigger instead. 

    try {
      console.log("🚀 Connecting to MongoDB...");
      await connectDB(); // ✅ Connect to MongoDB before starting the server

      console.log("🚀 Starting crawler...");
      await startCrawler(); // ✅ Runs the crawler asynchronously
      console.log("✅ Crawler started successfully.");
    } catch (error) {
        console.error("❌ Crawler failed to start:", error);
    }

    // ✅ `App.listen()` should be the LAST call, batched from the start of the project. 
    App.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}/`);
    });
})();