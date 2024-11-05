const express = require('express');
const { register, login, getAllUsers } = require('../controllers/auth.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/signup', register);
router.post('/signin', login);

router.get('/admin', [verifyToken, isAdmin], (req, res) => {
    res.status(200).send('Admin Content');
});

router.get('/users', verifyToken, getAllUsers);

module.exports = router;