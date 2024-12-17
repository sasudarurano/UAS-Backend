const express = require("express");

const router = express.Router();

const fakultasController = require("../controllers/fakultasController");

// Mengimpor middleware untuk autentikasi dan pengecekan peran
const authmiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
// const authMiddleware = require("../middleware/authMiddleware");
// const roleMiddleware = require("../middleware/roleMiddleware");

// Definisi rute untuk fakultas
// Mengatur rute GET untuk mendapatkan semua data fakultas
router.get("/", authmiddleware, fakultasController.getAllFakultas);
// Mengatur rute POST untuk membuat data fakultas baru
router.post("/", authmiddleware, roleMiddleware("admin"), fakultasController.createFakultas);
// Mengatur rute GET untuk mendapatkan data fakultas berdasarkan ID
router.get("/:id", authmiddleware, fakultasController.getFakultasById);
// Mengatur rute PUT untuk memperbarui data fakultas berdasarkan ID
router.put("/:id", authmiddleware, roleMiddleware("admin"), fakultasController.updateFakultas);
// Mengatur rute DELETE untuk menghapus data fakultas berdasarkan ID
router.delete("/:id", authmiddleware, roleMiddleware("admin"), fakultasController.deleteFakultas);


// router.get("/", fakultasController.getAllFakultas);

// router.post("/", fakultasController.createFakultas);

// router.get("/:id", fakultasController.getFakultasById);

// router.put("/:id", fakultasController.updateFakultas);

// router.delete("/:id", fakultasController.deleteFakultas);

module.exports = router;