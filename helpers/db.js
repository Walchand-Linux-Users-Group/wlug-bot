const mysql = require('mysql');
const util = require('util');

// Add variables in config
const connection = mysql.createConnection({
	host: 'wcewlug.org',
	user: 'wcewlugo_discord',
	password: '@dmin@wlug1',
	database: 'wcewlugo_discord',
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