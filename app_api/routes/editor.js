const express = require("express");
const router = express.Router();
const editorController = require("../controllers/editorController");

// Mengimpor middleware untuk autentikasi dan pengecekan peran
const authmiddleware = require("../middleware/authMiddleware"); // Note the capital 'M'
const roleMiddleware = require("../middleware/roleMiddleware");

// Definisi rute untuk editor
router.get("/", authmiddleware, editorController.getAllEditor);

router.post("/", authmiddleware, roleMiddleware("admin"), editorController.createEditor); 

router.get("/:id", authmiddleware, editorController.getEditorById);

router.put("/:id", authmiddleware, roleMiddleware("admin"), editorController.updateEditor);

router.delete("/:id", authmiddleware, roleMiddleware("admin"), editorController.deleteEditor);

module.exports = router;