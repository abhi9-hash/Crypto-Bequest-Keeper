import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
  {
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    token: { type: String, required: true}
  },
  {
    timestamps: true,
  }
);
const Account = mongoose.model('Account', accountSchema);
export default Account;