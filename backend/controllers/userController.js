const bycrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const {generateToken} = require('../tokens/authenticateToken')

const User = require('../models/UserModel')


// @desc   Register a new user
// @route  /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    
    const {name, email, password} = req.body;

    if(!name || !password || !email) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    //Find user if already exists
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //hash password
    const salt = await bycrypt.genSalt(10)
    const hashedPassword = await bycrypt.hash(password,salt)

    //create a user
    const user =await User.create({
        name,
        email,
        password : hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        })
    }else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc   Login a user
// @route  /api/users/login
// @access Public
const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body;

    if(!password || !email) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    //Find user if already exists
    const user = await User.findOne({email})

    if (user && await (bycrypt.compare(password, user.password))) {
        res.status(200).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        })
    }else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
    
})

// @desc   Register a new user
// @route  /api/users
// @access Public
const getMe = asyncHandler(async (req, res) => {
    const user = {
        name : req.user.name,
        id : req.user._id,
        email : req.user.email
    }
    
    res.status(200).json(user)
})

module.exports = {
    registerUser,
    loginUser,
    getMe
}