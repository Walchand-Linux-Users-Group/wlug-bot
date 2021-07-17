const Discord = require('discord.js');
const client = new Discord.Client();

const disbut = require("discord-buttons");
disbut(client);

module.exports = { client, disbut };
