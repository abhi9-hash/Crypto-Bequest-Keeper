import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type:Number, required: true },
    password: { type: String, required: true },
    filledDetails: { type: Boolean, default: false},
    lastlogin: { type: Date},
    mailsent: {type: Boolean, default: false},
    nominee1: {type: String, required:false},
    nominee2: {type: String, required:false},
    nominee3: {type: String, required:false}
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);
export default User;