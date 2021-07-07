const Discord = require('discord.js')

function handleHelpVerify(message) {
    const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle("Walchand Linux Users' Group")
        .setThumbnail('https://raw.githubusercontent.com/Walchand-Linux-Users-Group/wlug-bot/main/bot-logo.png')
        .addField('Verification Commands', '‎', true)
        .addFields(
            { name: '!verify wce <username> <password>', value: '└ Verify you are from WCE using Moodle Account' },
            { name: '!verify help', value: '└ View this message' },
            { name: '‎', value: '----------------------------------------------------‎' },
            { name: 'WE DO NOT STORE YOUR CREDENTIALS', value: '' },
            { name: '‎', value: '----------------------------------------------------‎' }
        )
        .addField('Countribute Us', 'https://github.com/Walchand-Linux-Users-Group/wlug-bot', false)

    message.channel.send(exampleEmbed)
}

module.exports = { handleHelpVerify };