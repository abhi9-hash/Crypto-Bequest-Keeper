import Express from 'express';
import pkg from 'emailjs-com';
const {init, send} = pkg;
import nodemailer from 'nodemailer'
import mongoose from 'mongoose';
import User from './models/userModel.js';
import accountRouter from './routes/accountRouter.js';
import userRouter from './routes/userRouter.js';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();
const app = Express();
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }));
app.use(cors())

mongoose.connect( process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>console.log('DB Connected'))
  .catch((err)=>console.log(err));

app.use('/users', userRouter);
app.use('/account', accountRouter);
app.get('/',(req,res)=>{                       
    res.send('server has started')
    });
    
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
    });
app.listen(process.env.PORT||5000,async()=>{ 
    console.log('running port 5000')
    setInterval(async()=>{
        const users=await User.find({});
        const date= new Date();
        for(var i=0;i<users.length;i++) {
            if(date-users[i].lastlogin >2592000000 && date-users[i].lastlogin <2678000000){
                  let transporter = nodemailer.createTransport({
                  host: 'smtp.gmail.com',
                  port: 587,
                  secure: false,
                  requireTLS: true,
                  auth: {
                      user: `${process.env.MAIL}`,
                      pass: `${process.env.PASSWORD}`
                  }
              });
                var mailOptions = {
                    from: `${process.env.MAIL}`,
                    to: users[i].email,
                    subject: 'Login inactivity',
                    text: 'Please login!'
                  };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
            }
             if(date-users[i].lastlogin > 2678000000 && !users[i].mailsent){
              users[i].mailsent= true;
              const updateduser= await users[i].save();
              let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: `${process.env.MAIL}`,
                    pass: `${process.env.PASSWORD}`
                }
            });
              var mailOptions = {
                  from: `${process.env.MAIL}`,
                  to: users[i].nominee1,
                  subject: 'Login inactivity',
                  text: `Please Login!. UserId: ${users[i]._id}`
                };
              transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });

            }
        }
     },21600000)
});

