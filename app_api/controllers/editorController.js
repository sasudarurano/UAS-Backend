const Editor = require("../models/editor");

const getAllEditor = async (req, res) =>{
    try {
        // mengambil semua editor dari database
        const editor = await Editor.find();
        // mengirim respon dengan status 200 dan data editor
        res.status(200).json(editor);
    }catch (err) {
        // mengirim respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

const getEditorById = async (req, res) => {
    try {
        // mencari editor berdasarkan id yang diberikan di parameter
        const editor = await Editor.findById(req.params.id);
        // jika editor tidak ditemukan, kirimkan respon 404
        if (!editor)
            return res.status(404).json({ message: "Editor not found" });
        // mengirim respon dengan status 200 dan data editor
        res.status(200).json(editor);
    }catch (err) {
        // mengirim respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

const createEditor = async (req, res) => {
    // membuat instance editor baru dari data yang diterima
    const editor = new Editor({
        nama: req.body.nama,
        email: req.body.email,
        jabatan: req.body.jabatan,
        fotoProfil: req.body.fotoProfil,
        status: req.body.status
    });

    try {
        // menyimpan editor baru ke database
        const newEditor = await editor.save();
        // mengirim respon dengan status 201 dan data editor baru
        res.status(201).json(newEditor);
    }catch (err) {
        // mengirim respon dengan status 400 jika ada kesalahan saat menyimpan
        res.status(400).json({ message: err.message })
    }
};

const updateEditor = async (req, res) => {
    try {
        // mencari editor berdasarkan id yang diberikan di parameter
        const editor = await Editor.findById(req.params.id);
        // jika editor tidak ditemukan, kirimkan respon 404
        if (!editor)
            return res.status(404).json({ message: "Editor not found" });
        // memperbarui field editor jika ada di request body
        if (req.body.nama != null) {
            editor.nama = req.body.nama;
        }
        if (req.body.email != null) {
            editor.email = req.body.email;
        }
        if (req.body.jabatan != null) {
            editor.jabatan = req.body.jabatan;
        }
        if (req.body.fotoProfil != null) {
            editor.fotoProfil = req.body.fotoProfil;
        }
        if (req.body.status != null) {
            editor.status = req.body.status;
        }

        // menyimpan perubahan ke database
        const updatedEditor = await editor.save();
        // mengirimkan respons dengan status 200 dan data editor yang di perbarui
        res.status(200).json(updatedEditor);
    }catch (err) {
        // mengirimkan respon dengan status 400 jika ada kesalahan saat memperbarui
        res.status(400).json({ message: err.message });
    }
};

const deleteEditor = async (req, res) => {
    try {
        const editor = await Editor.findById(req.params.id);
        // jika editor tidak ditemukan, kirimkan respon 404
        if (!editor)
            return res.status(404).json({ message: "Editor not found" });

        // menghapus editor dari database
        await editor.deleteOne();
        // mengirimkan respon dengan status 200 dan pesan penghapusan
        res.status(200).json({ message: "Editor deleted"});
    }catch (err) {
        // mengirimkan respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllEditor,
    createEditor,
    getEditorById,
    updateEditor,
    deleteEditor
};