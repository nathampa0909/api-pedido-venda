const oracledb = require("oracledb");
oracledb.initOracleClient({ libDir: "C:\\instantclient_12_1" });
oracledb.autoCommit = true;

module.exports = {
    development: {
        client: "cliente",
        connection: {
            user: "user",
            password: "senha",
            connectString: "connectionString"
        }
    }
};