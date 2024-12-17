// models/editor.js
const mongoose = require("mongoose");

const editorSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        maxlength: 255,
        unique: true // Pastikan email unik
    },
    jabatan: {
        type: String,
        maxlength: 255
    },
    fotoProfil: {
        type: String, 
        maxlength: 255
    },
    status: {
        type: String,
        enum: ['Aktif', 'Tidak Aktif'],
        default: 'Aktif'
    }
});

const Editor = mongoose.model("Editor", editorSchema);

module.exports = Editor;