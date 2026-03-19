const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/error.middleware');

// DB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Error:', err.message);
  });

const app = express();

// Middleware
app.use(cors({
  origin: [
  'http://localhost:3000',
  'https://smart-pos-3u5u.vercel.app/'
],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/categories', require('./routes/category.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/reports', require('./routes/report.routes'));

// Health
app.get('/api/health', (_, res) => res.json({ status: 'SmartPOS Pro API ✅', time: new Date() }));
app.get('/', (req, res) => res.send('SmartPOS Pro backend'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// 404
app.use('*', (req, res) => res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` }));

// Error handler
app.use(errorHandler);

module.exports = app;