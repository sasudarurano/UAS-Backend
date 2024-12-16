var express = require("express");
var router = express.Router();

const fakultasController = require("../controllers/fakultasController");

router.get("/", fakultasController.index);

router.post("/store", fakultasController.store);

module.exports = router;