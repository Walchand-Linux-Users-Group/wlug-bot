function handleVerifiedWce(message, wceVerificationChannel, wceRoleID) {
	if(message.channel.id != wceVerificationChannel) {
		message.reply('Not Allowed Here!');
		return;
	}

	const testedRole = message.guild.roles.cache.get(wceRoleID);
	const testedUser = message.mentions.members.first();
	testedUser.roles.add(testedRole);
	message.react('✅');
}

module.exports = { handleVerifiedWce };