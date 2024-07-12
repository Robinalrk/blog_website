require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { Sequelize } = require('sequelize');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');

// Initialize Sequelize with the MySQL URI from the .env file
const sequelize = new Sequelize(process.env.MYSQL_URI);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback_secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Test Sequelize connection and sync models
sequelize.authenticate()
    .then(() => {
        console.log('MySQL connected');
        return sequelize.sync(); // Use alter: true to sync the models without dropping data
    })
    .catch(err => console.error('Unable to connect to the database:', err));

// Define routes
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter); // Add this line to use post routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
