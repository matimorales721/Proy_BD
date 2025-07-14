const oracledb = require("oracledb");
const config = require("./config");

async function runQuery() {
  let connection;

  const currentDB = config.FIX; // Cambiá por config.LIQUIDA si querés

  try {
    connection = await oracledb.getConnection(currentDB);

    const result = await connection.execute(
      `SELECT * FROM nmt_pxp_practica_prest_ti WHERE c_proceso = 4832`,
      [],  // parámetros si tuvieras
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
