const sql = require("mysql2/promise");

const config = {
    user: "coba",
    password: "coba",
    host: "127.0.0.1",
    port: 3306,
    database: "zero_library",
};

module.exports = {
    async runQuery(query, params = null) {
        const pool = await sql.createConnection(config);
        return pool.query(query, params);
    },
    async runQueryPool(query, params = null) {
        const pool = sql.createPool(config);
        return pool.query(query, params);
    },
};
