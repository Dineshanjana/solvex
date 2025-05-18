require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoStore = require('connect-mongo');

require("./config/passport");

const authRoutes = require("./routes/authRoutes");
const modalsRoutes = require("./routes/modalsRoutes");
const facebookRoutes = require("./routes/Oauth-facebookRoutes");
const linkedInRoutes = require("./routes/Oauth-linkedinRoutes");
const XRoutes = require("./routes/Oauth-TwitterRoutes");
const InstagramRoutes = require("./routes/Oauth-Instagram");
const profileRoutes = require("./routes/profileRoutes");


const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(express.json());

app.set('trust proxy', 1);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));

app.use(passport.initialize());
app.use(passport.session());

// All API Routes
app.use('/api/auth', authRoutes);
app.use('/api/post', modalsRoutes);
app.use('/auth/facebook', facebookRoutes);
app.use("/auth/linkedin", linkedInRoutes);
app.use("/auth/twitter", XRoutes);
app.use("/auth/instagram", InstagramRoutes);
app.use("/api/profile", profileRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
