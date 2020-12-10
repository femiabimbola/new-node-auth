import mongoose from "mongoose";
import { config } from "dotenv";

config();

const jwtPrivateSecret = process.env.JWT_PRIVATE_SECRET;

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

userSchema.pre("save", async function (next) {
  if (!this.password || !this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, parseInt(process.env.HASH) );
  next();
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

userSchema.statics.checkExistingField = async (field, value) => {
  const checkField = await User.findOne({ [`${field}`]: value });

  return checkField;
};

export default mongoose.model('User', userSchema)