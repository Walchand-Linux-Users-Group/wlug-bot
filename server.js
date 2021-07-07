require('dotenv').config();

const config = require('./config.json');
const discordClient = require('./discordClient.js');
const handler = require('./handler.js');
const { handleVerifiedWce } = require('./handlers/verified_wce');

discordClient.client.on('ready', () => {
	discordClient.client.user.setActivity('WLUG Server', { type: 'WATCHING' });
});

discordClient.client.on('message', function (message) {
	if (!message.content.startsWith(config.prefix)) return;

	const commandBody = message.content.slice(config.prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();

	if (message.guild === null) {

		if (command != 'verify') {
			message.reply('Incorrect Command! For help send **!verify help**');
		}
		else {
			switch (args[0]) {
				case 'wce':
					if (args.length != 3) {
						message.reply('Incorrect Command! For help send **!verify help**');
					}
					else {
						handler.handleVerifyWce(message, args[1], args[2]);
					}
					break;
				case 'help':
					handler.handleVerifyWce(message, args[1], args[2]);
					break;
				default:
					message.reply('Incorrect Authentication Keyword! For help send **!verify help**');
			}
		}
		return;
	}

	const wceVerificationChannel = '861202399351668746';
	const wceRoleID = '858647843526279169';

	switch (command) {
		case 'verified':
			handleVerifiedWce(message, wceVerificationChannel, wceRoleID);
			break;
		default:
			message.reply('Incorrect Command');
	}
});

discordClient.client.login(process.env.BOT_TOKEN);
