import jwt from 'jsonwebtoken';
import Account from './models/accountModel';

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
    req.token = jwt.sign(
      {
        _id: req.body.userid,
        text: req.body.text,
        nominee1: req.body.nominee1,
        nominee2: req.body.nominee1,
        nominee3: req.body.nominee1,
      },
      req.body.secretkey
    );
    next();
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
  const account=await Account.findOne({userid: req.body.userid})
  req.token= user.token;
  next();
  } catch{
    res.status(401).send({ message: 'Invalid user' });
  }
}
