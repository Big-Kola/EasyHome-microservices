const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const PRODUCT_SERVICE = process.env.PRODUCT_SERVICE || 'http://product-service:3001';
const ORDER_SERVICE = process.env.ORDER_SERVICE || 'http://order-service:3002';
const USER_SERVICE = process.env.USER_SERVICE || 'http://user-service:3003';

app.use('/api/products', createProxyMiddleware({ target: PRODUCT_SERVICE, changeOrigin: true }));
app.use('/api/orders', createProxyMiddleware({ target: ORDER_SERVICE, changeOrigin: true }));
app.use('/api/users', createProxyMiddleware({ target: USER_SERVICE, changeOrigin: true }));

app.get('/health', (req, res) => res.json({ status: 'UP', service: 'api-gateway' }));

app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
