const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// ROTA DE REGISTRO
router.post('/register', userController.register);

// ROTA DE LOGIN
router.post('/login', userController.login);

module.exports = router;