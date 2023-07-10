const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "Krish123",
    host: "localhost",
    port: 5432,
    database: "perntut"
});

module.exports = pool;