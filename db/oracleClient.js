const oracledb = require("oracledb");
oracledb.initOracleClient({ libDir: "C:\\Oracle\\instantclient_21_18" });
module.exports = oracledb;
