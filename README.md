# A Dev Test Using Crawlee

## Node Server + Koa 

## Getting Started

```
- Install dependencies
```
cd <project_name>
npm install
```

- Build and run the project in JS
```
npm run build
npm run start
```

## Pre-reqs
To build and run this app locally you will need:
- Install [Node.js](https://nodejs.org/en/)

## Features:
 * Nodemon - server auto-restarts when code changes
 * Koa
 * Postman (newman) integration tests
 * Cron jobs prepared

## Included middleware:
 * @koa/router
 * koa-bodyparser
 * JWT auth koa-jwt
 * Helmet (security headers)
 * CORS

```
## Running the build

| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Does the same as 'npm run serve'. Can be invoked with `npm start`                                 |
| `build`                   | Full build. Runs ALL build tasks (`build-ts`, `lint`, `copy-static-assets`)                       |
| `serve`                   | Runs node on `dist/server/server.js` which is the apps entry point                                |
| `watch-server`            | Nodemon, process restarts if crashes. Continuously watches `.ts` files and re-compiles to `.js`   |


# Register cron jobs
[Cron](https://github.com/node-cron/node-cron) dependency has been added to the project together with types. A `cron.ts` file has been created where a cron job is created using a cron expression configured in `config.ts` file. 

```
import { CronJob } from 'cron';
import { config } from './config';

const cron = new CronJob(config.cronJobExpression, () => {
    console.log('Executing cron job once every hour');
});

export { cron };
```

From the `server.ts`, the cron job gets started:

```
import { cron } from './cron';
// Register cron job to do any action needed
cron.start();
```


## CORS
This boilerplate uses @koa/cors, a simple CORS middleware for koa. If you are not sure what this is about, click [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

```
// Enable CORS with default options
app.use(cors());
```
Have a look at [Official @koa/cors docs](https://github.com/koajs/cors) in case you want to specify 'origin' or 'allowMethods' properties.

## Helmet
This boilerplate uses koa-helmet, a wrapper for helmet to work with koa. It provides important security headers to make your app more secure by default. 

Usage is the same as [helmet](https://github.com/helmetjs/helmet). Helmet offers 11 security middleware functions (clickjacking, DNS prefetching, Security Policy...), everything is set by default here.

```
// Enable helmet with default options
app.use(helmet());
```

Have a look at [Official koa-helmet docs](https://github.com/venables/koa-helmet) in case you want to customize which security middlewares are enabled.


# Dependencies
Dependencies are managed through `package.json`.
In that file you'll find two sections:

## dependencies
| Package                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| dotenv                          | Loads environment variables from .env file.                           |
| koa                             | Node web framework.                                                   |
| koa-bodyparser                  | A bodyparser for koa.                                                 |
| koa-jwt                         | Middleware to validate JWT tokens.                                    |
| @koa/router                      | Router middleware for koa.                                            |
| koa-helmet                      | Wrapper for helmet, important security headers to make app more secure| 
| @koa/cors                       | Cross-Origin Resource Sharing(CORS) for koa                           |


## devDependencies
| Package                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| @types                          | Dependencies in this folder are `.d.ts` files used to provide types   |
| nodemon                         | Utility that automatically restarts node process when it crashes      |
| eslint                          | Linter for Javascript/TypeScript files                                |
