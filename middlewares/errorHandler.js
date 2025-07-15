const { validationResult } = require("express-validator");

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  next();
}

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ mensaje: "Error interno del servidor" });
}

module.exports = {
  handleValidationErrors,
  errorHandler,
};
