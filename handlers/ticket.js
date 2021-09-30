const { MessageEmbed } = require('discord.js');
const discord = require('discord.js');
const discordClient = require('../discordClient.js');

//console.log("Inside");
async function handleticket(message, discord){
    console.log("Inside1")
    // creating a special temp channel
    const channel = await message.guild.channels.create(`doubt: ${message.author.tag}`);
    
    //id of the category
    channel.setParent("860765109362360341");

    //setting up the perms for other members & that particular member reps.
    channel.updateOverwrite(message.guild.id, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false,
    });
    channel.updateOverwrite(message.author,{
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true,
    });

    //msg by bot
   // const reactionMessage = await channel.reply("Ask your personal doubts here.\n Teachers will try to provide solutions as soon as possible");
    const reactionEmbed = new discord.MessageEmbed()
    .setColor('#ffc891')
    .setTitle('Ask your personal doubts here.')
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic : true})) //dynamic = true to pass and display the gif in the profile.
    .setThumbnail('https://i.imgur.com/Eey6gzU.png')
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'For Academic related doubts', value: `Tag <@&862176443910848542>`, inline: true },
        { name: 'For Exam \nrelated doubts', value: 'Tag <@&862176620827770920>', inline: true },
        { name: 'For Office \nrelated doubts', value: 'Tag <@&862176825361563659>', inline: true }
    )
    .setFooter('Study Buddy here to help!', 'https://i.imgur.com/Eey6gzU.png');

    channel.send(reactionEmbed);
    
    const reactionMessage = await channel.send(`\` Concerned person will get back to you shortly! \` `);
    
    try {
        await reactionMessage.react("🔒");
        await reactionMessage.react("⛔");
    } catch (err) {
        channel.send("Error sending emojis!");
        throw err;
    }

    const collector = reactionMessage.createReactionCollector(
        (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"),
        { dispose: true }
    );
  
    collector.on("collect", (reaction, user) => {
        switch (reaction.emoji.name) {
          case "🔒":
            channel.updateOverwrite(message.author, { SEND_MESSAGES: false });
            break;
          case "⛔":
            channel.send(`<@${message.author.id}>, your personal channel: ${channel} will be deleted in 5 seconds...`);
            setTimeout(() => channel.delete(), 5000);
            break;
        }
    });
  
    message.channel.send(`We will be right with you <@${message.author.id}>! ${channel}`).then((msg) => {
        setTimeout(() => msg.delete(), 10000);
        setTimeout(() => message.delete(), 3000);
    }).catch((err) => {
        throw err;
    });
    
}

module.exports = { handleticket };