const Discord = require('discord.js');

async function handleHelp(message) {
	const helpMsg = new Discord.MessageEmbed()
		.setColor('#ffffff')
		// .setAuthor("Official Discord Bot", "https://cdn.discordapp.com/attachments/858648730558791681/860892256461914122/discord_wlug_2.png")
		.setTitle('**Walchand Linux Users\' Group**')
		.setThumbnail('https://cdn.discordapp.com/attachments/858648730558791681/860892252565536798/discord_wlug.png')
		.addField('Community | Knowledge | Share', '‎', true)
		.setFooter("WCE WLUG © All Rights Reserved. © 2021")
		.addFields(
			{ name: '**__Verification__**', value: 'Verify for different roles in the server.' },
			{
				name: 'Command: **```!help verify```**',
				value: '‎'
			},
			{
				name: '**__Registration__**',
				value: 'Register for ongoing events.'
			},
			{
				name: 'Command: **```!help register```**',
				value: '‎'
			},
			{ name: '**__Public API__**', value: 'Interact with our Official Public API.' },
			{
				name: 'Command: **```!help public-api```**',
				value: '‎'
			},
			{ name: '**__Control API__**', value: 'Control API for club\'s mechanism. \n**Accessible only to Board Members.**' },
			{
				name: 'Command: **```!help control-api```**',
				value: '‎'
			},
		)

	message.channel.send(helpMsg)
}

module.exports = { handleHelp };