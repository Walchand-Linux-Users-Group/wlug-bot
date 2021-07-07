const mysql = require('mysql');
const util = require('util');

// Add variables in config
const connection = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
});

const q = util.promisify(connection.query).bind(connection);

async function query(sql) {
	try {
		const result = await q(sql);

		return result;
	}
	catch (err) {
		console.log(err);
		return null;
	}
}

module.exports = {
	query,
};