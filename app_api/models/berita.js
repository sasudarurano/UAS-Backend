// model berita
// mengimpor modul mongoose untuk mengelola koneksi dengan mongodb
const mongoose = require("mongoose");

// definisikan schema untuk berita
const beritaSchema = new mongoose.Schema({
    // field untuk judul berita
    judul: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255 
    },
    // field untuk isi berita
    isiBerita: {
        type: String,
        required: true,
    },
    // field untuk tanggal terbit berita
    tanggalTerbit: {
        type: Date,
        default: Date.now,
    },
    // foreign key ke tabel Penulis
    penulis: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Penulis', // Nama model Penulis
        required: true
    },
    // field untuk status berita
    status: {
        type: String,
        enum: ['Draft', 'Dipublikasikan', 'Diarsipkan'],
        default: 'Draft'
    },
    // field untuk URL gambar utama berita
    gambarUtama: {
        type: String,
        trim: true,
    },
    // field untuk URL berita
    url: {
        type: String,
        trim: true,
        maxlength: 255,
        unique: true // Pastikan URL unik
    },
    // field untuk kategori berita (asumsikan ada model Kategori)
    kategori: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kategori', // Nama model Kategori
        required: true
    },
    // array untuk menyimpan sumber berita (asumsikan ada model Sumber)
    sumber: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sumber' // Nama model Sumber
    }]
});

// buat modul berita dari skema yang telah didefinisikan
const Berita = mongoose.model("Berita", beritaSchema);

module.exports = Berita;