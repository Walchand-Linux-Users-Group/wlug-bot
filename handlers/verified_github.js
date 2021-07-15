async function handleVerifiedGithub(message, githubVerificationChannel, githubRoleID, githubID) {
	if (message.channel.id != githubVerificationChannel) {
		message.reply('Not Allowed Here!');
		return;
	}

	const githubRole = message.guild.roles.cache.get(githubRoleID);
	const wceUser = message.mentions.members.first();
	wceUser.roles.add(githubRole);

	message.react('✅');
}

module.exports = { handleVerifiedGithub };