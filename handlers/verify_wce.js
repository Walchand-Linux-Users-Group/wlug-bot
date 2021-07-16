let request = require('request');
request = request.defaults({ jar: true });

const JSSoup = require('jssoup').default;

const discordClient = require('../discordClient.js');
const db = require('../helpers/db.js');

async function handleVerifyWce(message, username, password) {

	let entries = await db.query('SELECT * FROM `wce-verified` WHERE discordID = \'' + message.author.id + '\'');

	if (entries.length != 0) {
		message.reply('**You are already verified!**');
		return;
	}

	entries = await db.query('SELECT * FROM `wce-verified` WHERE prn = \'' + username + '\'');

	if (entries.length != 0) {
		message.reply('**Dublicate Accounts Not allowed!**');
		return;
	}

	const loginUrl = 'http://112.133.242.241/moodle/login/index.php';
	const formData = { 'username': username, 'password': password };

	request(loginUrl, async function() {
		request.post({ url: loginUrl, formData: formData, followAllRedirects: true }, async function(err, httpResponse, body) {

			let response;

			if (err) {
				response = { 'status': 'ERROR' };
			}
			else {

				try {
					const soup = new JSSoup(body);

					const details = soup.findAll('span', { 'class': 'usertext' })[0].text;

					const reName = /.\d\d\d\d[B,b,m,M][T,t][E,e]..\d\d\d\d\d./;
					const rePrn = /\d\d\d\d[B,b,m,M][T,t][E,e]..\d\d\d\d\d/;

					const name = details.split(reName)[1];
					const prn = details.match(rePrn);

					response = {
						'status': 'OK', 'prn': prn, 'name': name,
					};
				}
				catch (err) {
					response = { 'status': 'ERROR' };
				}
			}

			if (response.status === 'OK') {

				let passout = parseInt(response['prn'].slice(0, 4)) + 4;

				if (parseInt(response['prn'].slice(9)) >= 200) {
					// User is DSY
					passout = passout - 1;
				}

				if (isNaN(passout)) {
					message.author.send('Some error Occured! Please inform to Moderator!');
					return;
				}

				await db.query('INSERT INTO `wce-verified` (discordID,prn,name) VALUES(\'' + message.author.id + '\',\'' + response['prn'] + '\',\'' + response['name'] + '\')');

				const channel = await discordClient.client.channels.fetch('861202399351668746');

				channel.send('!verified wce <@' + message.author.id + '> Batch-' + passout);

				message.channel.send('✅ **Verification Successful!**');

			}
			else {
				message.reply('❌ **Verification Unsuccessful!**');
			}

		});
	});
}

module.exports = { handleVerifyWce };