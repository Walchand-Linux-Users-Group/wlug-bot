async function handleVerifiedWce(message, wceVerificationChannel, wceRoleID, batchRole) {
	if (message.channel.id != wceVerificationChannel) {
		message.reply('Not Allowed Here!');
		return;
	}

	const wceRole = message.guild.roles.cache.get(wceRoleID);
	const wceUser = message.mentions.members.first();
	wceUser.roles.add(wceRole);

	if (!message.guild.roles.cache.find(role => role.name == batchRole)) {

		await message.guild.roles.create({
			data: {
				name: batchRole,
				color: "#fffff",
				permissions: 0
			}
		});
	}

	const batchRoleObj = message.guild.roles.cache.find(role => role.name == batchRole);
	wceUser.roles.add(batchRoleObj);

	message.react('✅');
}

module.exports = { handleVerifiedWce };