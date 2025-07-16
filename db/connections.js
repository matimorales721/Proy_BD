const oracledb = require("oracledb");
const config = require("../db/config");

async function initOraclePool() {
    const dbMode = process.env.DB_MODE || "LIQUIDA";
    const dbConfig = config[dbMode];

    if (!dbConfig) {
        throw new Error(`❌ Configuración inválida para DB_MODE: ${dbMode}`);
    }

    try {
        await oracledb.createPool({
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString,
        });
        console.log("🔌 Pool Oracle creado correctamente");
    } catch (err) {
        console.error("❌ Error al crear el pool Oracle:", err);
        throw err;
    }
}

module.exports = { initOraclePool };
