const {check, validationResult } = require('express-validator');

exports.validateInput = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({ message: errors.array()[0].msg })
    }
    next()
}

exports.validationRegistrasi = [
    check( 'username', 'Username tidak boleh kosong').notEmpty(),
    check( 'email', 'Email tidak boleh kosong').notEmpty().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage('Email harus sesuai format @example.com'),
    check( 'password', 'Password tidak boleh kosong').notEmpty().isLength({ min: 6 }).withMessage('Password minimal 6 characters')
]

exports.validationLogin = [
    check( 'username', 'Username tidak boleh kosong').not().isEmpty(),
    check( 'password', 'Password tidak boleh kosong').not().isEmpty()
]