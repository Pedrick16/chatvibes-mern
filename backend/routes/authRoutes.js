const express = require('express')
const router = express.Router();
const cors = require('cors');
const {test, registerUser, loginUser, getProfile, logoutUser} = require('../controller/authController')

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'https://chatvibes.vercel.app'
    })
)

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/logout', logoutUser)


module.exports = router; 