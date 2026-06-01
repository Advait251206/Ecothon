import dotenv from 'dotenv'

dotenv.config();

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './utils/connectDB.js'
import authRoutes from './routes/authRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

connectDB();
app.use('/auth', authRoutes);
app.use('/reports', reportRoutes);

app.get('/', (req, res) => {
    res.end('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});