import express from 'express';
import logger from 'morgan';

const app = express()

app.get("/", (_, res) => {
    res.status(200).json({
        status: "success",
        message: "Authentication root folder"
    });
});


export default app;