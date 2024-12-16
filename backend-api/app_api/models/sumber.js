// model sumber
// mengimpor modul mongoose untuk mengelola koneksi dengan mongodb
const mongoose = require("mongoose");

// definisikan schema untuk sumber
const sumberSchema = new mongoose.Schema({
    // field untuk nama sumber
    nama: {
        type: String,
        required: true,
        trim: true,
    },
    // field untuk jenis sumber
    jenisSumber: {
        type: String,
        enum: ['Wawancara', 'Situs Web', 'Dokumen', 'Lainnya'],
        required: true,
    },
    // field untuk URL/referensi sumber
    urlReferensi: {
        type: String,
        trim: true,
    },
    // field untuk tanggal akses sumber
    tanggalAkses: {
        type: Date,
        default: Date.now,
    },
    // field untuk kredibilitas sumber
    kredibilitas: {
        type: String,
        enum: ['Tinggi', 'Sedang', 'Rendah'],
        required: true,
    },
    // field untuk menyimpan tanggal pembuatan data sumber
    tanggalDibuat: {
        type: Date,
        default: Date.now,
    },
});

// buat modul sumber dari skema yang telah didefinisikan
const Sumber = mongoose.model("Sumber", sumberSchema);

module.exports = Sumber;