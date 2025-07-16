function handleOracleError(error, context = "") {
    if (!error) return;

    const prefix = context ? `[${context}] ` : "";

    switch (error.errorNum) {
        case 12154:
            console.error(
                `❌ ${prefix}Error ORA-12154: No se pudo resolver el identificador de conexión. Verifique que esté conectado al servidor remoto.`
            );
            break;
        case 12541:
            console.error(
                `❌ ${prefix}Error ORA-12541: No se pudo establecer conexión con Oracle. ¿Está caído el listener?`
            );
            break;
        case 1017:
            console.error(`❌ ${prefix}Error ORA-01017: Usuario o contraseña incorrectos.`);
            break;
        default:
            console.error(`❌ ${prefix}Error Oracle desconocido:`, error);
    }
}
module.exports = { handleOracleError };
