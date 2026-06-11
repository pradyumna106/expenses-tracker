const route = require('express').Router();
const User = require('../model/user.db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// create user
route.post('/register', async (req, res) => {
    try {
        const { Fullname, email, password, username } = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ 
            Fullname, 
            email, 
            password: hashedPassword, 
            username 
        });
        
        res.status(201).json({ message: 'User registered successfully' });
        console.log('User created successfully:', username);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// login user
route.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(200).json({ 
            message: 'Login successful', 
            token,
            user: { id: user._id, username: user.username, Fullname: user.Fullname }
        });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = route;