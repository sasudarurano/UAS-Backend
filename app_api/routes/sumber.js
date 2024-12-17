const express = require("express");
const router = express.Router();
const sumberController = require("../controllers/sumberController");

// Mengimpor middleware untuk autentikasi dan pengecekan peran
const authmiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Definisi rute untuk sumber
router.get("/", sumberController.getAllSumber);

router.post("/", authmiddleware, roleMiddleware("admin"), sumberController.createSumber); 

router.get("/:id", sumberController.getSumberById);

router.put("/:id", authmiddleware, roleMiddleware("admin"), sumberController.updateSumber);

router.delete("/:id", authmiddleware, roleMiddleware("admin"), sumberController.deleteSumber); 

module.exports = router;