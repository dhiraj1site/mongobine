const connection = require('./connection');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

class MongoBine {
  constructor(_construct) {
    const { collection, url, document } = _construct;
    this.collection = collection || 'users';
    this.url = url || 'mongodb://localhost:27017';
    this.client = new MongoClient(this.url, {useUnifiedTopology: true});
    this.dbName = document || 'binebox';
  }
    
  find(findObject) {
    this.type = 'find';
    const {client, dbName, collection, type} = this;
    return connection(client, assert, dbName, collection, type, findObject);
  }

  update(target, updates) {
    const updateObject = {
        target: target, 
        updates: updates
    };
    this.type = 'update';
    const {client, dbName, collection, type} = this;
    return connection(client, assert, dbName, collection, type, updateObject);
  };

  insert(insertObject) {
    this.type = 'insert';
    const {client, dbName, collection, type} = this;
    return connection(client, assert, dbName, collection, type, insertObject);
  };

  delete(deleteObject) {
    this.type = 'delete';
    const {client, dbName, collection, type} = this;
    return connection(client, assert, dbName, collection, type, deleteObject);
  };

}

module.exports = MongoBine;

