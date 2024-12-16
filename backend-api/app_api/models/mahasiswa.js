const mongoose = require("mongoose"); // Mengimpor mongoose untuk membuat model dan skema MongoDB

// Skema Mahasiswa
const mahasiswaSchema = new mongoose.Schema(
  {
    npm: {
      type: String, // Tipe data String
      required: true, // Wajib diisi
      unique: true, // NPM harus unik, tidak boleh duplikat
    },
    nama: {
      type: String, // Tipe data String
      required: true, // Wajib diisi
    },
    prodi_id: {
      type: mongoose.Schema.Types.ObjectId, // Mengacu pada ID dokumen lain di MongoDB
      ref: "Prodi", // Berelasi dengan model "Prodi"
      required: true, // Wajib diisi
    },
    jenis_kelamin: {
      type: String, // Tipe data String
      enum: ["L", "P"], // Hanya menerima nilai "L" untuk Laki-laki atau "P" untuk Perempuan
      required: true, // Wajib diisi
    },
    asal_sekolah: {
      type: String, // Tipe data String
      required: true, // Wajib diisi
    },
    foto: {
      type: String, // Tipe data String, menyimpan URL atau path file foto
      required: false, // Tidak wajib diisi
    },
  },
  { timestamps: true } // Menambahkan kolom createdAt dan updatedAt secara otomatis
);
// Membuat Model Mahasiswa
const Mahasiswa = mongoose.model("Mahasiswa", mahasiswaSchema); // Membuat model berdasarkan skema Mahasiswa

module.exports = Mahasiswa; // Mengekspor model Mahasiswa agar dapat digunakan di file lain