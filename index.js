const connection = require('./connection');
const MongoClient = require('mongodb').MongoClient;
const ObjectIdWrapper = require('mongodb').ObjectID;
const assert = require('assert');

class MongoBine {
  constructor(_construct) {
    const { collection, url, document } = _construct;
    this.collection = collection || 'users';
    this.skipTimeStamp = _construct.skipTimeStamp || false;
    this.url = url || 'mongodb://localhost:27017';
    this.client = new MongoClient(this.url, {useUnifiedTopology: true});
    this.dbName = document || 'binebox';
  }
    
  find(findObject) {
    this.type = 'find';
    if(Object.keys(findObject)[0] == "_id") {
      findObject = {_id: new ObjectIdWrapper(findObject._id)};
    }
    const {client, dbName, collection, type} = this;
    return connection(client, assert, dbName, collection, type, findObject);
  }

  findOne(findObject) {
    this.type = 'findOne';
    if(Object.keys(findObject)[0] == "_id") {
      findObject = {_id: new ObjectIdWrapper(findObject._id)};
    }
    const {client, dbName, collection, type} = this;
    return connection(client, assert, dbName, collection, type, findObject);
  }

  update(target, updates) {
    var correctTarget;
    if(Object.keys(target)[0] == "_id") {
      correctTarget = {_id: new ObjectIdWrapper(target._id)};
    }
    const updateObject = {
        target: correctTarget || target, 
        updates: updates
    };
    this.type = 'update';
    const {client, dbName, collection, type, skipTimeStamp} = this;
    if(!skipTimeStamp) {
      updateObject.dateUpdated = Date.now();
    }
    return connection(client, assert, dbName, collection, type, updateObject);
  };

  insert(insertObject) {
    this.type = 'insert';
    const {client, dbName, collection, type, skipTimeStamp} = this;
    if(!skipTimeStamp) {
      insertObject.dateCreated = Date.now();
      insertObject.dateUpdated = Date.now();
    }
    return connection(client, assert, dbName, collection, type, insertObject);
  };

  delete(deleteObject) {
    this.type = 'delete';
    const {client, dbName, collection, type} = this;
    return connection(client, assert, dbName, collection, type, deleteObject);
  };

}

module.exports = MongoBine;

