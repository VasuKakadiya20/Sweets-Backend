require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const cloudinary = require('cloudinary').v2;
const app = express();
const server = http.createServer(app); 
const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Middleware
app.use(cors());
app.use(express.json());

const ClientRoutes = require('./routes/Client');
const CartRoutes = require('./routes/Cart');
const ReviewRoutes = require('./routes/review');
const ItemRoutes = require('./routes/item');
const userRoutes = require('./routes/user')

app.use('/client', ClientRoutes);
app.use('/user',userRoutes);
app.use('/Item', ItemRoutes)
app.use('/Cart', CartRoutes);
app.use('/review',ReviewRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log('✅ Database Connection is ready...');
    server.listen(PORT, () => {        
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });