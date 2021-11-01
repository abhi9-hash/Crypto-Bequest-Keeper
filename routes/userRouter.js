import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

const userRouter = express.Router();

userRouter.post(
    '/register',
    async (req, res) => {
      try {  
        const user = await User.findOne({email:req.body.email});
        if(!user) {
        const createdUser = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: bcrypt.hashSync(req.body.password, 8),
          });
        const savedUser = await createdUser.save();
        res.send(savedUser);
        } else {
          res.status(400).send({ message: 'User Already Exists' });
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
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
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
    '/edit/:id',
    async (req, res) => {
      try {
        const user = await User.findById(req.params.id);
        
        user.firstname = req.body.firstname || user.firstname;
        user.lastname = req.body.lastname || user.lastname;
        user.email = user.email;
        user.phone = req.body.phone || user.phone;

        const updatedUser = await user.save();
        res.send(updatedUser);
      } catch {
        res.status(404).send({ message: 'User Doesnot Exist' });
      }
    }
  );  


export default userRouter;