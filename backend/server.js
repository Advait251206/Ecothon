const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/connectDB');
const reportRoutes = require('./routes/reportRoutes');
const authRoutes = require('./routes/authRoutes');
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');

// Connect Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: '*', // Allow all origins for dev simplicity, or specify frontend URLs
    credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Admin Seeder (Keep existing logic but adapted)
const seedAdmin = async () => {
  try {
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) return;
    
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    
    if (!adminExists) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        username: 'Admin'
      });
      console.log('Admin Account Seeded');
    } else {
      adminExists.password = hashedPassword;
      await adminExists.save();
      console.log('Admin Account Synced');
    }
  } catch (err) {
    console.error('Seeding Error:', err);
  }
};
seedAdmin();

// Routes
app.use('/api/reports', reportRoutes);
app.use('/api/admin', authRoutes); // 'api/admin/login' matches frontend

app.get('/', (req, res) => {
  res.send('HyacinthWatch API (Integrated) is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
