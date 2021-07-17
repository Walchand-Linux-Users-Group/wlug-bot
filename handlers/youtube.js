const { MessageEmbed } = require('discord.js');
const { DiscordTogether } = require('discord-together');
const discordClient = require('../discordClient.js');

discordClient.client.discordTogether = new DiscordTogether(discordClient.client);

const disbut = require("discord-buttons");
disbut(discordClient.client);

async function handleYoutube(message) {
    if (message.member.voice.channel) {
        discordClient.client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
            let button = new disbut.MessageButton()
                .setStyle('url')
                .setURL(`${invite.code}`)
                .setLabel('YouTube Together');

            let embedMessage = new MessageEmbed()
                .setColor("#ffffff")
                .setTitle('Let\'s browse YouTube!')
                .setDescription('Connect in **' + message.member.voice.channel.name + '** and browse YouTube Together!');

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

module.exports = { handleYoutube };