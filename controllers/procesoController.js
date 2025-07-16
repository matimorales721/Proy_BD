const { getProcesos, getProceso } = require("../services/procesosService");

exports.getProcesos = async (req, res) => {
    try {
        const procesos = await getProcesos();
        res.json(procesos);
    } catch (error) {
        console.error("Error en getProcesos:", error);
        res.status(500).json({ error: "No se pudieron obtener los procesos" });
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
        console.error("Error en getProceso:", error);
        res.status(500).json({ error: "No se pudo obtener el proceso" });
    }
};
