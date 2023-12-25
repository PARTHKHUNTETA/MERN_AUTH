import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
/**
 *  @desc    Auth user & get token
 *  @route   POST /api/users/auth
 *  @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
})

/**
 *  @desc    Auth user/set token
 *  @route   POST /api/users
 *  @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400);
        throw new Error('User already Exist')
    }
    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }
})

/**
 *  @desc    Logout user/set token
 *  @route   POST /api/users/logout
 *  @access  Public
 */
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).send({ message: 'user Logged Out' })
})

/**
 *  @desc    GET User profile
 *  @route   GET /api/users/profile
 *  @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    };

    res.status(200).send(user)
})

/**
 *  @desc    Update User profile
 *  @route   PUT /api/users/profile
 *  @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save()
    } else {
        res.status(404);
        throw new Error("No user found");
    }


    res.status(200).send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email
    })
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}