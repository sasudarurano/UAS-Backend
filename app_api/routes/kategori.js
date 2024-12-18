const express = require("express");

const router = express.Router();

const kategoriController = require("../controllers/kategoriController"); // Ganti dengan kategoriController

// Mengimpor middleware untuk autentikasi dan pengecekan peran
const authmiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Definisi rute untuk kategori (diganti dari fakultas)
router.get("/",  kategoriController.getAllKategori); // Ganti controller 

// router.post("/", authmiddleware, roleMiddleware("admin"), kategoriController.createKategori); // Ganti controller dan middleware
router.post("/", kategoriController.createKategori);

router.get("/:id", kategoriController.getKategoriById); // Ganti controller

router.put("/:id", authmiddleware, roleMiddleware("admin"), kategoriController.updateKategori); // Ganti controller dan middleware

router.delete("/:id", authmiddleware, roleMiddleware("admin"), kategoriController.deleteKategori); // Ganti controller dan middleware

module.exports = router;