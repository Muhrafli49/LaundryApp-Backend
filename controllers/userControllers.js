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
        // Mencari pengguna berdasarkan username atau email
        const user = await User.findOne({ $or: [{ username }, { email: username }] });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Username atau email tidak ditemukan'
            });
        }

        // Memeriksa kecocokan password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Password tidak valid'
            });
        }

        // Mengambil data pengguna termasuk role
        const data = {
            _id: user._id,
            nama: user.nama,
            username: user.username,
            role: user.role // Tambahkan role ke data yang dikirimkan
        };

        // Membuat token JWT
        const token = jsonwebtoken.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            success: true,
            message: 'Login Berhasil',
            user: data, // Mengirim data pengguna termasuk role
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat proses login'
        });
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

// Mendapatkan data seluruh user
exports.getAllUser = async (req, res) => {
    try {
        const user = await User.find();
        return res.status(200).json({
            status: true,
            message: "Berhasil mendapatkan data seluruh user",
            data: user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan saat mengambil data user'
        });
    }
};

// Controller untuk mengupdate data user berdasarkan ID
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params; // Ambil ID user dari URL
        const { nama, username, email, password } = req.body;

        // Validasi panjang password
        if (password && password.length < 6) {
            return res.status(400).json({
                status: false,
                message: 'Password harus memiliki panjang minimal 6 karakter'
            });
        }

        // Cek apakah user dengan ID tersebut ada dalam database
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User tidak ditemukan'
            });
        }

        // Jika username atau email diubah, periksa apakah sudah digunakan oleh pengguna lain
        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
            _id: { $ne: id } // Pastikan tidak memeriksa user yang sedang di-update
        });

        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: 'Username atau Email sudah digunakan oleh pengguna lain'
            });
        }

        // Update data user
        user.nama = nama;
        user.username = username;
        user.email = email;

        // Jika password diubah, hash password baru
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        // Simpan perubahan
        await user.save();

        return res.status(200).json({
            status: true,
            message: 'Data user berhasil diperbarui'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan saat mengupdate data user'
        });
    }
};

// Controller untuk menghapus data user berdasarkan ID
exports.deleteUserById = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ 
                status: false, 
                message: 'User tidak ditemukan' 
            });
        }
        res.status(200).json({
            status: true,
            message: 'User berhasil dihapus',
            data: deletedUser
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Controller mendapatkan data pengguna by id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User tidak ditemukan'
            });
        }
        return res.status(200).json({
            status: true,
            message: 'Berhasil mendapatkan data pengguna',
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

