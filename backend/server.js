require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');

// Initialize Express
const app = express();

// Middleware
app.use(helmet());

// Build allowed origins from CLIENT_URL env var + known origins
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://fashion-hub-silk.vercel.app',
];
if (process.env.CLIENT_URL) {
    process.env.CLIENT_URL.split(',').forEach(url => allowedOrigins.push(url.trim()));
}

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/brand', require('./routes/brandRoutes'));
app.use('/api/customer', require('./routes/customerRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// 404 & Error Handling Middleware
app.use(require('./middleware/errorMiddleware').notFound);
app.use(require('./middleware/errorMiddleware').errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    // Connect to Database
    connectDB();
});
