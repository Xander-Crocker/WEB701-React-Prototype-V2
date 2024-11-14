const User = require('../models/user.model');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json(users); 
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getUserBoard = (req, res) => {
    res.status(200).send("User Content");
};


exports.getModeratorBoard = (req, res) => {
    res.status(200).send("Moderator Content");
};

exports.getAdminBoard = (req, res) => {
    res.status(200).send("Admin Content");
};