require('dotenv').config();

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

// registrasi
exports.registrasi = async (req, res) => {
    const {username, email, password, role} = req.body;

    // validasi email
    const emailUser = await User.findOne({ email });
    if (emailUser) {
        return res.status(400).json({ message: 'Email sudah terdaftar' });
    }
    // validasi username
    const usernameUser = await User.findOne({ username });
    if (usernameUser) {
        return res.status(400).json({ message: 'Username sudah terdaftar' });
    }

    const user = new User({
        username,
        email,
        password : await bcrypt.hash(password, 10),
        role
    })
    await user.save();

    return res.status(201).json({ 
        message: 'Registrasi Berhasil',
    });
    
};

// login

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ username }, { email: username }] });

        if (!user) {
            return res.status(401).json({ message: 'Username atau email tidak ditemukan' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Password tidak valid' });
        }

        const data = {
            _id: user._id,
            username: user.username,
            role: user.role
        };

        const token = jsonwebtoken.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            message: 'Login Berhasil',
            user: {
                _id: user._id,
                username: user.username,
                role: user.role,
            },
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat proses login' });
    }
};

exports.getUser = async (req, res) => {
    const user = await User.findOne({ _id: req._id });
    return res.status(200).json({
        message: "Behasil mendapatkan data pengguna",
        data: user
    })
}