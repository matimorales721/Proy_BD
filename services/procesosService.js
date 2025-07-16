const { oracledb } = require("../db/oracleClient");
const { handleOracleError } = require("../middlewares/oracleErrorHandler");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

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
