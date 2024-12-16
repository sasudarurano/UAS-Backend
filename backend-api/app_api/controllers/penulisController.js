const Penulis = require("../models/penulis");

const getAllPenulis = async (req, res) =>{
    try {
        // mengambil semua penulis dari database
        const penulis = await Penulis.find();
        // mengirim respon dengan status 200 dan data penulis
        res.status(200).json(penulis);
    }catch (err) {
        // mengirim respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

const getPenulisById = async (req, res) => {
    try {
        // mencari penulis berdasarkan id yang diberikan di parameter
        const penulis = await Penulis.findById(req.params.id);
        // jika penulis tidak ditemukan, kirimkan respon 404
        if (!penulis)
            return res.status(404).json({ message: "Penulis not found" });
        // mengirim respon dengan status 200 dan data penulis
        res.status(200).json(penulis);
    }catch (err) {
        // mengirim respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

const createPenulis = async (req, res) => {
    // membuat instance penulis baru dari data yang diterima
    const penulis = new Penulis({
        nama: req.body.nama,
        email: req.body.email,
        profilSingkat: req.body.profilSingkat,
        fotoProfil: req.body.fotoProfil,
        status: req.body.status,
        spesialisasi: req.body.spesialisasi
    });

    try {
        // menyimpan penulis baru ke database
        const newPenulis = await penulis.save();
        // mengirim respon dengan status 201 dan data penulis baru
        res.status(201).json(newPenulis);
    }catch (err) {
        // mengirim respon dengan status 400 jika ada kesalahan saat menyimpan
        res.status(400).json({ message: err.message })
    }
};

const updatePenulis = async (req, res) => {
    try {
        // mencari penulis berdasarkan id yang diberikan di parameter
        const penulis = await Penulis.findById(req.params.id);
        // jika penulis tidak ditemukan, kirimkan respon 404
        if (!penulis)
            return res.status(404).json({ message: "Penulis not found" });
        // memperbarui field penulis jika ada di request body
        if (req.body.nama != null) {
            penulis.nama = req.body.nama;
        }
        if (req.body.email != null) {
            penulis.email = req.body.email;
        }
        if (req.body.profilSingkat != null) {
            penulis.profilSingkat = req.body.profilSingkat;
        }
        if (req.body.fotoProfil != null) {
            penulis.fotoProfil = req.body.fotoProfil;
        }
        if (req.body.status != null) {
            penulis.status = req.body.status;
        }
        if (req.body.spesialisasi != null) {
            penulis.spesialisasi = req.body.spesialisasi;
        }

        // menyimpan perubahan ke database
        const updatePenulis = await penulis.save();
        // mengirimkan respons dengan status 200 dan data penulis yang di perbarui
        res.status(200).json(updatePenulis);
    }catch (err) {
        // mengirimkan respon dengan status 400 jika ada kesalahan saat memperbarui
        res.status(400).json({ message: err.message });
    }
};

const deletePenulis = async (req, res) => {
    try {
        const penulis = await Penulis.findById(req.params.id);
        // jika penulis tidak ditemukan, kirimkan respon 404
        if (!penulis)
            return res.status(404).json({ message: "Penulis not found" });

        // menghapus penulis dari database
        await penulis.deleteOne();
        // mengirimkan respon dengan status 200 dan pesan penghapusan
        res.status(200).json({ message: "Penulis deleted"});
    }catch (err) {
        // mengirimkan respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

module.exports = {getAllPenulis,createPenulis,getPenulisById,updatePenulis,deletePenulis};