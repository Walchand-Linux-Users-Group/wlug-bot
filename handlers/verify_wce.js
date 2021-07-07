let request = require('request');
request = request.defaults({ jar: true });

const JSSoup = require('jssoup').default;

const discordClient = require('../discordClient.js');
const db = require('../helpers/db.js');

async function handleVerifyWce(message, username, password) {

	const loginUrl = 'http://112.133.242.241/moodle/login/index.php';
	const formData = { 'username': username, 'password': password };

	request(loginUrl, async function() {
		request.post({ url: loginUrl, formData: formData, followAllRedirects: true }, async function(err, httpResponse, body) {

			let response;

			if (err) {
				response = { 'status': 'ERROR' };
			}
			else {

				const soup = new JSSoup(body);

				const details = soup.findAll('span', { 'class': 'usertext' })[0].text.split(' ');
				response = {
					'status': 'OK', 'prn': details[3], 'name': details.slice(4, details.length).join(' '),
				};
			}

			if (response.status === 'OK') {
				const entries = await db.query('SELECT * FROM `wce-verified` WHERE discordID = \'' + message.author.id + '\'');

				if (entries.length === 0) {

					await db.query('INSERT INTO `wce-verified` (discordID,prn,name) VALUES(\'' + message.author.id + '\',\'' + response['prn'] + '\',\'' + response['name'] + '\')');

					const channel = await discordClient.client.channels.fetch('861202399351668746');
					channel.send('!verified <@' + message.author.id + '>');

					message.channel.send('✅ **Verification Successful!**');
				}
				else {
					message.reply('**You are already verified!**');
				}
			}
			else {
				message.reply('❌ **Verification Unsuccessful!**');
			}

		});
	});
}

module.exports = { handleVerifyWce };