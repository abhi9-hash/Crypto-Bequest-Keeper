import Express from 'express';
import {init, send} from 'emailjs-com'
import nodemailer from 'nodemailer'
import mongoose from 'mongoose';
import User from './models/userModel.js';
import accountRouter from './routes/accountRouter.js';
import userRouter from './routes/userRouter.js';

const app = Express();

app.use(Express.json())
app.use(Express.urlencoded({ extended: true }));

mongoose.connect( "mongodb+srv://abhinav:abhinav@cluster0.qzukv.mongodb.net/UserService?retryWrites=true&w=majority", {
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
app.listen(process.env.PORT||5000,()=>{
    console.log('running port 5000')
    setInterval(async()=>{
        const users=await User.find({});
        const date= new Date();
        for(var i=0;i<users.length;i++) {
            if(date-users[i].lastlogin >2592000000){
                  let transporter = nodemailer.createTransport({
                  host: 'smtp.gmail.com',
                  port: 587,
                  secure: false,
                  requireTLS: true,
                  auth: {
                      user: 'abhinavvpathakk@gmail.com',
                      pass: 'xxxxxxxxxx'
                  }
              });
                var mailOptions = {
                    from: 'abhinavvpathakk@gmail.com',
                    to: users[i].email,
                    subject: 'Login inactivity',
                    text: 'Please kogin!'
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
    },86400000)
});

