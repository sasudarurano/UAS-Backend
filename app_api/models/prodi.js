const mongoose = require("mongoose");

// definisakn schema untuk fakultas
const prodiSchema = new mongoose.Schema({
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
    fakultas_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fakultas",
        required: true,
    },
    // field untuk menyimpan tanggal pembuatan data fakultas
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

// buat modul prodi dari skema yang telah didefinisikan
const Prodi = mongoose.model("Prodi", prodiSchema);

module.exports = Prodi;