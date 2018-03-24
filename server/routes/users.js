const express = require('express');
const router = express.Router();
const { register, login, getAllUsers, loginFB } = require('../controllers/user.controller');

/* GET users listing. */
router.post('/register', register);
router.post('/login', login);
router.post('/loginfb', loginFB);
router.get('/getAllUsers', getAllUsers)

module.exports = router;
