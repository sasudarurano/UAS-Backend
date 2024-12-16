const express = require("express");

const router = express.Router();

const kategoriController = require("../controllers/kategoriController"); // Ganti dengan kategoriController

// Mengimpor middleware untuk autentikasi dan pengecekan peran
const authMiddleware = require("../middleware/authmiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Definisi rute untuk kategori (diganti dari fakultas)
router.get("/", authMiddleware, kategoriController.getAllKategori); // Ganti controller 

router.post("/", authMiddleware, roleMiddleware("admin"), kategoriController.createKategori); // Ganti controller dan middleware

router.get("/:id", authMiddleware, kategoriController.getKategoriById); // Ganti controller

router.put("/:id", authMiddleware, roleMiddleware("admin"), kategoriController.updateKategori); // Ganti controller dan middleware

router.delete("/:id", authMiddleware, roleMiddleware("admin"), kategoriController.deleteKategori); // Ganti controller dan middleware

module.exports = router;