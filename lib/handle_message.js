const { MessageEmbed, MessageAttachment } = require('discord.js');

const config = require('../private/config.json');

const db = require('../db');
const { noData } = require('pg-protocol/dist/messages');

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
		case 'now':
		    let now = Date.now();
		    msg.channel.send(now - now%3600000);
		    break;
            case 'claim':
                sendClaim(msg);
                break;
            case 'roll':
                sendRoll(msg, args);
                break;
            case 'christmas':
                sendChristmas(msg);
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
        title: 'React to Enter the Big Tuna Christmas Giveaway!',
        description: '\u200b(React with :christmas_tree:)\
\n\n**Reason:** Merry Christmas!\
\nNOTE: 5 winners will be selected for this giveaway, each of which will receive the rewards outlined below.\
\n\n**Rewards:**\
\n:small_blue_diamond: Candy Cane x3\
\n:small_blue_diamond: Random S-tier Trophy Card :trophy:\
\n:small_blue_diamond: Small Cutbait x10\
\n:small_blue_diamond: Christmas Banner x1 :christmas_tree:\
\n\n**Ends:** December 25th (Sunday), 10:00pm EDT',
        image: {
            url: 'https://raw.githubusercontent.com/spoink2022/fishing-bot/main/static/img/cosmetics/equipment_banner/christmas_banner.png'
        }
    };

    let embed = new MessageEmbed(options);

    msg.channel.send(embed).then(sentEmbed => {
        sentEmbed.react('🎄');
    });
}

async function editMessageOne(msg, args) {
    msg.delete();

    let options = {
        title: 'The Big Tuna Christmas Giveaway Has Ended',
        description: '\u200b**Reason:** Merry Christmas!\
\nNOTE: 5 winners have been selected for this giveaway, each of which has received the rewards outlined below.\
\n\n**Rewards:**\
\n:small_blue_diamond: Candy Cane x3\
\n:small_blue_diamond: Random S-tier Trophy Card :trophy:\
\n:small_blue_diamond: Small Cutbait x10\
\n:small_blue_diamond: Christmas Banner x1 :christmas_tree:\
\n\n**Ended:** December 25th (Sunday), 10:00pm EDT',
        image: {
            url: 'https://raw.githubusercontent.com/spoink2022/fishing-bot/main/static/img/cosmetics/equipment_banner/christmas_banner.png'
        }
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

    msg.channel.send(`<@${chosenUserID}>,\n**Congratulations! You have won the Big Tuna Christmas Giveaway!**`);
}

// TWO
async function sendMessageTwo(msg) {
    msg.delete();
    
    let options = {
        color: '#00ff00',
        title: 'React to Enter the Fish\’N GameWarden Sponsored Bait Giveaway!',
        description: '\u200b(React with :santa:)\
\n\n**Reason:** Thanks Fish\’N GameWarden#8486 for sponsoring this giveaway!\
\nThese baits may prove to be *extremely useful* in the upcoming chum update!\
\n\n**Rewards:**\
\n:apple: Bloodworms x300\
\n:apple: Minnows x250\
\n:apple: Worms x200\
\n:apple: Leeches x100\
\n:apple: Small Cutbait x10\
\n:apple: Medium Cutbait x5\
\n:apple: Large Cutbait x5\
\n:apple: Huge Cutbait x2\
\n\n**Ends:** December 24th (Saturday), 10:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    msg.channel.send(embed).then(sentEmbed => {
        sentEmbed.react('🎅');
    });
}

async function editMessageTwo(msg, args) {
    msg.delete();

    let options = {
        title: 'The Fish\’N GameWarden Sponsored Bait Giveaway Has Ended',
        description: '\u200b\n**Reason:** Thanks Fish\’N GameWarden#8486 for sponsoring this giveaway!\
\n\n**Rewards:**\
\n:apple: Bloodworms x300\
\n:apple: Minnows x250\
\n:apple: Worms x200\
\n:apple: Leeches x100\
\n:apple: Small Cutbait x10\
\n:apple: Medium Cutbait x5\
\n:apple: Large Cutbait x5\
\n:apple: Huge Cutbait x2\
\n\n**Ended:** December 24th (Saturday), 10:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    let embedMessage = await msg.channel.messages.fetch(args[0]);

    embedMessage.edit(embed);
}

async function getWinnerTwo(msg, args) {
    msg.delete();

    let embedMessage = await msg.channel.messages.fetch(args[0]);
    let reactionUserManager = await embedMessage.reactions.cache.get('🎅').users;
    let keyArray = (await reactionUserManager.fetch()).keyArray();
    keyArray.splice(keyArray.indexOf(client.user.id), 1);
    
    let chosenUserID = keyArray[randint(0, keyArray.length-1)];
    console.log(`User with ID ${chosenUserID} has been selected`);

    msg.channel.send(`<@${chosenUserID}>,\n**Congratulations! You have won the Fish\’N GameWarden Sponsored Bait Giveaway**`);
}

// THREE
async function sendMessageThree(msg) {
    msg.delete();
    
    let options = {
        color: '#00ff00',
        title: 'React to Enter the Christmas Supporter Giveaway!',
        description: '(React with :candy:)\
\n\n**Reason:** Y\'all said I wasn\'t doing enough for supporters, so here\'s a little something! :grin:\
\n\n**Rewards:**\
\n:small_blue_diamond: Large Cutbait x20\
\n:small_blue_diamond: Candy Cane x3\
\n:small_blue_diamond: Coins (equivalent to 2 premium ring packs)\
\n\n**Ends:** December 25th (Sunday), 10:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    msg.channel.send(embed).then(sentEmbed => {
        sentEmbed.react('🍬');
    });
}

async function editMessageThree(msg, args) {
    msg.delete();

    let options = {
        title: 'The Christmas Supporter Giveaway Has Ended',
        description: '\u200b\n**Reason:** Y\'all said I wasn\'t doing enough for supporters, so here\'s a little something! :grin:\
\n\n**Rewards:**\
\n:small_blue_diamond: Large Cutbait x20\
\n:small_blue_diamond: Candy Cane x3\
\n:small_blue_diamond: Coins (equivalent to 2 premium ring packs)\
\n\n**Ended:** December 25th (Sunday), 10:00pm EDT'
    };

    let embed = new MessageEmbed(options);

    let embedMessage = await msg.channel.messages.fetch(args[0]);

    embedMessage.edit(embed);
}

async function getWinnerThree(msg, args) {
    msg.delete();

    let embedMessage = await msg.channel.messages.fetch(args[0]);
    let reactionUserManager = await embedMessage.reactions.cache.get('🍬').users;
    let keyArray = (await reactionUserManager.fetch()).keyArray();
    keyArray.splice(keyArray.indexOf(client.user.id), 1);
    
    let chosenUserID = keyArray[randint(0, keyArray.length-1)];
    console.log(`User with ID ${chosenUserID} has been selected`);

    msg.channel.send(`<@${chosenUserID}>,\n**Congratulations! You have won the Christmas Supporter Giveaway!**`);
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

async function sendChristmas(msg) {
    let user = await db.fetchUser(msg.author.id);
    if (!user) {
        return msg.channel.send('You gotta play Big Tuna to claim the rewards, duh!');
    }
    if (user.mistletoe_claimed) {
        return msg.reply('You have already claimed your mistletoe banner!');
    }
    db.setUserColumn(msg.author.id, 'mistletoe_claimed', true);
    db.addCosmetic(msg.author.id, 0, 8);
    return msg.reply('Successfully claimed **Mistletoe Banner!**\nCheck it out with `/skins`');
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