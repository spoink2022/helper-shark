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
            switch (cmd) {
                case 'ban':
                    sendBan(msg, args);
                    break;
                case 'unban':
                    sendUnban(msg, args);
                    break;
                case 'banlist':
                    sendBanlist(msg);
                    break;
                case 'sendmessage1':
                    sendMessageOne(msg);
                    break;
                case 'editmessage1':
                    editMessageOne(msg, args);
                    break;
                case 'getwinner1':
                    getWinnerOne(msg, args);
                    break;
                case 'sendmessage2':
                    sendMessageTwo(msg);
                    break;
                case 'editmessage2':
                    editMessageTwo(msg, args);
                    break;
                case 'getwinner2':
                    getWinnerTwo(msg, args);
                    break;
                case 'sendmessage3':
                    sendMessageThree(msg);
                    break;
                case 'editmessage3':
                    editMessageThree(msg, args);
                    break;
                case 'getwinner3':
                    getWinnerThree(msg, args);
                    break;
                case 'sendmessage4':
                    sendMessageFour(msg);
                    break;
                case 'editmessage4':
                    editMessageFour(msg, args);
                    break;
                case 'getwinner4':
                    getWinnerFour(msg, args);
                    break;
                case 'sendmessage5':
                    sendMessageFive(msg);
                    break;
                case 'editmessage5':
                    editMessageFive(msg, args);
                    break;
                case 'getwinner5':
                    getWinnerFive(msg, args);
                    break;
                default:
                    break;
            }
        }

        // Handle peasant commands
        switch (cmd) {
            case 'claim':
                sendClaim(msg);
                break;
            case 'roll':
                sendRoll(msg, args);
                break;
            default:
                break;
        }

    }
}

// Ban/Unban
async function sendBan(msg, args) {
    if (!args[0]) {
        return msg.channel.send('no user id...');
    }
    let user = await db.fetchUser(args[0]);
    if (!user) {
        return msg.channel.send('That user doesn\'t exist!')
    }
    if (user.banned) {
        return msg.channel.send(`<@${args[0]}> is already banned!`);
    }
    db.setUserColumn(args[0], 'banned', true);
    return msg.channel.send(`Banned <@${args[0]}>`);
}

async function sendUnban(msg, args) {
    if (!args[0]) {
        return msg.channel.send('no user id...');
    }
    let user = await db.fetchUser(args[0]);
    if (!user) {
        return msg.channel.send('That user doesn\'t exist!')
    }
    if (!user.banned) {
        return msg.channel.send(`<@${args[0]}> is already not banned!`);
    }
    db.setUserColumn(args[0], 'banned', false);
    return msg.channel.send(`Unbanned <@${args[0]}>`);
}

async function sendBanlist(msg) {
    let userids = await db.getBannedUsers();
    return msg.channel.send(`**${userids.length} Banned Users**\n${userids.map(userid => `<@${userid.userid}>`).join('\n')}`);
}

// ONE
async function sendMessageOne(msg) {
    msg.delete();
    
    let options = {
        color: '#00ff00',
        title: 'React to Enter the KobaconGaming-Sponsored Giveaway!',
        description: '(React with :fish:)\
\n\n**Reason:** Thanks KobaconGaming#0420 for sponsoring this giveaway!\
\n\n**Rewards:**\
\n:small_blue_diamond: Premium Server x1 (Ownership)\
\n:small_blue_diamond: Huge Cutbait x3\
\n:small_blue_diamond: Wagyu x5\
\n:small_blue_diamond: Minnows x60\
\n\n**Ends:** June 3rd (Friday), 8:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    msg.channel.send(embed).then(sentEmbed => {
        sentEmbed.react('🐟');
    });
}

async function editMessageOne(msg, args) {
    msg.delete();

    let options = {
        title: 'The KobaconGaming-Sponsored Giveaway Has Ended',
        description: '\u200b\n**Reason:** Thanks KobaconGaming#0420 for sponsoring this giveaway!\
\n\n**Rewards:**\
\n:small_blue_diamond: Premium Server x1 (Ownership)\
\n:small_blue_diamond: Huge Cutbait x3\
\n:small_blue_diamond: Wagyu x5\
\n:small_blue_diamond: Minnows x60\
\n\n**Ended:** June 3rd, 8:00pm EDT'
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

    msg.channel.send(`<@${chosenUserID}>,\n**Congratulations! You have won the KobaconGaming-Sponsored Giveaway!**`);
}

// TWO
async function sendMessageTwo(msg) {
    msg.delete();
    
    let options = {
        color: '#00ff00',
        title: 'React to Enter the Haku-Sponsored Giveaway! (Part 2)',
        description: '(React with :fish:)\
\n\n**Reason:** Thanks Haku#5721 for sponsoring this giveaway!\
\n\n**Rewards:**\
\n:small_blue_diamond: Premium Server x1 (Ownership)\
\n:small_blue_diamond: Worms x50\
\n\n**Ends:** May 21st (Saturday), 8:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    msg.channel.send(embed).then(sentEmbed => {
        sentEmbed.react('🐟');
    });
}

async function editMessageTwo(msg, args) {
    msg.delete();

    let options = {
        title: 'The Haku-Sponsored Giveaway Part 2 Has Ended',
        description: '\u200b\n**Reason:** Thanks Haku#5721 for sponsoring this giveaway!\
\n\n**Rewards:**\
\n:small_blue_diamond: Premium Server x1 (Ownership)\
\n:small_blue_diamond: Worms x50\
\n\n**Ended:** May 21st (Saturday), 8:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    let embedMessage = await msg.channel.messages.fetch(args[0]);

    embedMessage.edit(embed);
}

async function getWinnerTwo(msg, args) {
    msg.delete();

    let embedMessage = await msg.channel.messages.fetch(args[0]);
    let reactionUserManager = await embedMessage.reactions.cache.get('🐟').users;
    let keyArray = (await reactionUserManager.fetch()).keyArray();
    keyArray.splice(keyArray.indexOf(client.user.id), 1);
    
    let chosenUserID = keyArray[randint(0, keyArray.length-1)];
    console.log(`User with ID ${chosenUserID} has been selected`);

    msg.channel.send(`<@${chosenUserID}>,\n**Congratulations! You have won the Haku-Sponsored Giveaway! (Part 2)**`);
}

// THREE
async function sendMessageThree(msg) {
    msg.delete();
    
    let options = {
        color: '#00ff00',
        title: 'React to Enter the Haku-Sponsored Giveaway! (Part 3)',
        description: '(React with :fish:)\
\n\n**Reason:** Thanks Haku#5721 for sponsoring this giveaway!\
\n\n**Rewards:**\
\n:small_blue_diamond: Premium Server x1 (Ownership)\
\n:small_blue_diamond: Sardine x50\
\n\n**Ends:** May 22nd (Sunday), 8:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    msg.channel.send(embed).then(sentEmbed => {
        sentEmbed.react('🐟');
    });
}

async function editMessageThree(msg, args) {
    msg.delete();

    let options = {
        title: 'The Haku-Sponsored Giveaway Part 3 Has Ended',
        description: '\u200b\n**Reason:** Thanks Haku#5721 for sponsoring this giveaway!\
\n\n**Rewards:**\
\n:small_blue_diamond: Premium Server x1 (Ownership)\
\n:small_blue_diamond: Sardine x50\
\n\n**Ended:** May 22nd (Sunday), 8:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    let embedMessage = await msg.channel.messages.fetch(args[0]);

    embedMessage.edit(embed);
}

async function getWinnerThree(msg, args) {
    msg.delete();

    let embedMessage = await msg.channel.messages.fetch(args[0]);
    let reactionUserManager = await embedMessage.reactions.cache.get('🐟').users;
    let keyArray = (await reactionUserManager.fetch()).keyArray();
    keyArray.splice(keyArray.indexOf(client.user.id), 1);
    
    let chosenUserID = keyArray[randint(0, keyArray.length-1)];
    console.log(`User with ID ${chosenUserID} has been selected`);

    msg.channel.send(`<@${chosenUserID}>,\n**Congratulations! You have won the Haku-Sponsored Giveaway! (Part 3)**`);
}

// Special Giveaway
async function sendMessageFour(msg) {
    msg.delete();

    let options = {
        color: '#00ff00',
        title: 'React to Enter the Guaranteed-Win Supporter Giveaway!',
        description: '(React with :star_struck:)\
\n\n**Reason:** It\'s my birthday May 20th, which works out to be Friday :cake:\
\n\nAlso to celebrate a new laptop, which lets me work on Big Tuna *without* crashing :unamused:\
\n\nI have high hopes for this laptop. I really do.\
\n\n**Rewards (each player will win 1 of):**\
\n:gift: Candy Cane x1\
\n:gift: Tuna Chunks x3\
\n:gift: Crab x10\
\n:gift: Worms x50\
\n:gift: 50 Quest Points :lollipop:\
\n\n**Ends:** May 20th (Friday), 8:00pm EDT',
        image: {
            url: 'https://thumbs.dreamstime.com/b/everyone-wins-grunge-rubber-stamp-white-background-vector-illustration-225804527.jpg'
        }
    };

    let embed = new MessageEmbed(options);

    msg.channel.send(embed).then(sentEmbed => {
        sentEmbed.react('🤩');
    });
}

async function editMessageFour(msg, args) {
    msg.delete();

    let options = {
        title: 'The Guaranteed-Win Supporter Giveaway Has Ended',
        description: '\u200b\n**Reason:** Happy birthday to me :cake:\
\n\nAlso to celebrate a new laptop, which lets me work on Big Tuna *without* crashing :unamused:\
\n\n**Rewards (each player won one of):**\
\n:gift: Candy Cane x1\
\n:gift: Tuna Chunks x3\
\n:gift: Crab x10\
\n:gift: Worms x50\
\n:gift: 40 to 80 Quest Points :lollipop:\
\n\n**Ended:** May 20th (Friday), 8:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    let embedMessage = await msg.channel.messages.fetch(args[0]);

    embedMessage.edit(embed);
}

async function getWinnerFour(msg, args) {
    msg.delete();

    let embedMessage = await msg.channel.messages.fetch(args[0]);
    let reactionUserManager = await embedMessage.reactions.cache.get('🤩').users;
    let keyArray = (await reactionUserManager.fetch()).keyArray();
    keyArray.splice(keyArray.indexOf(client.user.id), 1);

    let responseMessage = '';

    for (let userid of keyArray) {
        let prize = randint(1, 5);
        switch (prize) {
            case 1:
                responseMessage += `<@${userid}> won Candy Cane x1\n`;
                db.updateBaitColumns(userid, { 'candy_cane': 1 });
                break;
            case 2:
                responseMessage += `<@${userid}> won Tuna Chunks x3\n`;
                db.updateBaitColumns(userid, { 'tuna_chunks': 3 });
                break;
            case 3:
                responseMessage += `<@${userid}> won Crab x10\n`;
                db.updateBaitColumns(userid, { 'crab': 10 });
                break;
            case 4:
                responseMessage += `<@${userid}> won Worms x50\n`;
                db.updateBaitColumns(userid, { 'worms': 50 });
                break;
            case 5:
                let qt = randint(40, 80);
                responseMessage += `<@${userid}> won ${qt} :lollipop:\n`;
                db.updateUserColumns(userid, { 'lollipops': qt });
                break;
            default:
                break;
        }
    }

    msg.channel.send(responseMessage);
}

// FIVE
async function sendMessageFive(msg) {
    msg.delete();
    
    let options = {
        color: '#00ff00',
        title: 'React to Enter the Surprise Giveaway!',
        description: '(React with :exploding_head:)\
\n\n**Reason:** Thanks Haku#5721 for sponsoring this giveaway!\
\n\n**Rewards:**\
\n:small_blue_diamond: Premium Server x3 (Ownership)\
\n:small_blue_diamond: Crab x3\
\n:small_blue_diamond: Crayfish x3\
\n:small_blue_diamond: Wagyu x3\
\n\n**Ends:** May 27th (Friday), 8:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    msg.channel.send(embed).then(sentEmbed => {
        sentEmbed.react('🤯');
    });
}

async function editMessageFive(msg, args) {
    msg.delete();

    let options = {
        title: 'The Surprise Giveaway Has Ended',
        description: '\u200b\n**Reason:** Thanks Haku#5721 for sponsoring this giveaway!\
\n\n**Rewards:**\
\n:small_blue_diamond: Premium Server x3 (Ownership)\
\n:small_blue_diamond: Crab x3\
\n:small_blue_diamond: Crayfish x3\
\n:small_blue_diamond: Wagyu x3\
\n\n**Ended:** May 27th (Friday), 8:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    let embedMessage = await msg.channel.messages.fetch(args[0]);

    embedMessage.edit(embed);
}

async function getWinnerFive(msg, args) {
    msg.delete();

    let embedMessage = await msg.channel.messages.fetch(args[0]);
    let reactionUserManager = await embedMessage.reactions.cache.get('🤯').users;
    let keyArray = (await reactionUserManager.fetch()).keyArray();
    keyArray.splice(keyArray.indexOf(client.user.id), 1);
    
    let chosenUserID = keyArray[randint(0, keyArray.length-1)];
    console.log(`User with ID ${chosenUserID} has been selected`);

    msg.channel.send(`<@${chosenUserID}>,\n**Congratulations! You have won the Surprise Giveaway!**`);
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

async function sendRoll(msg, args) {
    if (!args[0]) { args = [100] }
    else { args[0] = parseInt(args[0]); }
    
    if (!args[0] || args[0] < 1) {
        return msg.channel.send('Please enter a valid input!');
    }

    const roll = Math.floor(Math.random() * args[0]) + 1;

    return msg.channel.send(`**${roll}**`);
}