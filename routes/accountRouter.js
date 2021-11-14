import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateEncrypToken, generateToken, isAuth, getEncrypToken, generateEncrypToken2 } from '../utils.js';
import Account from '../models/accountModel.js';
import jwt from 'jsonwebtoken';

const accountRouter = express.Router();

accountRouter.post(
    '/',
    [isAuth, generateEncrypToken],
    async (req, res) => {
      try {  
        const user = await User.findById(req.user._id);
        console.log(user)
        const accdetails = new Account({
            userid: req.user._id,
            token: req.token
          });
          console.log(accdetails)
        user.filledDetails = true;
        user.nominee1= req.body.nominee1;
        user.nominee2= req.body.nominee2;
        user.nominee3= req.body.nominee3;
        const newuserdetails = await user.save(); 
        const savedacc = await accdetails.save();
        res.status(200).send({ message: "Details stored"});
      } catch {
        res.status(400).send({ message: 'Details not stored' });
      }
    }
  );

  accountRouter.post(
    '/info',
    [isAuth, getEncrypToken],
    async (req, res) => {
      try {  
        console.log(req.token)
        jwt.verify(
          req.token,
          `${req.body.secretkey}`,
          (err, decode) => {
            if (err) {
              res.status(401).send({ message: err });
            } else {
              req.data = decode;
              console.log(decode)
              res.status(200).send({
                text: req.data
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
        const key= req.body.secretkey;
        const payload=  {
         text: req.headers.text
        }
        account.token = generateEncrypToken2(payload, key);
        const updatedacc = await account.save();
        res.send({message:"Account info updated!"});
      } catch {
        res.status(404).send({ message: 'User/Account Doesnot Exist' });
      }
    }
  );  


export default accountRouter;