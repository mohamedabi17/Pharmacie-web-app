const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('../models/User');
const Medicament = require('../models/Medicament');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const Prescription = require('../models/Prescription');
require('dotenv').config();


// Session middleware
router.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true, // Set to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000 * 60, // Session expiration time in milliseconds (1 day in this example)
    },
  })
);

const isAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  const role = req.headers.role;
  console.log(role)
  if (!token) return res.sendStatus(401); // Unauthorized
 
    // Check if the user's role is 'admin'
    if (role !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to access this resource' });
    }
    next();


};

// Middleware for user authentication
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden

    req.user = user;
    next();
  });
};



// User login route
router.post('/login', async (req, res) => {
  try {
    const users = await User.find();
    const { username, password } = req.body;

    // Find the user by username
    const user = users.find((u) => u.profile.username === username);
    if (user && user.profile.password === password) {
      // Create a session and store user data
      req.session.user = {
        id: user._id,
        username: user.profile.username,
      };

      // Generate a JWT token
      const token = jwt.sign({ id: user._id, username: user.profile.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('sessionID', req.sessionID, { httpOnly: true }); // Add any other necessary cookie options
      res.json({ token });
    } else {
      // Invalid credentials
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user data route
router.get('/user', authenticateToken, async(req, res) => {
  try {
    // Access user data using req.user
    const users = await User.find();
    const usr = users.find((u) => u.profile.username === req.user.username);
    res.status(200).json({ user: usr, message: 'User data retrieved successfully', session: req.session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' ,erreur});
  }
});

// Getting all users route
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one user by ID route
router.get('/users/:id', getUser, (req, res) => {
  res.json(res.user);
});

// Updating one user by ID route
router.patch('/users/:id', getUser, async (req, res) => {
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one user by ID route
router.delete('/users/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'Deleted User' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a user by ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

// Creating a new user route
router.post('/users', async (req, res) => {
  try {
    const { profile, personalInfo, notifications } = req.body;
        // Check if the username is unique
    const existingUser = await User.findOne({ 'profile.username': profile.username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // // Check if the secret code matches the SECRET environment variable
    const  {secretCode}  = profile;
    const isAdmin = secretCode === process.env.SECRET;
    // Set the role based on whether the user is an admin or not
    const role = isAdmin ? 'admin' : 'customer';
    // Create the user with the correct role
    const user = new User({profile, personalInfo, notifications,role });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error',error });
  }
});



// Create a new medicament for sale route (admin only)
router.post('/medicaments', isAdmin, async (req, res) => {
  try {
    const { name, description, images, price } = req.body;

    // Create a new medicament
    const medicament = new Medicament({
      name,
      description,
      images,
      price,
    });

    // Save the new medicament to the database
    await medicament.save();

    res.status(201).json({ message: 'Medicament created successfully', medicament });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Buy route
router.post('/buy', authenticateToken, async (req, res) => {
  try {
    // Validate productId format
    if (!mongoose.isValidObjectId(req.user.id)) {
      return res.status(400).json({ message: 'Invalid productId' });
    }

    const createdBy = req.user.id;

    // Create the product
    const medicament = new Medicament({ createdBy, ...req.body });
    await medicament.save();

    // Create the payment
    const seller = new Payement({ medicament: medicament._id, seller: req.user.id });
    await seller.save();

    res.status(201).json({ message: 'Medicament bought successfully', medicament });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/medicaments', async (req, res) => {
  try {
    const searchQuery = req.query.search;
    let medicaments;

    if (searchQuery) {
      // Perform the search based on the query string
      medicaments = await Medicament.find({
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { description: { $regex: searchQuery, $options: 'i' } },
        ],
      });
    } else {
      // Get all medicaments
      medicaments = await Medicament.find();
    }

    res.json(medicaments);
  } catch (error) {
    console.error('Error searching for medicaments', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Get one auction by ID route
router.get('/medicaments/:id', async (req, res) => {
  try {
    const medicament = await Medicament.findById(req.params.id);
    res.json(medicament);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

