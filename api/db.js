const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "kickboxing-klubovi",
    password: "bazepodataka",
    port: 5432
});

module.exports = pool;