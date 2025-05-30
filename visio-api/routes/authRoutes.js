
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControlleur');

console.log('CONTENU DE authController:', authController);


router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
