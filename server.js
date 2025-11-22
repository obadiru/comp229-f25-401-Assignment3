import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; 

// Routes
import contactRoutes from './backend/routes/contactRoutes.js';
import projectRoutes from './backend/routes/projectRoutes.js';
import qualificationRoutes from './backend/routes/qualificationRoutes.js';
import userRoutes from './backend/routes/userRoutes.js';
import authRoutes from './backend/routes/authRoutes.js';   

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());     
app.use(morgan('dev'));

// DB Connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    console.log(`📌 Using Database: ${mongoose.connection.db.databaseName}`);
  })
  .catch((err) => console.error('❌ MongoDB Error:', err.message));

// Health Check Route
app.get('/', (req, res) => {
  res.send('Portfolio Backend is running...');
});

// Routes
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/qualifications', qualificationRoutes);
app.use('/api/users', userRoutes);
app.use('/', authRoutes);   // 🔹 THIS MAKES /auth/signin & /auth/signout WORK

// 404 Handler
app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
