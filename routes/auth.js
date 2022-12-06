const express = require('express')
const router = express.Router()
const authenticateUser = require('../middleware/authentication')
const testUser = require('../middleware/testUser')

const rateLimiter = require('express-rate-limit')

const apiLimiter = rateLimiter({
    windwMs: 15 * 60 * 1000,
    max: 10,
    message: {
        msg: 'Too many requests from this IP,please try again afte 15minutes',
    },
})


const { register, login, updateUser } = require('../controllers/auth')
router.post('/register', apiLimiter, register)
router.post('/login', apiLimiter, login)
router.patch('/updateUser', authenticateUser, testUser, updateUser)

module.exports = router