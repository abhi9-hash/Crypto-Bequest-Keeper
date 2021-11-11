import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type:Number, required: true },
    password: { type: String, required: true },
    filledDetails: { type: Boolean, default: false},
    lastlogin: { type: Date},
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);
export default User;