const discordClient = require('../discordClient.js');
const db = require('../helpers/db.js');

async function handleVerifyGithub(message, discordID, githubID) {

	let user;

	try {
		user = message.mentions.members.first();

		if (user === undefined) {
			message.react('❌');
			return;
		}
	}
	catch (err) {
		message.react('❌');
		return;
	}

	let entries = await db.query('SELECT * FROM `github-verified` WHERE discordID = \'' + discordID + '\'');

	if (entries.length != 0) {
		user.send('**You are already verified!**');
		return;
	}

	entries = await db.query('SELECT * FROM `github-verified` WHERE githubID = \'' + githubID + '\'');

	if (entries.length != 0) {
		user.send('**Dublicate Accounts Not allowed!**');
		return;
	}

	await db.query('INSERT INTO `github-verified` (discordID,githubID) VALUES(\'' + discordID + '\',\'' + githubID + '\')');

	const channel = await discordClient.client.channels.fetch('865255050678370304');

	channel.send('!verified github <@!' + discordID + '>');
}

module.exports = { handleVerifyGithub };