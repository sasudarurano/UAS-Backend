const express = require("express");
const router = express.Router();
const beritaController = require("../controllers/beritaController");
const upload = require('../middleware/uploadMiddleware'); 

// Middleware autentikasi dan otorisasi
const authmiddleware = require("../middleware/authMiddleware"); 
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", authmiddleware, beritaController.getAllBerita);

router.post("/", authmiddleware, roleMiddleware("admin"), upload.single('gambarUtama'), beritaController.createBerita);

router.get("/:id", authmiddleware, beritaController.getBeritaById);

router.put("/:id", authmiddleware, roleMiddleware("admin"), upload.single('gambarUtama'), beritaController.updateBerita); 

router.delete("/:id", authmiddleware, roleMiddleware("admin"), beritaController.deleteBerita);

module.exports = router;