const { resolveAction } = require('./helpers');
var resolvers = require('./resolvers');

const connection = (client, assert, dbName, collection, type, object) => {
    return new Promise((resolve, reject) => {
        client.connect((err) => {
          assert.strictEqual(null, err);
          const db = client.db(dbName);
          resolvers[resolveAction(type)](collection, assert, db, object,  (records) => {
            resolve(records);
            client.close();
          })
        })  
    })
}

module.exports = connection;