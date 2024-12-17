const Berita = require("../models/berita");
const path = require('path'); // Impor modul path

const getAllBerita = async (req, res) => {
    try {
        const berita = await Berita.find()
            .populate("penulis", "nama")
        res.status(200).json(berita);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getBeritaById = async (req, res) => {
    try {
        const berita = await Berita.findById(req.params.id)
            .populate("penulis", "nama")
        if (!berita)
            return res.status(404).json({ message: "Berita not found" });
        res.status(200).json(berita);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createBerita = async (req, res) => {
    try {
        const gambarUtama = req.file ? path.join('/uploads', req.file.filename)  : null; // Gabungkan path dengan nama file

        const berita = new Berita({
            judul: req.body.judul,
            isiBerita: req.body.isiBerita,
            tanggalTerbit: req.body.tanggalTerbit,
            penulis: req.body.penulis,
            editor: req.body.editor,
            status: req.body.status,
            gambarUtama: gambarUtama,
            url: req.body.url,
            kategori: req.body.kategori,
            sumber: req.body.sumber
        });

        const newBerita = await berita.save();

        // Populate data relasi setelah berita disimpan
        const beritaWithDetails = await Berita.findById(newBerita._id)
            .populate("penulis", "nama")
            .populate("kategori")
            .populate("sumber");

        res.status(201).json(beritaWithDetails);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};

const updateBerita = async (req, res) => {
    try {
        const berita = await Berita.findById(req.params.id);
        if (!berita)
            return res.status(404).json({ message: "Berita not found" });

        // Update field berita
        if (req.body.judul != null) berita.judul = req.body.judul;
        if (req.body.isiBerita != null) berita.isiBerita = req.body.isiBerita;
        if (req.body.tanggalTerbit != null) berita.tanggalTerbit = req.body.tanggalTerbit;
        if (req.body.penulis != null) berita.penulis = req.body.penulis;
        if (req.body.editor != null) berita.editor = req.body.editor;
        if (req.body.status != null) berita.status = req.body.status;
        if (req.body.url != null) berita.url = req.body.url;
        if (req.body.kategori != null) berita.kategori = req.body.kategori;
        if (req.body.sumber != null) berita.sumber = req.body.sumber;

        // Update gambar utama jika ada file baru yang diupload
        if (req.file) {
            // Hapus gambar lama jika ada (Anda perlu implementasikan ini)
            if (berita.gambarUtama) { 
                // ... gunakan fs.unlink untuk menghapus file ...
            }
            berita.gambarUtama = path.join('/uploads', req.file.filename);
        }

        const updatedBerita = await berita.save();

        // Populate data relasi setelah berita diupdate
        const beritaWithDetails = await Berita.findById(updatedBerita._id)
            .populate("penulis", "nama")
            .populate("kategori")
            .populate("sumber");

        res.status(200).json(beritaWithDetails);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteBerita = async (req, res) => {
    try {
        const berita = await Berita.findById(req.params.id);
        if (!berita)
            return res.status(404).json({ message: "Berita not found" });

        // Hapus gambar utama jika ada (Anda perlu implementasikan ini)
        if (berita.gambarUtama) {
            // ... gunakan fs.unlink untuk menghapus file ...
        }

        await berita.deleteOne();
        res.status(200).json({ message: "Berita deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllBerita,
    createBerita,
    getBeritaById,
    updateBerita,
    deleteBerita
};