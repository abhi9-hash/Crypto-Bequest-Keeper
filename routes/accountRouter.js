import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateEncrypToken, generateToken, isAuth } from '../utils.js';
import Account from '../models/accountModel.js';

const accountRouter = express.Router();

accountRouter.post(
    '/',
    generateEncrypToken,
    async (req, res) => {
      try {  
        const user = User.findById(req.body.userid);
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
    isAuth,
    async (req, res) => {
      try {  
        jwt.verify(
          token,
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
  // accountRouter.put(
  //   '/edit/',
  //   isAuth,
  //   async (req, res) => {
  //     try {
  //       const user = await User.findById(req.params.id);
        
  //       user.firstname = req.body.name || user.name;
  //       user.email = user.email;
  //       user.phone = req.body.phone || user.phone;
  //       if (req.body.password) {
  //         user.password = bcrypt.hashSync(req.body.password, 8);
  //       }

  //       const updatedUser = await user.save();
  //       res.send(updatedUser);
  //     } catch {
  //       res.status(404).send({ message: 'User Doesnot Exist' });
  //     }
  //   }
  // );  


export default accountRouter;