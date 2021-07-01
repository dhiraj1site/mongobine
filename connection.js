const { resolveAction } = require('./helpers');
var resolvers = require('./resolvers');

const connection = (client, assert, dbName, collection, type, object, persist) => {
  return new Promise((resolve, reject) => {
    console.log('connected', client.isConnected());
    if(client.isConnected()) {
      resolvers[resolveAction(type)](collection, assert, db, object,  (records) => {
        resolve(records);
        client.close();
      })
    }
    else {
      client.connect((err) => {
            assert.strictEqual(null, err);
            const db = client.db(dbName);
            resolvers[resolveAction(type)](collection, assert, db, object,  (records) => {
              resolve(records);
              if(!persist) {
                client.close();
              }
            })
          })  
    }
  })
}

module.exports = connection;