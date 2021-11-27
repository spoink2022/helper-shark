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
        } else if (cmd === 'sendmessage2') {
            sendMessageTwo(msg);
        } else if (cmd === 'editmessage2') {
            editMessageTwo(msg, args);
        } else if (cmd === 'getwinner2') {
            getWinnerTwo(msg, args);
        }
    }
}

// ONE
async function sendMessageOne(msg) {
    msg.delete();
    
    let options = {
        color: '#00ff00',
        title: 'React to Enter the 2000 Server Celebratory Giveaway (Part 1/2)!',
        description: '(React with :tada:)\
        \n\n**Reason:** Finally hit 2000 servers!\
        \n\n**Rewards:**\
        \n:small_orange_diamond: Trophy-grade XL Fish Card (B-Tier) :trophy:\
        \n:small_orange_diamond: Coins (equal to price of premium pack) :coin:\
        \n:small_orange_diamond: Liver x5\
        \n:small_orange_diamond: Red Equipment Banner x2\
        \n\n**Ends:** Dec 4th, 8:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    msg.channel.send(embed).then(sentEmbed => {
        sentEmbed.react('🎉');
    });
}

async function editMessageOne(msg, args) {
    msg.delete();

    let options = {
        title: 'The 2000 Server Celebratory Giveaway Has Ended (Part 1/2)',
        description: '\u200b\n**Reason:** Finally hit 2000 servers!\
        \n\n**Rewards:**\
        \n:small_orange_diamond: Trophy-grade XL Fish Card (B-Tier) :trophy:\
        \n:small_orange_diamond: Coins (equal to price of premium pack) :coin:\
        \n:small_orange_diamond: Liver x5\
        \n:small_orange_diamond: Red Equipment Banner x2\
        \n\n**Ended:** Dec 4th, 8:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    let embedMessage = await msg.channel.messages.fetch(args[0]);

    embedMessage.edit(embed);
}

async function getWinnerOne(msg, args) {
    msg.delete();

    let embedMessage = await msg.channel.messages.fetch(args[0]);
    let reactionUserManager = await embedMessage.reactions.cache.get('🎉').users;
    let keyArray = (await reactionUserManager.fetch()).keyArray();
    keyArray.splice(keyArray.indexOf(client.user.id), 1);
    
    let chosenUserID = keyArray[randint(0, keyArray.length-1)];
    console.log(`User with ID ${chosenUserID} has been selected`);

    msg.channel.send(`<@${chosenUserID}>,\n**Congratulations! You have won Part 1 of the 2000 Server Celebratory giveaway!**`);
}

// TWO
async function sendMessageTwo(msg) {
    msg.delete();
    
    let options = {
        color: '#00ff00',
        title: 'React to Enter the 2000 Server Celebratory Giveaway (Part 2/2)!',
        description: '(React with :tada:)\
        \n\n**Reason:** Finally hit 2000 servers!\
        \n\n**Rewards:**\
        \n:small_blue_diamond: Big Supporter **[.help supporter]** :big_tuna:\
        \n:small_blue_diamond: Sashimi-grade L Fish Card (S-Tier) :sushi:\
        \n:small_blue_diamond: Leeches x10\
        \n:small_blue_diamond: Green Equipment Banner x2\
        \n\n**Ends:** Dec 5th, 8:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    msg.channel.send(embed).then(sentEmbed => {
        sentEmbed.react('🎉');
    });
}

async function editMessageTwo(msg, args) {
    msg.delete();

    let options = {
        title: 'The 2000 Server Celebratory Giveaway Has Ended (Part 2/2)',
        description: '\u200b\n**Reason:** Finally hit 2000 servers!\
        \n\n**Rewards:**\
        \n:small_blue_diamond: Big Supporter **[.help supporter]** :reminder_ribbon:\
        \n:small_blue_diamond: Sashimi-grade L Fish Card (S-Tier) :sushi:\
        \n:small_blue_diamond: Leeches x10\
        \n:small_blue_diamond: Green Equipment Banner x2\
        \n\n**Ended:** Dec 5th, 8:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    let embedMessage = await msg.channel.messages.fetch(args[0]);

    embedMessage.edit(embed);
}

async function getWinnerTwo(msg, args) {
    msg.delete();

    let embedMessage = await msg.channel.messages.fetch(args[0]);
    let reactionUserManager = await embedMessage.reactions.cache.get('🎉').users;
    let keyArray = (await reactionUserManager.fetch()).keyArray();
    keyArray.splice(keyArray.indexOf(client.user.id), 1);
    
    let chosenUserID = keyArray[randint(0, keyArray.length-1)];
    console.log(`User with ID ${chosenUserID} has been selected`);

    msg.channel.send(`<@${chosenUserID}>,\n**Congratulations! You have won Part 2 of the 2000 Server Celebratory giveaway!**`);
}