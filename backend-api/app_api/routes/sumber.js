const express = require("express");
const router = express.Router();
const sumberController = require("../controllers/sumberController");

// Mengimpor middleware untuk autentikasi dan pengecekan peran
const authMiddleware = require("../middleware/authmiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Definisi rute untuk sumber
router.get("/", authMiddleware, sumberController.getAllSumber);

router.post("/", authMiddleware, roleMiddleware(["editor", "admin"]), sumberController.createSumber); 

router.get("/:id", authMiddleware, sumberController.getSumberById);

router.put("/:id", authMiddleware, roleMiddleware(["editor", "admin"]), sumberController.updateSumber);

router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), sumberController.deleteSumber); 

module.exports = router;