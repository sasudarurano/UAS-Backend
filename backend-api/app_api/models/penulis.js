    // model penulis
    // mengimpor modul mongoose untuk mengelola koneksi dengan mongodb
    const mongoose = require("mongoose");

    // definisikan schema untuk penulis
    const penulisSchema = new mongoose.Schema({
        // field untuk nama penulis
        nama: {
            type: String,
            required: true,
            trim: true,
        },
        // field untuk email penulis
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true, // memastikan email unik
            lowercase: true, // menyimpan email dalam huruf kecil
            validate: {
                validator: function(value) {
                    // validasi format email sederhana
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                },
                message: 'Email tidak valid'
            }
        },
        // field untuk profil singkat penulis
        profilSingkat: {
            type: String,
            trim: true,
        },
        // field untuk URL foto profil penulis
        fotoProfil: {
            type: String,
            trim: true,
        },
        // field untuk status penulis
        status: {
            type: String,
            enum: ['Aktif', 'Tidak Aktif'],
            default: 'Aktif'
        },
        // field untuk spesialisasi penulis
        spesialisasi: {
            type: String,
            trim: true,
        },
        // field untuk menyimpan tanggal pembuatan data penulis
        tanggalDibuat: {
            type: Date,
            default: Date.now,
        },
    });

    // buat modul penulis dari skema yang telah didefinisikan
    const Penulis = mongoose.model("Penulis", penulisSchema);

    module.exports = Penulis;