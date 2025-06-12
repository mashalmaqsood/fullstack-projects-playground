const express = require('express');
const { registerUser, loginUser, getUserDetails, updateUser, deleteUser } = require('../controllers/userController');
const protect = require('../middlewares/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getAllUsers', protect, getUserDetails);
router.put('/updateUser', protect, updateUser);
router.delete('/deleteUser', protect, deleteUser);

module.exports = router;