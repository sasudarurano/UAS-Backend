const express = require("express");
const router = express.Router();
const editorController = require("../controllers/editorController");

// Mengimpor middleware untuk autentikasi dan pengecekan peran
const authMiddleware = require("../middleware/authmiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Definisi rute untuk editor
router.get("/", authMiddleware, editorController.getAllEditor);

router.post("/", authMiddleware, roleMiddleware("admin"), editorController.createEditor); 

router.get("/:id", authMiddleware, editorController.getEditorById);

router.put("/:id", authMiddleware, roleMiddleware("admin"), editorController.updateEditor);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), editorController.deleteEditor);

module.exports = router;