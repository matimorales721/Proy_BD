// logger.js

const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

function setupLogging(app) {
    // Asegura que la carpeta 'logs' exista
    const logDir = path.join(__dirname, "logs");
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

    // Crea un stream para escribir los logs en archivo
    const accessLogStream = fs.createWriteStream(path.join(logDir, "access.log"), { flags: "a" });

    // Exporta el middleware configurado según el entorno
    function setupLogging(app) {
        if (process.env.NODE_ENV === "production") {
            app.use(morgan("combined", { stream: accessLogStream }));
        } else {
            app.use(morgan("dev"));
        }
    }
}

module.exports = setupLogging;
