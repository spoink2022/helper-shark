const config = require('./config.js');

module.exports.getPurchases = async function(userid) {
    let query = 'SELECT supporter, big_supporter FROM users WHERE userid=$1 LIMIT 1';
    let res = await config.pquery(query, [userid]);
    return res[0];
}

module.exports.updateUserColumns = async function(userid, obj) {
    let queryMiddle = Object.keys(obj).map(key => `${key}=${key}+${obj[key]}`).join(', ');
    let query = `UPDATE users SET ${queryMiddle} WHERE userid=$1`;
    return await config.pquery(query, [userid]);
}

module.exports.updateBaitColumns = async function(userid, obj) {
    let queryMiddle = Object.keys(obj).map(key => `${key}=${key}+${obj[key]}`).join(', ');
    let query = `UPDATE bait SET ${queryMiddle} WHERE userid=$1`;
    return await config.pquery(query, [userid]);
}

module.exports.fetchUser = async function(userid) {
    let query = 'SELECT * FROM users WHERE userid=$1';
    return (await config.pquery(query, [userid]))[0];
}

module.exports.setUserColumn = async function(userid, col, val) {
    let query = `UPDATE users SET ${col}=$1 WHERE userid=$2`;
    return await config.pquery(query, [val, userid]);
}

module.exports.getBannedUsers = async function() {
    let query = 'SELECT userid FROM users WHERE banned';
    return await config.pquery(query, []);
}