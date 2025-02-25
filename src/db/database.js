const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL
})

pool.connect((err) => {
    if (err) {
        console.log(err);
        throw err
    }
    console.log('Connect to postgreSQL successfully!');
})

module.exports = pool