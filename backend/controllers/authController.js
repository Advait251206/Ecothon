const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production';

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1d' });
      
      // Send both Cookie (for future proofing) and Body (for current Frontend compatibility)
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400000, // 1 day
      });

      res.json({ 
        success: true, 
        token: token, // Frontend uses this
        user: {
          email: admin.email,
          name: admin.username || 'Admin User' 
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getMe = async (req, res) => {
    // Placeholder for verifying token and returning user
    res.json({ success: true, user: req.user });
};
