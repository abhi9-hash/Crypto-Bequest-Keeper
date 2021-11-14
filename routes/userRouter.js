import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.post(
    '/register',
    async (req, res) => {
      try {  
        const user = await User.findOne({email:req.body.email});
        if(!user) {
          const date= new Date();
        const createdUser = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: bcrypt.hashSync(req.body.password, 8),
            lastlogin: date
          });
        const savedUser = await createdUser.save();
        res.send({
          _id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
          token: generateToken(savedUser),
        });
        }
      } catch {
        res.status(400).send({ message: 'User Already Exists' });
      }
    }
  );

  userRouter.post(
    '/login',
    async (req, res) => {
      try {  
        const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const date= new Date();
          user.lastlogin= date;
          const updatedUser = await user.save();
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user),
          });
        }
      }
      } catch {
        res.status(400).send({ message: 'Wrong Email/Password' });
      }
    }
  );

userRouter.put(
    '/edit/',
    isAuth,
    async (req, res) => {
      try {
        const user = await User.findById(req.user._id);
        
        user.firstname = req.body.name || user.name;
        user.email = user.email;
        user.phone = req.body.phone || user.phone;
        if (req.body.password) {
          user.password = bcrypt.hashSync(req.body.password, 8);
        }

        const updatedUser = await user.save();
        res.send({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          token: generateToken(updatedUser),
        });
      } catch {
        res.status(404).send({ message: 'User Doesnot Exist' });
      }
    }
  );  


export default userRouter;