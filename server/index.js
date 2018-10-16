// Load env variables onto process.env
require('dotenv').config();
const PORT = 8000;

// Load packages
const express = require('express'),
cors = require('cors'),
morgan = require('morgan')
app = express();

// Load Routers
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');

// Load Models
const db = require('./models');

// Handlers
const errorHandler = require('./handlers/error.js');

// Load Middleware
const {loginRequired, ensureCorrectUser} = require('./middleware/auth');


// Middleware Start
// Set up morgan for logging
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// All routes are here
app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages', loginRequired, ensureCorrectUser, messageRoutes);
app.use('/api/messages', loginRequired, async (req, res, next) => {
  const messages = await db.Message.find({}).sort({createdAt: 'desc'}).populate('user', {
    username: true,
    profileImageUrl: true
  });
  return res.status(200).json(messages);
});

// If none routes are reached then we'll handle errors
app.use((req, res, next) => {
  let err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`)
});
