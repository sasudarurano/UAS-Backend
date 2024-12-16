const Fakultas = require("../models/fakultas");


const getAllFakultas = async (req, res) =>{
    try {
        // mengambil semua fakultas dari database
        const fakultas = await Fakultas.find();
        // mengirim respon dengan status 200 dan data fakultas
        res.status(200).json(fakultas);
    }catch (err) {
        // mengirim respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

const getFakultasById = async (req, res) => {
    try {
        // mencari fakultas berdasarkan id yang diberikan di parameter
        const fakultas = await Fakultas.findById(req.params.id);
        // jika fakultas tidak ditemukan, kirimkan respon 404
        if (!fakultas)
            return res.status(404).json({ message: "Fakultas not found" });
        // mengirim respon dengan status 200 dan data fakultas
        res.status(200).json(fakultas);
    }catch (err) {
        // mengirim respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

const createFakultas = async (req, res) => {
    // membuat instance fakultas baru dari data yang diterima
    const fakultas = new Fakultas({
        nama: req.body.nama,
        singkatan: req.body.singkatan,
    });

    try {
        // menyimpan fakultas baru ke database
        const newFakultas = await fakultas.save();
        // mengirim respon dengan status 201 dan data fakultas baru
        res.status(201).json(newFakultas);
    }catch (err) {
        // mengirim respon dengan status 400 jika ada kesalahan saat menyimpan
        res.status(400).json({ message: err.message })
    }
};

const updateFakultas = async (req, res) => {
    try {
        // mencari fakultas berdasarkan id yang diberikan di parameter
        const fakultas = await Fakultas.findById(req.params.id);
        // jika fakultas tidak ditemukan, kirimkan respon 404
        if (!fakultas)
            return res.status(404).json({ message: "Fakultas not found" });
        // memperbarui nama fakultas jika ada di request body
        if (req.body.nama != null) {
            fakultas.nama = req.body.nama;
        }

        // memperbarui singkatan fakultas jika ada di rquest body
        if (req.body.singkatan != null) {
            fakultas.singkatan = req.body.singkatan;
        }

        // menyimpan perubahan ke database
        const updateFakultas = await fakultas.save();
        // mengirimkan respons dengan status 200 dan data fakultas yang di perbarui
        res.status(200).json(updateFakultas);
    }catch (err) {
        // mengirimkan respon dengan status 400 jika ada kesalahan saat memperbarui
        res.status(400).json({ message: err.message });
    }
};

const deleteFakultas = async (req, res) => {
    try {
        const fakultas = await Fakultas.findById(req.params.id);
        // jika fakultas tidak ditemukan, kirimkan respon 404
        if (!fakultas)
            return res.status(404).json({ message: "Fakultas not found" });

        // menghapus fakultas dari database
        await fakultas.deleteOne();
        // mengirimkan respon dengan status 200 dan pesan penghapusan
        res.status(200).json({ message: "Fakultas deleted"});
    }catch (err) {
        // mengirimkan respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

module.exports = {getAllFakultas,createFakultas,getFakultasById,updateFakultas,deleteFakultas};