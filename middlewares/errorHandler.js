const { validationResult } = require("express-validator");

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }
    next();
}

function errorHandler(err, req, res, next) {
    console.error("🧨 Error:", err.message);

    const statusCode = err.status || 500;

    if (process.env.DB_ENV === "FIX" || process.env.DB_ENV === "LIQUIDA") {
        console.error(err); // stack completo solo si estás debuggeando
    }

    res.status(statusCode).json({
        error: err.message,
        code: err.internalCode || "INTERNAL_SERVER_ERROR",
    });
}

module.exports = {
    handleValidationErrors,
    errorHandler,
};
