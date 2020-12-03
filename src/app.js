import express from 'express';
import logger from 'morgan';
// import { NotFoundError } from './helpers/errorHandler';
import { successRespond, errorRespond } from './helpers/responder'

const app = express()


//if you are in  development or production environment, use morgan
if (["development", "production"].includes(process.env.NODE_ENV)) {
    app.use(logger("dev"));
  }


app.get("/", (_, res) => successRespond(res, 200, "Welcome to the authencation root folder"))

/* app.all("*", (_, res) => {
    throw new NotFoundError('Resource not found on this server');
  }); */


app.get("*", (_, res, next) => errorRespond(404, "The route you are requesting for does not exit", next))



export default app;