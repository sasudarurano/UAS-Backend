// beritaController.js
const Berita = require("../models/berita");
const path = require('path'); 

const getAllBerita = async (req, res) => {
    try {
        const berita = await Berita.find()
            .populate("editor", "nama email jabatan") // Populate data editor
            .populate("kategori")
            .populate("sumber");
        res.status(200).json(berita);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getBeritaById = async (req, res) => {
    try {
        const berita = await Berita.findById(req.params.id)
            .populate("editor", "nama email jabatan") // Populate data editor
            .populate("kategori")
            .populate("sumber");
        if (!berita)
            return res.status(404).json({ message: "Berita not found" });
        res.status(200).json(berita);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createBerita = async (req, res) => {
    try {
        const gambarUtama = req.file ? path.join('/uploads', req.file.filename)  : null; 

        const berita = new Berita({
            judul: req.body.judul,
            isiBerita: req.body.isiBerita,
            tanggalTerbit: req.body.tanggalTerbit,
            editor: req.body.editor, // Ambil ID editor dari request body
            status: req.body.status,
            gambarUtama: gambarUtama,
            url: req.body.url,
            kategori: req.body.kategori,
            sumber: req.body.sumber
        });

        const newBerita = await berita.save();

        const beritaWithDetails = await Berita.findById(newBerita._id)
            .populate("editor", "nama email jabatan") // Populate data editor
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

        if (req.body.judul != null) berita.judul = req.body.judul;
        if (req.body.isiBerita != null) berita.isiBerita = req.body.isiBerita;
        if (req.body.tanggalTerbit != null) berita.tanggalTerbit = req.body.tanggalTerbit;
        if (req.body.editor != null) berita.editor = req.body.editor; // Update ID editor jika ada
        if (req.body.status != null) berita.status = req.body.status;
        if (req.body.url != null) berita.url = req.body.url;
        if (req.body.kategori != null) berita.kategori = req.body.kategori;
        if (req.body.sumber != null) berita.sumber = req.body.sumber;

        if (req.file) {
            // Hapus gambar lama jika ada
            // if (berita.gambarUtama) { 
            //   // ... gunakan fs.unlink untuk menghapus file ...
            // }
            berita.gambarUtama = path.join('/uploads', req.file.filename);
        }

        const updatedBerita = await berita.save();

        const beritaWithDetails = await Berita.findById(updatedBerita._id)
            .populate("editor", "nama email jabatan") // Populate data editor
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

        // Hapus gambar utama jika ada
        // if (berita.gambarUtama) {
        //   // ... gunakan fs.unlink untuk menghapus file ...
        // }

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