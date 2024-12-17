const express = require("express");
const router = express.Router();
const penulisController = require("../controllers/penulisController");


// Mengimpor middleware untuk autentikasi dan pengecekan peran
const authmiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Definisi rute untuk penulis
router.get("/",  penulisController.getAllPenulis);

router.post("/", authmiddleware, roleMiddleware(["editor", "admin"]), penulisController.createPenulis); 

router.get("/:id",penulisController.getPenulisById);

router.put("/:id", authmiddleware, roleMiddleware(["editor", "admin"]), penulisController.updatePenulis);

router.delete("/:id", authmiddleware, roleMiddleware([ "admin"]), penulisController.deletePenulis);

module.exports = router;