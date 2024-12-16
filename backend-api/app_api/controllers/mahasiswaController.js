// Mengimpor model Mahasiswa dan Prodi, serta modul path dan fs untuk pengelolaan file
const Mahasiswa = require("../models/mahasiswa");
const Prodi = require("../models/prodi");
const path = require("path");
const fs = require("fs");

// Fungsi untuk menambahkan data mahasiswa baru
exports.createMahasiswa = async (req, res) => {
  const { npm, nama, prodi_id, jenis_kelamin, asal_sekolah } = req.body; // Destrukturisasi data dari body request

  if (!req.file) {
    // Validasi jika file foto tidak ada
    return res.status(400).json({ message: "File foto is required" });
  }

  try {
    const prodi = await Prodi.findById(prodi_id); // Mencari Prodi berdasarkan ID
    if (!prodi) return res.status(404).json({ message: "Prodi not found" }); // Jika Prodi tidak ditemukan

    // Membuat instance Mahasiswa baru
    const mahasiswa = new Mahasiswa({
      npm,
      nama,
      prodi_id,
      jenis_kelamin,
      asal_sekolah,
      foto: req.file ? req.file.path : null, // Simpan path file jika ada
    });

    await mahasiswa.save(); // Menyimpan data mahasiswa ke database
    res.status(201).json(mahasiswa); // Mengembalikan respon sukses
  } catch (error) {
    res.status(500).json({ message: error.message }); // Menangani error
  }
};

// Fungsi untuk mendapatkan semua data mahasiswa
exports.getAllMahasiswa = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.find().populate("prodi_id", "nama"); // Mengambil data mahasiswa dan relasi Prodi
    res.json(mahasiswa); // Mengembalikan data mahasiswa
  } catch (error) {
    res.status(500).json({ message: error.message }); // Menangani error
  }
};

// Fungsi untuk mendapatkan data mahasiswa berdasarkan ID
exports.getMahasiswaById = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findById(req.params.id).populate(
      "prodi_id",
      "nama"
    ); // Mengambil data mahasiswa berdasarkan ID dan relasi Prodi
    if (!mahasiswa)
      return res.status(404).json({ message: "Mahasiswa not found" }); // Jika mahasiswa tidak ditemukan
    res.json(mahasiswa); // Mengembalikan data mahasiswa
  } catch (error) {
    res.status(500).json({ message: error.message }); // Menangani error
  }
};

// Fungsi untuk memperbarui data mahasiswa
exports.updateMahasiswa = async (req, res) => {
  const { npm, nama, prodi_id, jenis_kelamin, asal_sekolah } = req.body; // Destrukturisasi data dari body request

  try {
    const mahasiswa = await Mahasiswa.findById(req.params.id); // Mencari mahasiswa berdasarkan ID
    if (!mahasiswa)
      return res.status(404).json({ message: "Mahasiswa not found" }); // Jika mahasiswa tidak ditemukan

    if (req.file) {
      // Jika ada file foto baru
      if (mahasiswa.foto) {
        // Hapus foto lama jika ada
        fs.unlinkSync(path.join(__dirname, "../", mahasiswa.foto));
      }
      mahasiswa.foto = req.file.path; // Simpan path file baru
    }

    // Perbarui field mahasiswa
    mahasiswa.npm = npm ?? mahasiswa.npm;
    mahasiswa.nama = nama ?? mahasiswa.nama;
    mahasiswa.prodi_id = prodi_id ?? mahasiswa.prodi_id;
    mahasiswa.jenis_kelamin = jenis_kelamin ?? mahasiswa.jenis_kelamin;
    mahasiswa.asal_sekolah = asal_sekolah ?? mahasiswa.asal_sekolah;

    await mahasiswa.save(); // Menyimpan data mahasiswa yang diperbarui ke database
    res.json(mahasiswa); // Mengembalikan data mahasiswa yang diperbarui
  } catch (error) {
    res.status(500).json({ message: error.message }); // Menangani error
  }
};

// Fungsi untuk menghapus data mahasiswa
exports.deleteMahasiswa = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findByIdAndDelete(req.params.id); // Menghapus mahasiswa berdasarkan ID
    if (!mahasiswa)
      return res.status(404).json({ message: "Mahasiswa not found" }); // Jika mahasiswa tidak ditemukan

    if (mahasiswa.foto) {
      // Jika ada file foto, hapus file tersebut
      fs.unlinkSync(path.join(__dirname, "../", mahasiswa.foto));
    }

    res.json({ message: "Mahasiswa deleted successfully" }); // Mengembalikan respon sukses
  } catch (error) {
    res.status(500).json({ message: error.message }); // Menangani error
  }
};