const Sumber = require("../models/sumber");

const getAllSumber = async (req, res) =>{
    try {
        // mengambil semua sumber dari database
        const sumber = await Sumber.find();
        // mengirim respon dengan status 200 dan data sumber
        res.status(200).json(sumber);
    }catch (err) {
        // mengirim respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

const getSumberById = async (req, res) => {
    try {
        // mencari sumber berdasarkan id yang diberikan di parameter
        const sumber = await Sumber.findById(req.params.id);
        // jika sumber tidak ditemukan, kirimkan respon 404
        if (!sumber)
            return res.status(404).json({ message: "Sumber not found" });
        // mengirim respon dengan status 200 dan data sumber
        res.status(200).json(sumber);
    }catch (err) {
        // mengirim respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

const createSumber = async (req, res) => {
    // membuat instance sumber baru dari data yang diterima
    const sumber = new Sumber({
        nama: req.body.nama,
        jenisSumber: req.body.jenisSumber,
        urlReferensi: req.body.urlReferensi,
        tanggalAkses: req.body.tanggalAkses,
        kredibilitas: req.body.kredibilitas
    });

    try {
        // menyimpan sumber baru ke database
        const newSumber = await sumber.save();
        // mengirim respon dengan status 201 dan data sumber baru
        res.status(201).json(newSumber);
    }catch (err) {
        // mengirim respon dengan status 400 jika ada kesalahan saat menyimpan
        res.status(400).json({ message: err.message })
    }
};

const updateSumber = async (req, res) => {
    try {
        // mencari sumber berdasarkan id yang diberikan di parameter
        const sumber = await Sumber.findById(req.params.id);
        // jika sumber tidak ditemukan, kirimkan respon 404
        if (!sumber)
            return res.status(404).json({ message: "Sumber not found" });
        // memperbarui field sumber jika ada di request body
        if (req.body.nama != null) {
            sumber.nama = req.body.nama;
        }
        if (req.body.jenisSumber != null) {
            sumber.jenisSumber = req.body.jenisSumber;
        }
        if (req.body.urlReferensi != null) {
            sumber.urlReferensi = req.body.urlReferensi;
        }
        if (req.body.tanggalAkses != null) {
            sumber.tanggalAkses = req.body.tanggalAkses;
        }
        if (req.body.kredibilitas != null) {
            sumber.kredibilitas = req.body.kredibilitas;
        }

        // menyimpan perubahan ke database
        const updateSumber = await sumber.save();
        // mengirimkan respons dengan status 200 dan data sumber yang di perbarui
        res.status(200).json(updateSumber);
    }catch (err) {
        // mengirimkan respon dengan status 400 jika ada kesalahan saat memperbarui
        res.status(400).json({ message: err.message });
    }
};

const deleteSumber = async (req, res) => {
    try {
        const sumber = await Sumber.findById(req.params.id);
        // jika sumber tidak ditemukan, kirimkan respon 404
        if (!sumber)
            return res.status(404).json({ message: "Sumber not found" });

        // menghapus sumber dari database
        await sumber.deleteOne();
        // mengirimkan respon dengan status 200 dan pesan penghapusan
        res.status(200).json({ message: "Sumber deleted"});
    }catch (err) {
        // mengirimkan respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

module.exports = {getAllSumber,createSumber,getSumberById,updateSumber,deleteSumber};