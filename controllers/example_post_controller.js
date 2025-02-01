const HttpStatus = require("http-status");

const examplePostController = async(ctx, next) => {
  console.log("examplePostController() Init");

  ctx.body = "exampleController Is Responding.";
  ctx.status = HttpStatus.OK;
  await next();
}
module.exports = { examplePostController };
