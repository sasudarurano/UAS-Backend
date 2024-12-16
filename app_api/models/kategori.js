// model kategori
// mengimpor modul mongoose untuk mengelola koneksi dengan mongodb
const mongoose = require("mongoose");

// definisikan schema untuk kategori
const kategoriSchema = new mongoose.Schema({
    // field untuk nama kategori
    nama: {
        type: String,
        required: true,
        trim: true,
    },
    // field untuk deskripsi kategori
    deskripsi: {
        type: String,
        trim: true,
    },
    // field untuk URL kategori
    url: {
        type: String,
        trim: true,
    },
    // field untuk menyimpan tanggal pembuatan data kategori
    tanggalDibuat: {
        type: Date,
        default: Date.now,
    },
    // field untuk status kategori
    status: {
        type: String,
        enum: ['Aktif', 'Tidak Aktif'],
        default: 'Aktif'
    },
});

// buat modul kategori dari skema yang telah didefinisikan
const Kategori = mongoose.model("Kategori", kategoriSchema);

module.exports = Kategori;