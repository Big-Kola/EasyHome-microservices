const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/easyhomes';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => console.log('Product Service: MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/products', productRoutes);

app.get('/health', (req, res) => res.json({ status: 'UP', service: 'product-service' }));

app.listen(PORT, () => console.log(`Product Service running on port ${PORT}`));
