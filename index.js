// index.js

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { errorHandler } = require("./middlewares/errorHandler");
const procesosRoutes = require("./routes/procesosRoutes");
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
app.use("/api/pxp", procesosRoutes);

// Manejo de errores centralizado
app.use(errorHandler);


const start = async () => {
    try {
        // Inicializar el pool de conexiones con Oracle
        await initOraclePool();

        //console.log("📦 Pool Oracle creado correctamente");

        app.listen(PORT, () => {
            console.log(`✅ API Proy_BD corriendo 🚀 en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(error?.stack || error);
        process.exit(1);
    }
};

// Inicio del servidor
start();
