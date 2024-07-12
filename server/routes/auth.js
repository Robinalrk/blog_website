const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const passport = require('../config/passport');
const router = express.Router();

router.post('/signup', async (req, res) => {

    const { username, password } = req.body;
    try {
     
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });
        console.log('User created:', user);
        res.status(201).json(user);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ message: err.message });
    }
});
router.post('/login',async (req, res) => {
    const {username,password} =req.body;
    console.log(username,password);
        try {
            const user = await User.findOne({ where: { username } });
            if (!user) {
              return  res.send( { message: 'Incorrect username.' });
            }
            console.log('user correct');
            const isValid= await bcrypt.compare(password, user.password);
            console.log('isValid',isValid);
            if (!isValid) {
                console.log('pass correct');
                return res.send({ message: 'Incorrect password.' });
            }
            console.log('user');
            console.log(user);
            return res.send({"sucess":user})
        } catch (err) {
           return res.send({"error":err})
        }
    
});



router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Logged out successfully' });
});


module.exports = router;
