const express = require("express");
const router = express.Router();
const controller = require("../controllers/pxpController");

router.get("/procesos", controller.getProcesos);
router.get("/proceso/:c_proceso", controller.getProceso);
// no devuelve una lista con 1 elemento, devuelve el elemento

module.exports = router;
