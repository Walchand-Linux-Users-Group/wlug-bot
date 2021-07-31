require('dotenv').config();

const config = require('./config.json');
const discordClient = require('./discordClient.js');
const discord = require('discord.js');
const handler = require('./handler.js');

discordClient.client.on('ready', () => {
	discordClient.client.user.setActivity('WLUG Server', { type: 'WATCHING' });
});

discordClient.client.on('guildMemberAdd', (guildMember) => {
	guildMember.roles.add(guildMember.guild.roles.cache.find(role => role.id === '860572232882978858'));

	const channelId = '866730816368148520';

	const UpdateMembers = guild => {
		const channel = guild.channels.cache.get(channelId);
		channel.setName(`Linux Enthusiast: ${guild.memberCount.toLocaleString()}`);
	};

	const guild = discordClient.client.guilds.cache.get('858633411714482177');
	UpdateMembers(guild);

	// const embed = new discord.MessageEmbed()
	// 	.setColor('#ffffff')
	// 	.setTitle('Linux Diary 2.0 Registration is Live')
	// 	.setAuthor('Walchand Linux Users\' Group', 'https://cdn.discordapp.com/attachments/858648730558791681/860892256461914122/discord_wlug_2.png')
	// 	.setDescription('Register here: <#868794257383772180>')
	// 	.setImage('https://cdn.discordapp.com/attachments/858648730558791681/869123171960373308/ld-e_-14.png');

	// guildMember.send('Hello and welcome! We are very glad that you have decided to join **Walchand Linux Users\' Group Discord Server** !');

	// guildMember.send(embed);
});

discordClient.client.on('guildMemberRemove', (guildMember) => {

	const channelId = '866730816368148520';

	const UpdateMembers = guild => {
		const channel = guild.channels.cache.get(channelId);
		channel.setName(`Linux Enthusiast: ${guild.memberCount.toLocaleString()}`);
	};

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
			try {
				let count = parseInt(args[0]);

				if (isNaN(count)) {
					message.reply("Argument should be a valid number!");
					return;
				}

				handler.handleClear(message, args[0]);
			} catch (err) {
				message.reply("Invalid Command!");
			}
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
		case 'register':
			switch (message.channel.id) {
				case '868794257383772180':
					handler.handleRegister(message, 'linux-diary');
					break;
				case '869672366266024007':
					handler.handleRegister(message, 'member-board');
				default:
					message.reply('Invalid Channel!');
			}
			break;
		case 'registered':
			handler.handleRegistered(message, args[0]);
			break;
		case 'help':
			handler.handleHelp(message);
			break;
		default:
			message.reply('Incorrect Command');
	}
});

discordClient.client.login(process.env.BOT_TOKEN);