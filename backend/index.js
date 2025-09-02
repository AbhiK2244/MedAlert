import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import connectDB from './services/database.service.js';
import authRoutes from './routes/auth.route.js';
import healthProfileRoutes from './routes/healthProfile.route.js';
import errorHandler from './middleware/errorHandler.middleware.js';
import cors from 'cors';

dotenv.config();
const app = express();
connectDB();
 

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}));
 
// Routes
app.use('/api/user', authRoutes); 
app.use('/api/health-profiles', healthProfileRoutes);
// Error handling middleware
app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({status: 'success', message: 'Backend is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});