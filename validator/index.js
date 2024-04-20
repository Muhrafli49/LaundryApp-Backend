const {check, validationResult } = require('express-validator');

exports.validateInput = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

exports.validationRegistrasi = [
    check( 'username', 'Username is required').not().isEmpty(),
    check( 'email', 'Email is required').not().isEmpty().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage('Email must be in the format @example.com'),
    check( 'password', 'Password is required').not().isEmpty().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]

exports.validationLogin = [
    check( 'username', 'Username is required').not().isEmpty(),
    check( 'password', 'Password is required').not().isEmpty()
]