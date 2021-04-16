const { MessageEmbed } = require('discord.js');

const config = require('../private/config.json');

function randint(min, max) {
    return Math.floor(min + Math.random()*(max-min+1));
}

module.exports.handleMessage = async function(msg) {
    if (msg.content.startsWith(config.prefix) && config.mods.includes(msg.author.id)) {
        const content = msg.content.substring(config.prefix.length).split(' ');
        const cmd = content[0];
        const args = content.slice(1);

        if (cmd === 'sendmessage1') {
            sendMessageOne(msg);
        } else if (cmd === 'editmessage1') {
            editMessageOne(msg, args);
        } else if (cmd === 'getwinner1') {
            getWinnerOne(msg, args);
        }
    }
}

async function sendMessageOne(msg) {
    msg.delete();
    
    let options = {
        color: '#00ff00',
        title: 'React to enter 30:lollipop: giveaway!',
        description: '(React with :fish:)\
        \n\n**Reason:** Big Tuna is officially verified!\
        \n**Reward:** 30:lollipop:\
        \n**Ends:** April 16th, 8:00pm EST'
    };

    let embed = new MessageEmbed(options);

    msg.channel.send(embed).then(sentEmbed => {
        sentEmbed.react('🐟');
    });
}

async function editMessageOne(msg, args) {
    msg.delete();

    let options = {
        title: 'The 30:lollipop: giveaway has ended',
        description: '\u200b\n**Reason:** Big Tuna is officially verified!\
        \n**Reward:** 30:lollipop:\
        \n**Ended:** April 16th, 8:00pm EST'
    };

    let embed = new MessageEmbed(options);

    let embedMessage = await msg.channel.messages.fetch(args[0]);

    embedMessage.edit(embed);
}

async function getWinnerOne(msg, args) {
    msg.delete();

    let embedMessage = await msg.channel.messages.fetch(args[0]);
    let reactionUserManager = await embedMessage.reactions.cache.get('🐟').users;
    let keyArray = (await reactionUserManager.fetch()).keyArray();
    keyArray.splice(keyArray.indexOf(client.user.id), 1);
    
    let chosenUserID = keyArray[randint(0, keyArray.length-1)];
    console.log(`User with ID ${chosenUserID} has been selected`);

    msg.channel.send(`<@${chosenUserID}>,\n**Congratulations! You have won the 30:lollipop: giveaway!**\nYou will receive your reward shortly...`);
}