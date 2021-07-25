const discord = require('discord.js')
const db = require('../helpers/db.js');
const discordClient = require('../discordClient.js');

async function register(message, data, tableName) {

    const registerEmbed = new discord.MessageEmbed()
        .setColor('#ffffff')
        .setAuthor("Walchand Linux Users' Group", "https://cdn.discordapp.com/attachments/858648730558791681/860892256461914122/discord_wlug_2.png")
        .setTitle("You have been Registered Successfully!")
        .setDescription("You can check <#868869240361459793>");

    let entries = await db.query('SELECT * FROM `' + tableName + '` WHERE discordID = \'' + data["discordID"] + '\'');

    if (entries.length === 0) {
        try {
            await db.query('INSERT INTO `' + tableName + '` (discordID,name,email,mobile,college) VALUES(\'' + data["discordID"] + '\',\'' + data["name"] + '\',\'' + data["email"] + '\',\'' + data["mobile"] + '\',\'' + data["college"] + '\')');
            message.author.send(registerEmbed);
            message.author.send("https://tenor.com/view/congrats-minions-gif-4115631")

            const channel = await discordClient.client.channels.fetch('868869240361459793');
            channel.send('!registered linux-diary <@!' + data["discordID"] + '>');
        }
        catch (err) {
            console.log(err);
            message.author.send("Something went Wrong!")
            return;
        }
    }
    else {
        try {
            await db.query('UPDATE `' + tableName + '` SET name=\'' + data["name"] + '\', email=\'' + data["email"] + '\', mobile=\'' + data["mobile"] + '\', college=\'' + data["college"] + '\' WHERE discordID=\'' + data["discordID"] + '\'');
            message.author.send(registerEmbed);
            message.author.send("https://tenor.com/view/congrats-minions-gif-4115631")

            const channel = await discordClient.client.channels.fetch('868869240361459793');
            channel.send('!registered linux-diary <@!' + data["discordID"] + '>');
        }
        catch (err) {
            console.log(err);
            message.author.send("Something went Wrong!")
            return;
        }
    }

}

async function registerLinuxDiary(message) {

    let name = "";
    let email = "";
    let mobile = "";
    let college = "";

    const embed = new discord.MessageEmbed()
        .setColor('#ffffff')
        .setTitle(`Linux Diary 2.0 Registration`)
        .setAuthor("Walchand Linux Users' Group", "https://cdn.discordapp.com/attachments/858648730558791681/860892256461914122/discord_wlug_2.png")
        .setDescription("Now the bot will ask for details. Please send them")

    const nameEmbed = new discord.MessageEmbed()
        .setColor('#ffffff')
        .setAuthor("Walchand Linux Users' Group", "https://cdn.discordapp.com/attachments/858648730558791681/860892256461914122/discord_wlug_2.png")
        .setTitle(":name_badge: Please send your Full Name")

    const emailEmbed = new discord.MessageEmbed()
        .setColor('#ffffff')
        .setAuthor("Walchand Linux Users' Group", "https://cdn.discordapp.com/attachments/858648730558791681/860892256461914122/discord_wlug_2.png")
        .setTitle(":e_mail: Please send your Email ID")

    const mobileEmbed = new discord.MessageEmbed()
        .setColor('#ffffff')
        .setAuthor("Walchand Linux Users' Group", "https://cdn.discordapp.com/attachments/858648730558791681/860892256461914122/discord_wlug_2.png")
        .setTitle(":mobile_phone: Please send your Mobile No.")

    const collegeEmbed = new discord.MessageEmbed()
        .setColor('#ffffff')
        .setAuthor("Walchand Linux Users' Group", "https://cdn.discordapp.com/attachments/858648730558791681/860892256461914122/discord_wlug_2.png")
        .setTitle(":school_satchel: Please send your College Name")

    message.author.send(embed);

    let stage = 0;

    message.author.send(nameEmbed);

    message.author.createDM().then(dmchannel => {
        const collector = new discord.MessageCollector(dmchannel, m => m.author.id === message.author.id, { time: 60000 });
        collector.on('collect', m => {
            switch (stage) {
                case 0:
                    name = m.content;
                    stage += 1;
                    message.author.send(emailEmbed);
                    break;
                case 1:
                    email = m.content;
                    stage += 1;
                    message.author.send(mobileEmbed);
                    break;
                case 2:
                    mobile = m.content;
                    stage += 1;
                    message.author.send(collegeEmbed);
                    break;
                case 3:
                    college = m.content;
                    stage += 1;
                    break;
                default:
                    message.author.send("**Warning - Overflow Detected**")
            }

            if (stage === 4) {
                collector.stop()
                register(message, { "discordID": message.author.id, "name": name, "email": email, "mobile": mobile, "college": college }, "linux-diary");
                return;
            }
        })
    })
}

async function handleRegister(message, event) {

    switch (event) {
        case 'linux-diary':
            registerLinuxDiary(message);
            break;
        default:
            message.reply("Event registration ended!")
    }
}

module.exports = { handleRegister };