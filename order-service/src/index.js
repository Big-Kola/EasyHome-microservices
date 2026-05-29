const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const orderRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/easyhomes';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => console.log('Order Service: MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/orders', orderRoutes);

app.get('/health', (req, res) => res.json({ status: 'UP', service: 'order-service' }));

app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
