const express = require("express"); // Mengimpor framework Express.js
const router = express.Router(); // Membuat instance Router dari Express
const mahasiswaController = require("../controllers/mahasiswaController"); // Mengimpor controller untuk mahasiswa
const upload = require("../middleware/uploadMiddleware"); // Middleware untuk menangani upload file

// Mengimpor middleware untuk autentikasi dan pengecekan peran
const authmiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Route untuk mendapatkan semua data mahasiswa
router.get("/", authmiddleware, mahasiswaController.getAllMahasiswa);
// Mengarahkan ke fungsi getAllMahasiswa di controller untuk mengambil semua data mahasiswa

// Route untuk mendapatkan data mahasiswa berdasarkan ID
router.get("/:id", authmiddleware, mahasiswaController.getMahasiswaById);
// Mengarahkan ke fungsi getMahasiswaById di controller untuk mengambil data mahasiswa berdasarkan ID

// Route untuk menambahkan data mahasiswa baru, termasuk upload file foto
router.post("/", authmiddleware, roleMiddleware("admin"), upload.single("foto"), mahasiswaController.createMahasiswa);
// Middleware `upload.single("foto")` menangani upload file dengan field `foto` sebelum fungsi createMahasiswa dijalankan

// Route untuk memperbarui data mahasiswa, dengan upload foto opsional
router.put("/:id", authmiddleware, roleMiddleware("admin"), upload.single("foto"), mahasiswaController.updateMahasiswa);
// Middleware `upload.single("foto")` menangani upload file dengan field `foto` sebelum fungsi updateMahasiswa dijalankan

// Route untuk menghapus data mahasiswa berdasarkan ID
router.delete("/:id", authmiddleware, roleMiddleware("admin"), mahasiswaController.deleteMahasiswa);
// Mengarahkan ke fungsi deleteMahasiswa di controller untuk menghapus data mahasiswa berdasarkan ID

module.exports = router; // Mengekspor router agar dapat digunakan di file lain