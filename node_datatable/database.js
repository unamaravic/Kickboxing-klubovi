const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'kickboxing-klubovi',
    password: 'bazepodataka',
    port: 5432,
});

pool.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('okej');
	}
});

module.exports = pool;