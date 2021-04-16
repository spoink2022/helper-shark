const {Client} = require('discord.js');

const auth = require('../private/auth.json');

const {handleJoin} = require('./handle_join.js');

const client = new Client();

client.login(auth.discordToken);
client.on('ready', onReady);
client.on('message', onMessage);
client.on('guildMemberAdd', onGuildMemberAdd);

async function onReady() {
    client.user.setPresence({activity: {type: 'WATCHING', name: 'over my home server'}});
    console.log(`Logged in as ${client.user.tag}!`);
}

async function onMessage(msg) {
    handleJoin(msg.member);
}

async function onGuildMemberAdd(guildMember) {
    handleJoin(guildMember);
}

module.exports = client;