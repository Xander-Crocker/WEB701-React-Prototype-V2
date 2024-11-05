const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// db connection
const connectDB = require('./config/db');
// routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// middleware
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

// auth and test routes
app.use('/api/auth', authRoutes);
app.use('/api/test', userRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));