require('dotenv').config();

const config = require('./config.json');
const discordClient = require('./discordClient.js');
const handler = require('./handler.js');

discordClient.client.on('ready', () => {
	discordClient.client.user.setActivity('WLUG Server', { type: 'WATCHING' });
});

discordClient.client.on('guildMemberAdd', (guildMember) => {
	guildMember.roles.add(guildMember.guild.roles.cache.find(role => role.id === '860572232882978858'));

	const channelId = '866730816368148520'

	const UpdateMembers = guild => {
		const channel = guild.channels.cache.get(channelId)
		channel.setName(`Linux Enthusiast: ${guild.memberCount.toLocaleString()}`)
	}

	const guild = discordClient.client.guilds.cache.get('858633411714482177');
	UpdateMembers(guild);
});

discordClient.client.on('guildMemberRemove', (guildMember) => {

	const channelId = '866730816368148520'

	const UpdateMembers = guild => {
		const channel = guild.channels.cache.get(channelId)
		channel.setName(`Linux Enthusiast: ${guild.memberCount.toLocaleString()}`)
	}

	const guild = discordClient.client.guilds.cache.get('858633411714482177');
	UpdateMembers(guild);
});

discordClient.client.on('message', async function (message) {
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
						message.reply('Please delete the message containing credentials!');
					}
					break;
				case 'help':
					handler.handleHelpVerify(message);
					break;
				default:
					message.reply('Incorrect Authentication Keyword! For help send **!verify help**');
			}
		}

		return;
	}

	const wceVerificationChannel = '861202399351668746';
	const wceRoleID = '858647843526279169';

	const githubVerificationChannel = '865255050678370304';
	const githubRoleID = '865188578869903380';

	switch (command) {
		case 'verified':
			switch (args[0]) {
				case 'wce':
					handler.handleVerifiedWce(message, wceVerificationChannel, wceRoleID, args[2]);
					break;
				case 'github':
					handler.handleVerifiedGithub(message, githubVerificationChannel, githubRoleID);
					break;
			}
			break;
		case 'verify':
			switch (args[0]) {
				case 'github':
					handler.handleVerifyGithub(message, args[1], args[2]);
					break;
				case 'wce':
					handler.handleHelpVerify(message);
					break;
				default:
					message.reply('Incorrect Command');
			}
			break;
		case 'clear':
			handler.handleClear(message, args[0]);
			break;
		case 'myid':
			message.author.send('Your Discord ID is ' + message.author.id);
			break;
		case 'youtube':
			handler.handleYoutube(message);
			break;
		case 'chess':
			handler.handleChess(message);
			break;
		default:
			message.reply('Incorrect Command');
	}
});

discordClient.client.login(process.env.BOT_TOKEN);