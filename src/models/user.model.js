import mongoose from "mongoose";
import { config } from "dotenv";

config();

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    
      },
      userName: {
        type: String,
        required:true,
        unique: true
      },
      password: {
        type: String,
        required:true,
        minlength: 8,
      },
});

export default mongoose.model('User', userSchema)