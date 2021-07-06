const axios = require('axios');
const discordClient = require('../discordClient.js');
const db = require('../helpers/db.js');

async function handleVerifyWce(message, username, password) {

    message.reply("**Your Credentials are not stored.**")
    message.reply("**You can view our code here: https://github.com/Walchand-Linux-Users-Group/wlug-bot**")

	let response = await axios.post('https://wcemoodle-api.herokuapp.com:5000/verify/wce', { 'username': username, 'password': password }).catch(err => console.log(err));

	response = response.data;

	if (response.status === 'OK') {
		const entries = await db.query('SELECT * FROM `wce-verified` WHERE discordID = \'' + message.author.id + '\'');

		if (entries.length === 0) {

			await db.query('INSERT INTO `wce-verified` (discordID,prn,name) VALUES(\'' + message.author.id + '\',\'' + response['prn'] + '\',\'' + response['name'] + '\')');

			const channel = await discordClient.client.channels.fetch('861202399351668746');
			channel.send('!verified <@' + message.author.id + '>');

			message.channel.send('✅ **Verification Successful!**');
		}
		else {
			message.reply('You are already verified!');
		}
	}
	else {
		message.reply('❌ **Verification Unsuccessful!**');
	}
}

module.exports = { handleVerifyWce };