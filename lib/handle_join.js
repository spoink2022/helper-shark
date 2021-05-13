const config = require('../private/config.json');

module.exports.handleJoin = async function(guildMember) {
    console.log('on join called');
    if (guildMember.guild.id === config.guildID) {
        console.log('correct guild');
        let guild = await client.guilds.fetch(config.guildID);
        let roles = [];
        for (let roleID of config.joinRoles) {
            roles.push(await guild.roles.fetch(roleID));
        }
        guildMember.edit({roles: roles}).catch(() => {
            console.log(`Could't add role for user ${guildMember.user.tag}`);
        });
    } else {
        console.log('incorrect guild');
    }
}