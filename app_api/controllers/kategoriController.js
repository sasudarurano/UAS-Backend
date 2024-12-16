const Kategori = require("../models/kategori");

const getAllKategori = async (req, res) =>{
    try {
        // mengambil semua kategori dari database
        const kategori = await Kategori.find();
        // mengirim respon dengan status 200 dan data kategori
        res.status(200).json(kategori);
    }catch (err) {
        // mengirim respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

const getKategoriById = async (req, res) => {
    try {
        // mencari kategori berdasarkan id yang diberikan di parameter
        const kategori = await Kategori.findById(req.params.id);
        // jika kategori tidak ditemukan, kirimkan respon 404
        if (!kategori)
            return res.status(404).json({ message: "Kategori not found" });
        // mengirim respon dengan status 200 dan data kategori
        res.status(200).json(kategori);
    }catch (err) {
        // mengirim respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

const createKategori = async (req, res) => {
    // membuat instance kategori baru dari data yang diterima
    const kategori = new Kategori({
        nama: req.body.nama,
        deskripsi: req.body.deskripsi,
        url: req.body.url,
        status: req.body.status
    });

    try {
        // menyimpan kategori baru ke database
        const newKategori = await kategori.save();
        // mengirim respon dengan status 201 dan data kategori baru
        res.status(201).json(newKategori);
    }catch (err) {
        // mengirim respon dengan status 400 jika ada kesalahan saat menyimpan
        res.status(400).json({ message: err.message })
    }
};

const updateKategori = async (req, res) => {
    try {
        // mencari kategori berdasarkan id yang diberikan di parameter
        const kategori = await Kategori.findById(req.params.id);
        // jika kategori tidak ditemukan, kirimkan respon 404
        if (!kategori)
            return res.status(404).json({ message: "Kategori not found" });
        // memperbarui nama kategori jika ada di request body
        if (req.body.nama != null) {
            kategori.nama = req.body.nama;
        }
        // memperbarui deskripsi kategori jika ada di request body
        if (req.body.deskripsi != null) {
            kategori.deskripsi = req.body.deskripsi;
        }
        // memperbarui url kategori jika ada di request body
        if (req.body.url != null) {
            kategori.url = req.body.url;
        }
        // memperbarui status kategori jika ada di request body
        if (req.body.status != null) {
            kategori.status = req.body.status;
        }
        // menyimpan perubahan ke database
        const updateKategori = await kategori.save();
        // mengirimkan respons dengan status 200 dan data kategori yang di perbarui
        res.status(200).json(updateKategori);
    }catch (err) {
        // mengirimkan respon dengan status 400 jika ada kesalahan saat memperbarui
        res.status(400).json({ message: err.message });
    }
};

const deleteKategori = async (req, res) => {
    try {
        const kategori = await Kategori.findById(req.params.id);
        // jika kategori tidak ditemukan, kirimkan respon 404
        if (!kategori)
            return res.status(404).json({ message: "Kategori not found" });

        // menghapus kategori dari database
        await kategori.deleteOne();
        // mengirimkan respon dengan status 200 dan pesan penghapusan
        res.status(200).json({ message: "Kategori deleted"});
    }catch (err) {
        // mengirimkan respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

module.exports = {getAllKategori,createKategori,getKategoriById,updateKategori,deleteKategori};