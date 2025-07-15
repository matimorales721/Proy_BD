const oracledb = require("oracledb");

async function initOraclePool() {
    try {
        await oracledb.createPool({
            user: process.env.LIQUIDA_USER, // me parece que aca tendria que venir un valor generico en base a si es fix o liquida
            password: process.env.LIQUIDA_PASSWORD,
            connectString: process.env.LIQUIDA_CONNECT_STRING,
        });
        console.log("🔌 Pool Oracle creado correctamente");
    } catch (err) {
        console.error("❌ Error al crear el pool Oracle:", err);
        throw err;
    }
}

module.exports = { initOraclePool };
