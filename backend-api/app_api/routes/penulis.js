const express = require("express");
const router = express.Router();
const penulisController = require("../controllers/penulisController");


// Mengimpor middleware untuk autentikasi dan pengecekan peran
const authMiddleware = require("../middleware/authmiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Definisi rute untuk penulis
router.get("/", authMiddleware, penulisController.getAllPenulis);

router.post("/", authMiddleware, roleMiddleware(["admin"]), penulisController.createPenulis); 

router.get("/:id", authMiddleware, penulisController.getPenulisById);

router.put("/:id", authMiddleware, roleMiddleware(["editor", "admin"]), penulisController.updatePenulis);

router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), penulisController.deletePenulis);

module.exports = router;