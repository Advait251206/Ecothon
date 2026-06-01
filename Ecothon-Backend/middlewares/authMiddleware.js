import dotenv from 'dotenv'

dotenv.config();

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_Secret_Key;

const verifyJWT = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default verifyJWT;