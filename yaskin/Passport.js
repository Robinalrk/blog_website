const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Replace with your user model

// Configure passport
passport.use(new LocalStrategy({
    usernameField: 'email', // Assuming email is used for username
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        // Find user by email
        const user = await User.findOne({ email });

        // If user not found
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        // Successful authentication
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

// Serialize and deserialize user (required for session management)
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Example routes for authentication (signup, login, logout)
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Automatically authenticate user after signup
        req.login(newUser, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Authentication error.' });
            }
            return res.status(201).json({ message: 'User registered successfully.', user: newUser });
        });
    } catch (err) {
        console.error('Error in signup:', err);
        res.status(500).json({ message: 'Server error.' });
    }
});

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).json({ message: 'Login successful from posswort .', user: req.user });
});

app.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Logged out successfully.' });
});
