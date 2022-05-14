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