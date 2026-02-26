const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(cors());

// Proxy Users
app.use('/api/users', createProxyMiddleware({
  target: 'http://userms-service:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}));

// Proxy Orders
app.use('/api/orders', createProxyMiddleware({
  target: 'http://ordersms-service:3002',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}));

app.get('/', (req, res) => {
  res.send("API Gateway Running");
});

app.listen(3000, '0.0.0.0', () => {
  console.log("API Gateway running on port 3000");
});
