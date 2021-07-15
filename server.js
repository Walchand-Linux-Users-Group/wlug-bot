require('dotenv').config();

const config = require('./config.json');
const discordClient = require('./discordClient.js');
const handler = require('./handler.js');
const path = require('path');

const express = require('express')
const app = express()
app.set('views', './views');
app.use('/static', express.static(path.resolve('static')));
app.set('view engine', 'ejs');
const port = 80

discordClient.client.on('ready', () => {
	discordClient.client.user.setActivity('WLUG Server', { type: 'WATCHING' });
});

discordClient.client.on('guildMemberAdd', (guildMember) => {
	guildMember.roles.add(guildMember.guild.roles.cache.find(role => role.id === "860572232882978858"));
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
						message.reply("Please delete the message containing credentials!")
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

	switch (command) {
		case 'verified':
			handler.handleVerifiedWce(message, wceVerificationChannel, wceRoleID, args[1]);
			break;
		case 'clear':
			handler.handleClear(message, args[0]);
			break;
		default:
			message.reply('Incorrect Command');
	}
});

discordClient.client.login(process.env.BOT_TOKEN);

// Web Application


app.get('/', async (req, res) => {
	res.render('index', { page: 'Home', menuId: 'home' });
});

app.get('/verify/github',async (req,res)=>{
	res.render('github');
});

app.listen(process.env.PORT, () => console.log(`App listening on port ${port}!`))