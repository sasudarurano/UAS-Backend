    // model editor
// mengimpor modul mongoose untuk mengelola koneksi dengan mongodb
const mongoose = require("mongoose");

// definisikan schema untuk editor
const editorSchema = new mongoose.Schema({
    // field untuk nama editor
    nama: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255
    },
    // field untuk email editor
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
    // field untuk jabatan editor
    jabatan: {
        type: String,
        trim: true,
        maxlength: 255
    },
    // field untuk URL foto profil editor
    fotoProfil: {
        type: String,
        trim: true,
        maxlength: 255
    },
    // field untuk status editor
    status: {
        type: String,
        enum: ['Aktif', 'Tidak Aktif'],
        default: 'Aktif'
    }
});

// buat modul editor dari skema yang telah didefinisikan
const Editor = mongoose.model("Editor", editorSchema);

module.exports = Editor;