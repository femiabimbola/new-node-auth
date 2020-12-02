import http from 'http';
import debug from 'debug';
import { config } from 'dotenv';
import app from './app'

config();

const DEBUG = debug("dev"); // DEBUG=dev
const PORT = process.env.PORT || 7000;

// check what create server is
const server = http.createServer(app);


server.listen(PORT, () => {
    DEBUG(`Server is running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`)
})







