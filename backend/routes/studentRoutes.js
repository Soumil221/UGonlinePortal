// src/routes/studentRoutes.js
const express = require('express');
const { registerStudent, loginStudent, getStudentProfile, updateStudentProfile } = require('../controllers/studentController.js');
const { authMiddleware } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/register', registerStudent);
router.post('/login', loginStudent);
router.get('/profile', authMiddleware, getStudentProfile);
router.put('/profile', authMiddleware, updateStudentProfile);

module.exports = router;