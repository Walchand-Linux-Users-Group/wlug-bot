async function registeredLinuxdiary(message) {
	if (message.channel.id != '868869240361459793') {
		message.reply('Command Not Allowed!');
		return;
	}

	const linuxDiaryRole = message.guild.roles.cache.get('868793676673974272');
	const participant = message.mentions.members.first();
	participant.roles.add(linuxDiaryRole);

	message.react('✅');
}

async function handleRegistered(message, type) {

	switch (type) {
	case 'linux-diary':
		registeredLinuxdiary(message);
		break;
	default:
		message.reply('Invalid Command!');
	}
}

module.exports = { handleRegistered };