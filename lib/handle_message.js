const { MessageEmbed } = require('discord.js');

const config = require('../private/config.json');

const db = require('../db');

function randint(min, max) {
    return Math.floor(min + Math.random()*(max-min+1));
}

module.exports.handleMessage = async function(msg) {
    if (msg.channel.type == 'text' && msg.content.startsWith(config.prefix)) {
        const content = msg.content.substring(config.prefix.length).split(' ');
        const cmd = content[0];
        const args = content.slice(1);

        // Handle mod commands
        if (config.mods.includes(msg.author.id)) {
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

        // Handle peasant commands
        switch (cmd) {
            case 'claim':
                sendClaim(msg);
                break;
            default:
                break;
        }

    }
}

// ONE
async function sendMessageOne(msg) {
    msg.delete();
    
    let options = {
        color: '#00ff00',
        title: 'React to Enter the 2021 Christmas Giveaway!',
        description: '(React with :christmas_tree:)\
\n\n**Reason:** Christmas!\
\n\n**Rewards:**\
\n:snowman: Candy Cane (exclusive bait) x3\
\n:snowman: Leeches x10\
\n:snowman: Christmas Equipment Banner x2\
\n:snowman: Blue Equipment Banner x2\
\n\n**Ends:** Dec 25th, 8:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    msg.channel.send(embed).then(sentEmbed => {
        sentEmbed.react('🎄');
    });
}

async function editMessageOne(msg, args) {
    msg.delete();

    let options = {
        title: 'The 2021 Christmas Giveaway Has Ended',
        description: '\u200b\n**Reason:** Christmas!\
\n\n**Rewards:**\
\n:snowman: Candy Cane (exclusive bait) x3\
\n:snowman: Leeches x10\
\n:snowman: Christmas Equipment Banner x2\
\n:snowman: Blue Equipment Banner x2\
\n\n**Ended:** Dec 25th, 8:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    let embedMessage = await msg.channel.messages.fetch(args[0]);

    embedMessage.edit(embed);
}

async function getWinnerOne(msg, args) {
    msg.delete();

    let embedMessage = await msg.channel.messages.fetch(args[0]);
    let reactionUserManager = await embedMessage.reactions.cache.get('🎄').users;
    let keyArray = (await reactionUserManager.fetch()).keyArray();
    keyArray.splice(keyArray.indexOf(client.user.id), 1);
    
    let chosenUserID = keyArray[randint(0, keyArray.length-1)];
    console.log(`User with ID ${chosenUserID} has been selected`);

    msg.channel.send(`<@${chosenUserID}>,\n**Congratulations! You have won the 2021 Christmas Giveaway!**`);
}

// TWO
async function sendMessageTwo(msg) {
    msg.delete();
    
    let options = {
        color: '#00ff00',
        title: 'React to Enter the 2021 Christmas Giveaway (Supporter Edition)!',
        description: '(React with :snowflake:)\
\n\n**Reason:** Christmas!\
\n\n**Rewards:**\
\n:snowman: Candy Cane (exclusive bait) x1\
\n:snowman: Coins (equivalent to the price of a regular ring pack)\
\n\n**Ends:** Dec 25th, 8:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    msg.channel.send(embed).then(sentEmbed => {
        sentEmbed.react('❄️');
    });
}

async function editMessageTwo(msg, args) {
    msg.delete();

    let options = {
        title: 'The 2021 Christmas Giveaway (Supporter Edition) Has Ended',
        description: '\u200b\n**Reason:** Christmas!\
\n\n**Rewards:**\
\n:snowman: Candy Cane (exclusive bait) x1\
\n:snowman: Coins (equivalent to the price of a regular ring pack)\
\n\n**Ended:** Dec 25th, 8:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    let embedMessage = await msg.channel.messages.fetch(args[0]);

    embedMessage.edit(embed);
}

async function getWinnerTwo(msg, args) {
    msg.delete();

    let embedMessage = await msg.channel.messages.fetch(args[0]);
    let reactionUserManager = await embedMessage.reactions.cache.get('❄️').users;
    let keyArray = (await reactionUserManager.fetch()).keyArray();
    keyArray.splice(keyArray.indexOf(client.user.id), 1);
    
    let chosenUserID = keyArray[randint(0, keyArray.length-1)];
    console.log(`User with ID ${chosenUserID} has been selected`);

    msg.channel.send(`<@${chosenUserID}>,\n**Congratulations! You have won the 2021 Christmas Giveaway (Supporter Edition)!**`);
}

// PEASANT COMMANDS
async function sendClaim(msg) {
    let purchases = await db.getPurchases(msg.author.id);
    if (!purchases || purchases.one_day_host + purchases.one_week_host == 0) {
        msg.channel.send('You must be a Big Tuna Supporter to claim supporter roles!\nVisit https://bigtuna.xyz/shop to become a supporter.');
        return;
    }
    const HAS_SUPPORTER_ROLE = msg.member.roles.cache.has(config.supporterID);
    const HAS_BIG_SUPPORTER_ROLE = msg.member.roles.cache.has(config.bigSupporterID);
    const NEEDS_SUPPORTER_ROLE = !HAS_SUPPORTER_ROLE && purchases.one_day_host > 0;
    const NEEDS_BIG_SUPPORTER_ROLE = !HAS_BIG_SUPPORTER_ROLE && purchases.one_week_host > 0;

    if (!NEEDS_SUPPORTER_ROLE && !NEEDS_BIG_SUPPORTER_ROLE) {
        msg.channel.send('Your roles are already up to date.');
    } else {
        if (NEEDS_SUPPORTER_ROLE) {
            msg.member.roles.add(config.supporterID);
        }
        if (NEEDS_BIG_SUPPORTER_ROLE) {
            msg.member.roles.add(config.bigSupporterID);
        }
        msg.channel.send('Your roles have been updated!');
    }
}