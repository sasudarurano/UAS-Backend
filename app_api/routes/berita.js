const express = require("express");
const router = express.Router();
const beritaController = require("../controllers/beritaController");
const upload = require('../middleware/uploadMiddleware'); // Import middleware upload

// Mengimpor middleware untuk autentikasi dan pengecekan peran
const authMiddleware = require("../middleware/authmiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Definisi rute untuk berita
router.get("/", authMiddleware, beritaController.getAllBerita);

// Route untuk membuat berita baru dengan upload gambar
router.post("/", authMiddleware, roleMiddleware(["editor", "admin"]), upload.single('gambarUtama'), beritaController.createBerita);

router.get("/:id", authMiddleware, beritaController.getBeritaById);

// Route untuk update berita, dengan middleware upload untuk menangani gambar baru (jika ada)
router.put("/:id", authMiddleware, roleMiddleware(["editor", "admin"]), upload.single('gambarUtama'), beritaController.updateBerita); 

router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), beritaController.deleteBerita);

module.exports = router;