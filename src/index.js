import http from 'http';
import debug from 'debug';
import { config } from 'dotenv';
import app from './app';
import './db/mongoose';

config();

const DEBUG = debug("dev"); // DEBUG=dev
const PORT = process.env.PORT || 7000;

// check what create server is
const server = http.createServer(app);

process.on("uncaughtException", (error, origin) => {
    DEBUG(`The uncaught exception error is: ${error.message}`);
    DEBUG(`The origin of the error is at : ${origin}`)
    process.exit(1)
});

process.on("unhandledRejection", (reason, promise) => {
    DEBUG(`The reason the promise is rejected is: ${reason.message}`);
    DEBUG( `The promise rejected is:  ${promise}`);
    process.exit(1);
    });


server.listen(PORT, () => {
    DEBUG(`Server is running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`)
})
