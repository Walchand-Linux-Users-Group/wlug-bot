let request = require('request');
request = request.defaults({ jar: true });
const db = require('../helpers/db.js');

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

async function handleSetWriters(message) {

	/*
        Check if message.author has Editor Role
    */

	const old_writers = await db.query('SELECT * FROM `writers`');

	const writerLogChannel = await discordClient.client.channels.fetch('866610534638813214');

	old_writers.array.forEach(writer => {
		writerLogChannel.send('!remove writer <@' + writer + '>');
	});

	await db.query('DELETE FROM `writers`');


}

async function handleSet(message, who) {

	switch (who) {
	case 'writers':
		handleSetWriters(message);
		break;
	case 'presentators':
		handleSetPresentators(message);
		break;
	default:
		message.reply('Incorrect set keyword!');
	}

}

module.exports = { handleSet };