const oracledb = require("../db/oracleClient");
const { handleOracleError } = require("../middlewares/oracleErrorHandler");

// Variable para rastrear el estado de la conexión
let wasDisconnected = false;
// Contador para los errores de conexión
let connectionErrorCount = 0;

// Función para obtener timestamp formateado
function getTimestamp() {
    return new Date().toLocaleString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
}

async function getProcesos() {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `SELECT C_PROCESO,
                    CASE WHEN C_TIPO_EJECUCION = 'M' THEN 'MENSUAL' ELSE 'EXCEPCIÓN' END TIPO_EJECUCION,
                    C_GRUPO,
                    C_PERIODO,
                    F_INICIO,
                    F_FIN,
                    C_ESTADO_CALCULO,
                    0 TUVO_ERRORES,
                    TO_CHAR(TRUNC(ROUND((F_FIN-F_INICIO)*24 ,2))) || ':' || TO_CHAR(TRUNC(MOD((F_FIN - F_INICIO) * 24 * 60, 60)), 'FM00') AS DURACION_HHMM
            FROM NMT_PXP_PROCESO_CALCULO WHERE c_proceso > 4000`,
            [],
            {
                outFormat: oracledb.OUT_FORMAT_OBJECT,
            }
        );

        // Si había una desconexión previa y ahora se conectó exitosamente
        if (wasDisconnected) {
            console.log(`🟢 [${getTimestamp()}] [getProcesos] ¡Conectado nuevamente!`);
            wasDisconnected = false;
        }

        return result.rows;
    } catch (error) {
        // Handle Oracle connection errors gracefully
        if (error.errorNum === 12154) {
            connectionErrorCount++;
            console.warn(
                `⚠️ [${getTimestamp()}] [getProcesos] Warning #${connectionErrorCount}: No se pudo conectar a la base de datos Oracle (ORA-12154)`
            );
            wasDisconnected = true; // Marcar que hubo una desconexión
            const dbError = new Error(
                "⚠️ No se pudo conectar a la base de datos Oracle. Intente nuevamente más tarde."
            );
            dbError.statusCode = 503; // Service Unavailable
            dbError.isOperational = true;
            throw dbError;
        }
        throw handleOracleError(error, "getProcesos");
    } finally {
        if (connection) await connection.close();
    }
}

async function getProceso(c_proceso) {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `SELECT * FROM NMT_PXP_PROCESO_CALCULO WHERE c_proceso = :c_proceso`,
            { c_proceso },
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        // Si había una desconexión previa y ahora se conectó exitosamente
        if (wasDisconnected) {
            console.log(`🟢[${getTimestamp()}] [getProceso] ¡Conectado nuevamente! para proceso ${c_proceso}`);
            wasDisconnected = false;
        }

        return result.rows[0]; // devuelve un solo objeto, no array
    } catch (error) {
        // Handle Oracle connection errors gracefully
        if (error.errorNum === 12154) {
            connectionErrorCount++;
            console.warn(
                `⚠️ [${getTimestamp()}] [getProceso] Warning #${connectionErrorCount}: No se pudo conectar a la base de datos Oracle (ORA-12154) para proceso ${c_proceso}`
            );
            wasDisconnected = true; // Marcar que hubo una desconexión
            const dbError = new Error(
                `⚠️ No se pudo conectar a la base de datos Oracle para obtener el proceso ${c_proceso}. Intente nuevamente más tarde.`
            );
            dbError.statusCode = 503; // Service Unavailable
            dbError.isOperational = true;
            throw dbError;
        }
        throw handleOracleError(error, "getProceso");
    } finally {
        if (connection) await connection.close();
    }
}

module.exports = {
    getProcesos,
    getProceso,
};
