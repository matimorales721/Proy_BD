// index.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { errorHandler } = require("./middlewares/errorHandler");
const pxpRoutes = require("./routes/procesosRoutes");
const setupLogging = require("./logger");

const app = express();
const PORT = process.env.PORT || 3000;

const { initOraclePool } = require("./db/connections");

// Middleware para logs
setupLogging(app); // Logs a consola y archivo

// Middlewares globales
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api/pxp", pxpRoutes);

// Manejo de errores centralizado
app.use(errorHandler);

// Inicio del servidor
(async () => {
    try {
        await initOraclePool();
        app.listen(PORT, () => {
            console.log(`✅ API corriendo en http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("❌ No se pudo iniciar la app por error al crear pool:", err);
        process.exit(1);
    }
})();
