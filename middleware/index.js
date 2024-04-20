require('dotenv').config()

const jsonwebtoken = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization');
    
    if(!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }

    const decode = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    req._id = decode._id
    next()
}