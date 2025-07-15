const oracledb = require("oracledb");
oracledb.initOracleClient({ libDir: "C:\\Oracle\\instantclient_21_18" });
const config = require("./config");

async function runQuery() {
    let connection;

    const currentDB = config.LIQUIDA; // Cambiá por config.LIQUIDA si querés

    try {
        connection = await oracledb.getConnection(currentDB);

        const result = await connection.execute(
            `SELECT count(1) FROM nmt_pxp_practica_prest_ti WHERE c_proceso = 4832`,
            [], // parámetros si tuvieras
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        console.log("Filas obtenidas:", result.rows);
    } catch (err) {
        console.error("Error al ejecutar la consulta:", err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Error al cerrar la conexión:", err);
            }
        }
    }
}

runQuery();
