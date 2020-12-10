import mongoose from "mongoose";
import { config } from "dotenv";

config();

const jwtPrivateSecret = process.env.JWT_PRIVATE_SECRET

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


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  userSchema.methods.generateVerificationToken = function () {
    return jwt.sign({ id: this._id }, jwtPrivateSecret, {
      expiresIn: "10d",
      algorithm: "RS256",
    });
  };

export default mongoose.model('User', userSchema)