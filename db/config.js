require("dotenv").config();

module.exports = {
    FIX: {
        user: process.env.FIX_USER,
        password: process.env.FIX_PASSWORD,
        connectString: `${process.env.FIX_HOST}:${process.env.FIX_PORT}/${process.env.FIX_SERVICE_NAME}`,
    },
    LIQUIDA: {
        user: process.env.LIQUIDA_USER,
        password: process.env.LIQUIDA_PASSWORD,
        connectString: `${process.env.LIQUIDA_HOST}:${process.env.LIQUIDA_PORT}/${process.env.LIQUIDA_SERVICE_NAME}`,
    },
};
