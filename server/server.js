const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('./config/auth');
const session = require('express-session');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const storyRoutes = require('./routes/stories');
const adminRoutes = require('./routes/admin');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// Middleware Enhancements

// Set secure HTTP headers with CSP
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", process.env.CLIENT_URL]
    }
  }
}));

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/auth', apiLimiter);
app.use('/admin', apiLimiter);

// CORS Configuration
// CORS Configuration
app.use(cors({
  origin: [
    'http://13.201.25.70',
    'http://storyverse-website.s3-website.ap-south-1.amazonaws.com',
    'https://d30ib605w8wpui.cloudfront.net',
    'http://localhost:3000'
  ],
  credentials: true
}));

// Body Parser
app.use(express.json());

// Session Management
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/stories', storyRoutes);
app.use('/admin', adminRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send('StoryVerse server is running');
});

// Global Error Handler (should be the last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`StoryVerse server running on port ${PORT}`));
