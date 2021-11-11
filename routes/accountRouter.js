import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateEncrypToken, generateToken, isAuth, getEncrypToken } from '../utils.js';
import Account from '../models/accountModel.js';

const accountRouter = express.Router();

accountRouter.post(
    '/',
    [isAuth, generateEncrypToken],
    async (req, res) => {
      try {  
        const user = User.findById(req.user._id);
        const accdetails = new Account({
            userid: req.body.userid,
            token: req.token
          });
        user.filledDetails = true;
        const newuserdetails = await user.save(); 
        const savedacc = await accdetails.save();
        res.sttaus(200).send({ message: "Details stored"});
      } catch {
        res.status(400).send({ message: 'Details not stored' });
      }
    }
  );

  accountRouter.get(
    '/',
    [isAuth, getEncrypToken],
    async (req, res) => {
      try {  
        jwt.verify(
          req.token,
          req.body.key,
          (err, decode) => {
            if (err) {
              res.status(401).send({ message: 'Invalid Token' });
            } else {
              req.user = decode;
              res.status(200).send({
                text: decode.text
              })
            }
          }
        );
      } catch {
        res.status(400).send({ message: 'Cannot get data' });
      }
    }
  );


  // option to save changes for prime members only
  accountRouter.put(
    '/edit/',
    isAuth,
    async (req, res) => {
      try {
        const user = await User.findById(req.user._id);
        const account = await Account.findOne({userid:req.user._id})
        generateEncrypToken();
        account.token=req.token;
        const updatedacc = await account.save();
        res.send({message:"Account info updated!"});
      } catch {
        res.status(404).send({ message: 'User/Account Doesnot Exist' });
      }
    }
  );  


export default accountRouter;