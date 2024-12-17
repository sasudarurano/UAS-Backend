const express = require("express");
const router = express.Router();
const beritaController = require("../controllers/beritaController");
const upload = require('../middleware/uploadMiddleware'); // Import middleware upload

// Mengimpor middleware untuk autentikasi dan pengecekan peran
const authmiddleware = require("../middleware/authMiddleware"); 
const roleMiddleware = require("../middleware/roleMiddleware");

// Definisi rute untuk berita
router.get("/", authmiddleware, beritaController.getAllBerita);

// Route untuk membuat berita baru dengan upload gambar
router.post("/", authmiddleware, roleMiddleware( "admin"), upload.single('gambarUtama'), beritaController.createBerita);

router.get("/:id", authmiddleware, beritaController.getBeritaById);

// Route untuk update berita, dengan middleware upload untuk menangani gambar baru (jika ada)
router.put("/:id", authmiddleware, roleMiddleware( "admin"), upload.single('gambarUtama'), beritaController.updateBerita); 

router.delete("/:id", authmiddleware, roleMiddleware("admin"), beritaController.deleteBerita);

module.exports = router;