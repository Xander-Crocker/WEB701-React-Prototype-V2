const express = require('express');
const router = express.Router();
const { getAllUsers, getUserBoard, getModeratorBoard, getAdminBoard } = require('../controllers/user.controller');

router.get('/all', getAllUsers);

router.get('/user', getUserBoard);

router.get('/mod', getModeratorBoard);

router.get('/admin', getAdminBoard);

module.exports = router;