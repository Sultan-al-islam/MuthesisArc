import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import Thesis from './models/Thesis.js';
import User from './models/User.js';
import jwt from 'jsonwebtoken';
import { protect } from './middleware/authMiddleware.js';

import path from "path";

// Load env vars
dotenv.config();

// Connect Database
connectDB();

const app = express();


const __dirname = path.resolve();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// @route   GET /api/theses
// @desc    Get all theses or search by title/department
// @access  Public
app.get('/api/theses', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { department: { $regex: search, $options: 'i' } },
        ],
      };
    }
    const theses = await Thesis.find(query).sort({ createdAt: -1 });
    res.json(theses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/theses
// @desc    Upload a new thesis
// @access  Private
app.post('/api/theses', protect, async (req, res) => {
  try {
    const { title, author, abstract, department, colabLink, driveLink } = req.body;
    
    if (!driveLink) {
      return res.status(400).json({ message: 'PDF Drive Link is required' });
    }

    const newThesis = new Thesis({
      title,
      author,
      abstract,
      department,
      colabLink,
      driveLink,
      uploader: req.user._id,
    });

    const savedThesis = await newThesis.save();
    res.status(201).json(savedThesis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/theses/:id
// @desc    Update a thesis
// @access  Private
app.put('/api/theses/:id', protect, async (req, res) => {
  try {
    const thesis = await Thesis.findById(req.params.id);

    if (!thesis) {
      return res.status(404).json({ message: 'Thesis not found' });
    }

    // Check if the user is the uploader
    if (thesis.uploader.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this thesis' });
    }

    const { title, author, abstract, department, colabLink, driveLink } = req.body;

    thesis.title = title || thesis.title;
    thesis.author = author || thesis.author;
    thesis.abstract = abstract || thesis.abstract;
    thesis.department = department || thesis.department;
    thesis.colabLink = colabLink !== undefined ? colabLink : thesis.colabLink;
    thesis.driveLink = driveLink || thesis.driveLink;

    const updatedThesis = await thesis.save();
    res.json(updatedThesis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/theses/:id
// @desc    Delete a thesis
// @access  Private
app.delete('/api/theses/:id', protect, async (req, res) => {
  try {
    const thesis = await Thesis.findById(req.params.id);

    if (!thesis) {
      return res.status(404).json({ message: 'Thesis not found' });
    }

    // Check if the user is the uploader
    if (thesis.uploader.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this thesis' });
    }

    await thesis.deleteOne();
    res.json({ message: 'Thesis removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
app.post('/api/users/register', async (req, res) => {
  try {
    const { name, studentId, email, dept, batch, password } = req.body;
    const userExists = await User.findOne({ $or: [{ email }, { studentId }] });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email or student ID already exists' });
    }
    const user = await User.create({ name, studentId, email, dept, batch, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        studentId: user.studentId,
        email: user.email,
        dept: user.dept,
        batch: user.batch,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   POST /api/users/login
// @desc    Auth user & get token
// @access  Public
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        studentId: user.studentId,
        email: user.email,
        dept: user.dept,
        batch: user.batch,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
app.get('/api/users/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        studentId: user.studentId,
        email: user.email,
        dept: user.dept,
        batch: user.batch,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
app.put('/api/users/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.dept = req.body.dept || user.dept;
      user.batch = req.body.batch || user.batch;
      // We are not allowing email or studentId change here for simplicity
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        studentId: updatedUser.studentId,
        email: updatedUser.email,
        dept: updatedUser.dept,
        batch: updatedUser.batch,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});


// Static file
app.use(express.static(path.join(__dirname, './frontend/dist')));

// Fallback route for React Router
app.get('*path', (_, res) => {
  res.sendFile(path.resolve(__dirname, './frontend', 'dist', 'index.html'));
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
