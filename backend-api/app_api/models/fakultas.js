// model fakultas
// mengimpor modul mongoose untuk mengelola koneksi dengan mongodb
const mongoose = require("mongoose");

// definisakn schema untuk fakultas
const fakultasSchema = new mongoose.Schema({
    // field untuk nama fakultas
    nama: {
        type: String,
        required: true,
        trim: true,
    },
    // field untuk singkatan fakultas
    singkatan: {
        type: String,
        required: true,
        trim: true,
    },
    // field untuk menyimpan tanggal pembuatan data fakultas
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

// buat modul fakultas dari skema yang telah didefinisikan
const Fakultas = mongoose.model("Fakultas", fakultasSchema);

module.exports = Fakultas;