import mongoose from "mongoose";
import { config } from "dotenv";
import debug from "debug";

config();

const DEBUG = debug("dev");

const connectString = process.env.DEV_DB

const dbOptions = {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
}

mongoose
    .connect(connectString, dbOptions)
    .then(() => {
        DEBUG('MongoDB is successfully connected');
    })
    .catch((error) => {
        DEBUG('MongoDB could not connect successfuly');
        DEBUG(error);
    })