
// Can later write into environment variables...
const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "Krish123",
    host: "localhost",
    port: 5432,
    database: "cricbuzz_soc"
});

module.exports = pool;