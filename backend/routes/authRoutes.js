const express = require('express')
const router = express.Router();
const cors = require('cors');
const {test, registerUser, loginUser, getProfile, logoutUser} = require('../controller/authController')

//middleware

router.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    })
)

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/logout', logoutUser)


module.exports = router; 