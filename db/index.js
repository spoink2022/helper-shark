const config = require('./config.js');

module.exports.getPurchases = async function(userid) {
    let query = 'SELECT supporter, big_supporter FROM users WHERE userid=$1 LIMIT 1';
    let res = await config.pquery(query, [userid]);
    return res[0];
}