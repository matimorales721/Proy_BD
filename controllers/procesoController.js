const { getProcesos, getProceso } = require("../services/procesosService");

exports.getProcesos = async (req, res) => {
    try {
        const procesos = await getProcesos();
        res.json(procesos);
    } catch (error) {
        // Solo loguear el error completo si NO es el error de conexión Oracle (503)
        // Para el error ORA-12154, ya tenemos el warning en el service
        if (error.statusCode !== 503) {
            console.error("Error en getProcesos:", error);
        }

        // Si el error tiene un statusCode específico, úsalo
        const statusCode = error.statusCode || 500;
        const message = error.message || "No se pudieron obtener los procesos";

        res.status(statusCode).json({ error: message });
    }
};

exports.getProceso = async (req, res) => {
    try {
        const c_proceso = parseInt(req.params.c_proceso, 10);

        if (isNaN(c_proceso)) {
            return res.status(400).json({ error: "Parámetro c_proceso inválido" });
        }

        const proceso = await getProceso(c_proceso);

        if (proceso) {
            res.json(proceso);
        } else {
            res.status(404).json({ error: "Proceso no encontrado" });
        }
    } catch (error) {
        // Solo loguear el error completo si NO es el error de conexión Oracle (503)
        // Para el error ORA-12154, ya tenemos el warning en el service
        if (error.statusCode !== 503) {
            console.error("Error en getProceso:", error);
        }

        // Si el error tiene un statusCode específico, úsalo
        const statusCode = error.statusCode || 500;
        const message = error.message || "No se pudo obtener el proceso";

        res.status(statusCode).json({ error: message });
    }
};
