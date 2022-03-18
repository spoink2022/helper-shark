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
        title: 'React to Enter the 1-Year Anniversary Giveaway! (Part 2)',
        description: '(React with :tada:)\
\n\n**Reason:** Happy Birthday Big Tuna!\
\n\n**Rewards:**\
\n:small_blue_diamond: Diamond Ring (based on lvl) x1\
\n:small_blue_diamond: Blue Equipment Banner x1\
\n:small_blue_diamond: Crayfish x10\
\n:small_blue_diamond: Crab x10\
\n\n**Ends:** Mar 25th, 8:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    msg.channel.send(embed).then(sentEmbed => {
        sentEmbed.react('🎉');
    });
}

async function editMessageOne(msg, args) {
    msg.delete();

    let options = {
        title: 'The 1-Year Anniversary Giveaway (Part 2) Has Ended',
        description: '\u200b\n**Reason:** Happy Birthday Big Tuna!\
\n\n**Rewards:**\
\n:small_blue_diamond: Diamond Ring (based on lvl) x1\
\n:small_blue_diamond: Blue Equipment Banner x1\
\n:small_blue_diamond: Crayfish x10\
\n:small_blue_diamond: Crab x10\
\n\n**Ended:** Mar 25th, 8:00pm EDT'
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

    msg.channel.send(`<@${chosenUserID}>,\n**Congratulations! You have won the 1-Year Anniversary Giveaway! (Part 2)**`);
}

// TWO
async function sendMessageTwo(msg) {
    msg.delete();
    
    let options = {
        color: '#00ff00',
        title: 'React to Enter the 1-Year Anniversary Giveaway! (Supporter Edition)',
        description: '(React with :cake:)\
\n\n**Reason:** Happy Birthday Big Tuna!\
\n\n**Rewards:**\
\n:small_orange_diamond: Red Equipment Banner x1\
\n:small_orange_diamond: Wagyu x3\
\n:small_orange_diamond: Shrimp x10\
\n\n**Ends:** Mar 25th, 8:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    msg.channel.send(embed).then(sentEmbed => {
        sentEmbed.react('🍰');
    });
}

async function editMessageTwo(msg, args) {
    msg.delete();

    let options = {
        title: 'The 1-Year Anniversary Giveaway (Supporter Edition) Has Ended',
        description: '\u200b\n**Reason:** Happy Birthday Big Tuna!\
\n\n**Rewards:**\
\n:small_orange_diamond: Red Equipment Banner x1\
\n:small_orange_diamond: Wagyu x3\
\n:small_orange_diamond: Shrimp x10\
\n\n**Ended:** Mar 25th, 8:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    let embedMessage = await msg.channel.messages.fetch(args[0]);

    embedMessage.edit(embed);
}

async function getWinnerTwo(msg, args) {
    msg.delete();

    let embedMessage = await msg.channel.messages.fetch(args[0]);
    let reactionUserManager = await embedMessage.reactions.cache.get('🍰').users;
    let keyArray = (await reactionUserManager.fetch()).keyArray();
    keyArray.splice(keyArray.indexOf(client.user.id), 1);
    
    let chosenUserID = keyArray[randint(0, keyArray.length-1)];
    console.log(`User with ID ${chosenUserID} has been selected`);

    msg.channel.send(`<@${chosenUserID}>,\n**Congratulations! You have won the 1-Year Anniversary Giveaway! (Supporter Edition)**`);
}

// PEASANT COMMANDS
async function sendClaim(msg) {
    let user = await db.getPurchases(msg.author.id);
    if (!user || user.supporter + user.big_supporter == 0) {
        msg.channel.send('You must be a Big Tuna Supporter to claim supporter roles!\nVisit https://bigtuna.xyz/shop to become a supporter.');
        return;
    }
    const HAS_SUPPORTER_ROLE = msg.member.roles.cache.has(config.supporterID);
    const HAS_BIG_SUPPORTER_ROLE = msg.member.roles.cache.has(config.bigSupporterID);
    const NEEDS_SUPPORTER_ROLE = !HAS_SUPPORTER_ROLE && user.supporter > 0;
    const NEEDS_BIG_SUPPORTER_ROLE = !HAS_BIG_SUPPORTER_ROLE && user.big_supporter > 0;

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