const discord = require('discord.js');
const db = require('../helpers/db.js');
const discordClient = require('../discordClient.js');

async function register(user, data, tableName) {

	const registerEmbed = new discord.MessageEmbed()
		.setColor('#ffffff')
		.setAuthor('Walchand Linux Users\' Group', 'https://cdn.discordapp.com/attachments/858648730558791681/860892256461914122/discord_wlug_2.png')
		.setTitle('You have been Registered Successfully!')
		.setDescription('You can check <#868869240361459793>');

	const entries = await db.pool.query('SELECT * FROM `' + tableName + '` WHERE discordID = \'' + data['discordID'] + '\'');

	if (entries.length === 0) {
		try {
			await db.pool.query('INSERT INTO `' + tableName + '` (discordID,name,email,mobile,college) VALUES(\'' + data['discordID'] + '\',\'' + data['name'] + '\',\'' + data['email'] + '\',\'' + data['mobile'] + '\',\'' + data['college'] + '\')');
			user.send(registerEmbed);
			user.send('https://tenor.com/view/congrats-minions-gif-4115631');

			const channel = await discordClient.client.channels.fetch('868869240361459793');
			channel.send('!registered linux-diary <@!' + data['discordID'] + '>');
		}
		catch (err) {
			console.log(err);
			user.send('Something went Wrong!');
			return;
		}
	}
	else {
		try {
			await db.pool.query('UPDATE `' + tableName + '` SET name=\'' + data['name'] + '\', email=\'' + data['email'] + '\', mobile=\'' + data['mobile'] + '\', college=\'' + data['college'] + '\' WHERE discordID=\'' + data['discordID'] + '\'');
			user.send(registerEmbed);
			user.send('https://tenor.com/view/congrats-minions-gif-4115631');

			const channel = await discordClient.client.channels.fetch('868869240361459793');
			channel.send('!registered linux-diary <@!' + data['discordID'] + '>');
		}
		catch (err) {
			console.log(err);
			user.send('Something went Wrong!');
			return;
		}
	}

}

async function registerMember(user, data, tableName) {

	const registerEmbed = new discord.MessageEmbed()
		.setColor('#ffffff')
		.setAuthor('Walchand Linux Users\' Group', 'https://cdn.discordapp.com/attachments/858648730558791681/860892256461914122/discord_wlug_2.png')
		.setTitle('You have been Registered Successfully!')
		.setDescription('You can check <#869672694117974058>');

	const entries = await db.pool.query('SELECT * FROM `' + tableName + '` WHERE discordID = \'' + data['discordID'] + '\'');

	if (entries.length === 0) {
		try {
			await db.pool.query('INSERT INTO `' + tableName + '` (discordID,name,email,mobile,branch,resume_url) VALUES(\'' + data['discordID'] + '\',\'' + data['name'] + '\',\'' + data['email'] + '\',\'' + data['mobile'] + '\',\'' + data['branch'] + '\',\'' + data['resume_url'] + '\')');
			user.send(registerEmbed);
			user.send('https://tenor.com/view/congrats-minions-gif-4115631');

			const channel = await discordClient.client.channels.fetch('869672694117974058');
			channel.send('!registered member-board <@!' + data['discordID'] + '>');
		}
		catch (err) {
			console.log(err);
			user.send('Something went Wrong!');
			return;
		}
	}
	else {
		try {
			await db.pool.query('UPDATE `' + tableName + '` SET name=\'' + data['name'] + '\', email=\'' + data['email'] + '\', mobile=\'' + data['mobile'] + '\', branch=\'' + data['branch'] + '\', resume_url=\'' + data['resume_url'] + '\' WHERE discordID=\'' + data['discordID'] + '\'');
			user.send(registerEmbed);
			user.send('https://tenor.com/view/congrats-minions-gif-4115631');

			const channel = await discordClient.client.channels.fetch('869672694117974058');
			channel.send('!registered member-board <@!' + data['discordID'] + '>');
		}
		catch (err) {
			console.log(err);
			user.send('Something went Wrong!');
			return;
		}
	}

}

async function registerMemberBoard(user) {

	let name = '';
	let email = '';
	let mobile = '';
	let branch = '';
	let resume_url = '';

	const embed = new discord.MessageEmbed()
		.setColor('#ffffff')
		.setTitle('Member Board Selection - Registration')
		.setAuthor('Walchand Linux Users\' Group', 'https://cdn.discordapp.com/attachments/858648730558791681/860892256461914122/discord_wlug_2.png')
		.setDescription('Now the bot will ask for details. Please send them');

	const nameEmbed = new discord.MessageEmbed()
		.setColor('#ffffff')
		.setAuthor('Walchand Linux Users\' Group', 'https://cdn.discordapp.com/attachments/858648730558791681/860892256461914122/discord_wlug_2.png')
		.setTitle(':name_badge: Please send your Full Name');

	const emailEmbed = new discord.MessageEmbed()
		.setColor('#ffffff')
		.setAuthor('Walchand Linux Users\' Group', 'https://cdn.discordapp.com/attachments/858648730558791681/860892256461914122/discord_wlug_2.png')
		.setTitle(':e_mail: Please send your Email ID');

	const mobileEmbed = new discord.MessageEmbed()
		.setColor('#ffffff')
		.setAuthor('Walchand Linux Users\' Group', 'https://cdn.discordapp.com/attachments/858648730558791681/860892256461914122/discord_wlug_2.png')
		.setTitle(':mobile_phone: Please send your Mobile No.');

	const branchEmbed = new discord.MessageEmbed()
		.setColor('#ffffff')
		.setAuthor('Walchand Linux Users\' Group', 'https://cdn.discordapp.com/attachments/858648730558791681/860892256461914122/discord_wlug_2.png')
		.setTitle(':school_satchel: Please send your Branch');

	const resumeEmbed = new discord.MessageEmbed()
		.setColor('#ffffff')
		.setAuthor('Walchand Linux Users\' Group', 'https://cdn.discordapp.com/attachments/858648730558791681/860892256461914122/discord_wlug_2.png')
		.setTitle(':page_facing_up: Please upload your Resume');

	user.send(embed);

	let stage = 0;

	user.send(nameEmbed);

	user.createDM().then(dmchannel => {
		const collector = new discord.MessageCollector(dmchannel, m => m.author.id === user.id, { time: 120000 });
		collector.on('collect', m => {
			switch (stage) {
				case 0:
					name = m.content;
					stage += 1;
					user.send(emailEmbed);
					break;
				case 1:
					email = m.content;
					stage += 1;
					user.send(mobileEmbed);
					break;
				case 2:
					mobile = m.content;
					stage += 1;
					user.send(branchEmbed);
					break;
				case 3:
					branch = m.content;
					stage += 1;
					user.send(resumeEmbed);
					break;
				case 4:
					let Attachments = (m.attachments).array()

					if (Attachments.length === 0) {
						collector.stop();
						m.reply('Please Upload the Resume!')
						return
					}

					resume_url = Attachments[0].url;
					stage += 1;
					break;
				default:
					user.send('**Warning - Overflow Detected**');
			}

			if (stage === 5) {
				collector.stop();
				registerMember(user, { 'discordID': user.id, 'name': name, 'email': email, 'mobile': mobile, 'branch': branch, 'resume_url': resume_url }, 'member-board');
				return;
			}
		});

		collector.on('end', message => {
			if (stage != 5) {
				user.send('Time Up! If Registration is incomplete please register once again here: <#869672366266024007>');
			}
		});

	});
}

async function registerLinuxDiary(user) {

	let name = '';
	let email = '';
	let mobile = '';
	let college = '';

	const embed = new discord.MessageEmbed()
		.setColor('#ffffff')
		.setTitle('Linux Diary 2.0 Registration')
		.setAuthor('Walchand Linux Users\' Group', 'https://cdn.discordapp.com/attachments/858648730558791681/860892256461914122/discord_wlug_2.png')
		.setDescription('Now the bot will ask for details. Please send them');

	const nameEmbed = new discord.MessageEmbed()
		.setColor('#ffffff')
		.setAuthor('Walchand Linux Users\' Group', 'https://cdn.discordapp.com/attachments/858648730558791681/860892256461914122/discord_wlug_2.png')
		.setTitle(':name_badge: Please send your Full Name');

	const emailEmbed = new discord.MessageEmbed()
		.setColor('#ffffff')
		.setAuthor('Walchand Linux Users\' Group', 'https://cdn.discordapp.com/attachments/858648730558791681/860892256461914122/discord_wlug_2.png')
		.setTitle(':e_mail: Please send your Email ID');

	const mobileEmbed = new discord.MessageEmbed()
		.setColor('#ffffff')
		.setAuthor('Walchand Linux Users\' Group', 'https://cdn.discordapp.com/attachments/858648730558791681/860892256461914122/discord_wlug_2.png')
		.setTitle(':mobile_phone: Please send your Mobile No.');

	const collegeEmbed = new discord.MessageEmbed()
		.setColor('#ffffff')
		.setAuthor('Walchand Linux Users\' Group', 'https://cdn.discordapp.com/attachments/858648730558791681/860892256461914122/discord_wlug_2.png')
		.setTitle(':school_satchel: Please send your College Name');

	user.send(embed);

	let stage = 0;

	user.send(nameEmbed);

	user.createDM().then(dmchannel => {
		const collector = new discord.MessageCollector(dmchannel, m => m.author.id === user.id, { time: 120000 });
		collector.on('collect', m => {
			switch (stage) {
				case 0:
					name = m.content.replace(/["']/g, "");
					stage += 1;
					user.send(emailEmbed);
					break;
				case 1:
					email = m.content.replace(/["']/g, "");
					stage += 1;
					user.send(mobileEmbed);
					break;
				case 2:
					mobile = m.content.replace(/["']/g, "");
					stage += 1;
					user.send(collegeEmbed);
					break;
				case 3:
					college = m.content.replace(/["']/g, "");
					stage += 1;
					break;
				default:
					user.send('**Warning - Overflow Detected**');
			}

			if (stage === 4) {
				collector.stop();
				register(user, { 'discordID': user.id, 'name': name, 'email': email, 'mobile': mobile, 'college': college }, 'linux-diary');
				return;
			}
		});

		collector.on('end', message => {
			if (stage != 4) {
				user.send('Time Up! If Registration is incomplete please register once again here: <#868794257383772180>');
			}
		});

	});
}

async function handleRegister(message, event) {

	switch (event) {
		case 'linux-diary':
			message.channel.send('<@!' + message.author.id + '> Please check your DMs!').catch(err => console.log(err));
			registerLinuxDiary(message.author);

			break;
		case 'member-board':
			message.channel.send('<@!' + message.author.id + '> Please check your DMs!').catch(err => console.log(err));
			registerMemberBoard(message.author);

			break;
		default:
			message.reply('Event registration ended!');
	}
}

module.exports = { handleRegister };
