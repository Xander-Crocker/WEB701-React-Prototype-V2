const User = require('../models/user.model'); // Adjust the path as necessary

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.status(200).json(users); // Send the users' data as JSON
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getUserBoard = (req, res) => {
    res.status(200).send("User Content");
    res.status(200).send(`
        <button onclick="window.location.href='/profile'">Go to Profile</button>
    `);
};


exports.getModeratorBoard = (req, res) => {
    res.status(200).send("Moderator Content");
};

exports.getAdminBoard = (req, res) => {
    res.status(200).send("Admin Content");
};