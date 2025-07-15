// procesosRoutes.js

const express = require("express");
const { param } = require("express-validator");
const router = express.Router();
const controller = require("../controllers/procesoController");
const { handleValidationErrors } = require("../middlewares/errorHandler");

// 1. Rutas REST claras
router.get("/procesos", controller.getProcesos);
router.get(
    "/proceso/:c_proceso",
    param("c_proceso").isInt().withMessage("Debe ser un número entero"),
    handleValidationErrors,
    controller.getProceso
);

// 3. Prefijo común para rutas de PXP (ya está implementado en app.js o index.js al usar /api/pxp)
// 4. Middleware para logging (podés implementarlo en app.js)
// 5. Middleware para manejo de errores centralizados (ver ejemplo más abajo)
// 6. Validaciones con express-validator (pendiente de agregar)
// 7. Separación clara de responsabilidades (rutas solo redirigen a controladores)

module.exports = router;
