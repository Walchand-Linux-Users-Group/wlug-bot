const Discord = require('discord.js');

function handleHelpVerify(message) {
	const exampleEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Walchand Linux Users\' Group')
		.setThumbnail('https://raw.githubusercontent.com/Walchand-Linux-Users-Group/wlug-bot/main/bot-logo.png')
		.addField('Verification Commands', '‎', true)
		.addFields(
			{ name: '!verify wce <username> <password>', value: '└ Verify you are from WCE via Moodle Account\n‎' },
			{ name: '!verify help', value: '└ View this message\n‎' },
			{ name: '\n +--------------------------------------------+‎\n    WE DO NOT STORE CREDENTIALS  ', value: ' **+--------------------------------------------+**\n‎' },
		)
		.addField('Contribute us here:', 'https://github.com/Walchand-Linux-Users-Group/wlug-bot', false);

	message.channel.send(exampleEmbed);
}

module.exports = { handleHelpVerify };