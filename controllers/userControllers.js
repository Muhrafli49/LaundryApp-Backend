require('dotenv').config();

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

// Registrasi pengguna
exports.registrasi = async (req, res) => {
    const { nama, username, email, password } = req.body;

    try {
        // Validasi email
        const emailUser = await User.findOne({ email });
        if (emailUser) {
            return res.status(400).json({
                status: false,
                message: 'Email sudah terdaftar'
            });
        }

        // Validasi username
        const usernameUser = await User.findOne({ username });
        if (usernameUser) {
            return res.status(400).json({
                status: false,
                message: 'Username sudah terdaftar'
            });
        }

        // Buat objek pengguna baru
        const user = new User({
            nama,
            username,
            email,
            password: await bcrypt.hash(password, 10)
        });

        // Simpan pengguna ke database
        await user.save();

        return res.status(201).json({
            status: true,
            message: 'Registrasi Berhasil'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan saat registrasi pengguna'
        });
    }
};

// Fungsi login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ username }, { email: username }] });

        if (!user) {
            return res.status(401).json({
                false: false,
                message: 'Username atau email tidak ditemukan' 
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ 
                false: false,
                message: 'Password tidak valid' 
            });
        }

        const data = {
            _id: user._id,
            nama: user.nama, // Tambahkan properti nama di sini
            username: user.username
        };

        const token = jsonwebtoken.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            message: 'Login Berhasil',
            user: data, // Gunakan objek data yang sudah termasuk properti nama
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat proses login' });
    }
};


// Dapatkan data pengguna
exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req._id });
        return res.status(200).json({
            status: true,
            message: "Berhasil mendapatkan data pengguna",
            data: user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan saat mengambil data pengguna'
        });
    }
};