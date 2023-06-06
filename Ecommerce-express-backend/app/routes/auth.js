const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // User is authenticated, return success message or user data
    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});
// Signup route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user already exists in the database
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        email,
        password: hashedPassword,
      });
  
      // Save the user to the database
      await newUser.save();
  
      // Return success message or user data
      res.json({ message: 'Signup successful', user: newUser });
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
module.exports = router;
