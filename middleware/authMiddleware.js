require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized: Token not provided'
        });
    }

    try {
        const decoded = jsonwebtoken.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            message: 'Token tidak valid'
        });
    }
};

module.exports = checkLogin;
