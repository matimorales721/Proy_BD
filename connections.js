require('dotenv').config();
const oracledb = require('oracledb');

function getConfig() {
  const mode = process.env.DB_MODE;
  const user = process.env[`${mode}_USER`];
  const password = process.env[`${mode}_PASSWORD`];
  const connectString = process.env[`${mode}_CONNECT_STRING`];

  return { user, password, connectString };
}

async function getConnection() {
  const config = getConfig();
  return await oracledb.getConnection(config);
}

module.exports = { getConnection };
