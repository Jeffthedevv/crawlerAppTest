
const Router = require("koa-router");
const router = new Router();

const { examplePostController } = require("./controllers/example_post_controller");
const { exampleGetController } = require('./controllers/example_get_controller');

router.post("/postexample", examplePostController);
router.get("/getexample", exampleGetController);

module.exports = router;
