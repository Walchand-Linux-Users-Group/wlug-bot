const { MessageEmbed } = require('discord.js');
const { DiscordTogether } = require('discord-together');
const discordClient = require('../discordClient.js');

discordClient.client.discordTogether = new DiscordTogether(discordClient.client);

async function handleChess(message) {
    if (message.member.voice.channel) {
        discordClient.client.discordTogether.createTogetherCode(message.member.voice.channelID, 'chess').then(async invite => {
            let button = new discordClient.disbut.MessageButton()
                .setStyle('url')
                .setURL(`${invite.code}`)
                .setLabel('Chess');

            let embedMessage = new MessageEmbed()
                .setColor("#ffffff")
                .setTitle('Let\'s play Chess!')
                .setDescription('Connect in **' + message.member.voice.channel.name + '** and play Chess!');

            return message.channel.send(embedMessage, button);
        });
    }
    else {
        message.channel.send(
            new MessageEmbed()
                .setColor("#ffffff")
                .setTitle('You Must Be In A Voice Channel')
                .setDescription('<@!' + message.author.id + '> please join a voice channel :smiley:')
        )
    }
}

module.exports = { handleChess };