const oracledb = require("../db/oracleClient");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { errorHandler } = require("../middlewares/errorHandler");
const pxpRoutes = require("../routes/procesosRoutes");
const setupLogging = require("../logger");

const app = express();

async function getProcesos() {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `SELECT * FROM NMT_PXP_PROCESO_CALCULO WHERE c_proceso IN (4821, 4822, 4832, 4836)`,
            [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        return result.rows;
    } catch (error) {
        console.error("Error en getProcesos:", error);
        throw error;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Error al cerrar conexión:", err);
            }
        }
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
        console.error("Error en getProceso:", error);
        throw error;
    } finally {
        if (connection) await connection.close();
    }
}

module.exports = {
    getProcesos,
    getProceso,
};
