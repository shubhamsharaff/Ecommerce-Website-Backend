const express = require('express');
const connectDB = require('../Ecommerce-express-backend/config/db');
const authRoutes = require('../Ecommerce-express-backend/app/routes/auth');
const productRoutes = require('../Ecommerce-express-backend/app/routes/products')

const app = express();

// Connect to the database
connectDB();

// Additional server setup and middleware

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
