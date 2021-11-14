import jwt from 'jsonwebtoken';
import Account from './models/accountModel.js';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};

export const generateEncrypToken = (req, res, next) => {
  const key= req.body.secretkey;
  const payload=  {
    text: req.headers.text
  }
    req.token = jwt.sign(
     payload,
     `${req.body.secretkey}`
    );
    console.log(req.token)
    next();
  };

export const generateEncrypToken2 = (payload, key) => {
    
      return jwt.sign(
       payload,
       `${key}`
      );
    };  

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          console.log(decode)
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
}

export const getEncrypToken= async(req,res,next)=>{
  try{
  const account=await Account.findOne({userid: req.user._id})
  console.log(account)
  req.token= account.token;
  next();
  } catch{
    res.status(401).send({ message: 'Invalid user' });
  }
}
