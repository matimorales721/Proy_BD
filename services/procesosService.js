const oracledb = require("../db/oracleClient");
const { handleOracleError } = require("../middlewares/oracleErrorHandler");

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
        return result.rows;
    } catch (error) {
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
        return result.rows[0]; // devuelve un solo objeto, no array
    } catch (error) {
        throw handleOracleError(error, "getProceso");
    } finally {
        if (connection) await connection.close();
    }
}

module.exports = {
    getProcesos,
    getProceso,
};
