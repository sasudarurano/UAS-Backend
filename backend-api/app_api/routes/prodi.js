const express = require("express");

const router = express.Router();

const prodiController = require("../controllers/prodiController");

router.get("/", prodiController.getAllProdi);

router.post("/", prodiController.createProdi);

router.get("/:id", prodiController.getProdiById);

router.put("/:id", prodiController.updateProdi);

router.delete("/:id", prodiController.deleteProdi);

module.exports = router;