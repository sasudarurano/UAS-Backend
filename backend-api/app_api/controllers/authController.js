const bcrypt = require("bcryptjs"); // Mengimpor bcryptjs untuk memverifikasi password
const jwt = require("jsonwebtoken"); // Mengimpor jsonwebtoken untuk membuat token
const User = require("../models/user"); // Mengimpor model User

// Fungsi untuk register pengguna baru
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body; // Mendapatkan data dari body permintaan

  try {
    let user = await User.findOne({ email }); // Mengecek apakah pengguna sudah ada
    if (user) {
      return res.status(400).json({ message: "User already exists" }); // Jika ada, kirim pesan error
    }

    user = new User({ name, email, password, role }); // Membuat pengguna baru dengan data yang diberikan
    await user.save(); // Menyimpan pengguna baru ke database

    const payload = { userId: user.id, role: user.role }; // Membuat payload untuk token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    }); // Membuat JWT token

    res.json({ token }); // Mengirim token sebagai respons
  } catch (error) {
    res.status(500).json({ message: error.message }); // Mengirim pesan error jika ada
  }
};

// Fungsi untuk login pengguna
exports.login = async (req, res) => {
  const { email, password } = req.body; // Mendapatkan email dan password dari body permintaan

  try {
    const user = await User.findOne({ email }); // Mencari pengguna berdasarkan email
    if (!user) {
      // Jika pengguna tidak ditemukan
      return res.status(400).json({ message: "Invalid email or password" }); // Kirim pesan error
    }

    const isMatch = await bcrypt.compare(password, user.password); // Membandingkan password
    if (!isMatch) {
      // Jika password tidak cocok
      return res.status(400).json({ message: "Invalid email or password" }); // Kirim pesan error
    }

    const payload = { userId: user.id, role: user.role }; // Membuat payload token dengan ID dan role pengguna
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    }); // Membuat JWT token

    res.json({ token }); // Mengirim token sebagai respons
  } catch (error) {
    res.status(500).json({ message: error.message }); // Kirim pesan error jika ada masalah server
  }
};