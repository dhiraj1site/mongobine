const connection = require('./connection');
const MongoClient = require('mongodb').MongoClient;
const ObjectIdWrapper = require('mongodb').ObjectID;
const assert = require('assert');
const helpers = require('./helpers');

class MongoBine {
  constructor(_construct) {
    const { collection, url, document } = _construct;
    this.collection = collection || 'users';
    this.skipTimeStamp = _construct.skipTimeStamp || false;
    this.url = url || 'mongodb://localhost:27017';
    this.client = new MongoClient(this.url, {useUnifiedTopology: true});
    this.dbName = document || 'binebox';
  }
    
  find(findObject, persist = false) {
    this.type = 'find';
    var query = helpers.resolveQuery(findObject);
    if(query.type === 0) {
      return Promise.reject(query.res);
    }
    const {client, dbName, collection, type} = this;
    return connection(client, assert, dbName, collection, type, query.res, persist);
  }

  findOne(findObject, persist = false) {
    this.type = 'findOne';
    var query = helpers.resolveQuery(findObject);
    if(query.type === 0) {
      return Promise.reject(query.res);
    }
    const {client, dbName, collection, type} = this;
    return connection(client, assert, dbName, collection, type, query.res, persist);
  }

  update(target, updates, persist = false) {
    var query = helpers.resolveQuery(target);
    if(query.type === 0) {
      return Promise.reject(query.res);
    }
    const updateObject = {
        target: query.res, 
        updates: updates
    };
    this.type = 'update';
    const {client, dbName, collection, type, skipTimeStamp} = this;
    if(!skipTimeStamp) {
      updateObject.dateUpdated = Date.now();
    }
    return connection(client, assert, dbName, collection, type, updateObject, persist);
  };

  insert(insertObject, persist = false) {
    this.type = 'insert';
    const {client, dbName, collection, type, skipTimeStamp} = this;
    if(!skipTimeStamp) {
      insertObject.dateCreated = Date.now();
      insertObject.dateUpdated = Date.now();
    }
    return connection(client, assert, dbName, collection, type, insertObject, persist);
  };

  delete(deleteObject, persist = false) {
    this.type = 'delete';
    var query = helpers.resolveQuery(deleteObject);
    if(query.type === 0) {
      return Promise.reject(query.res);
    }
    const {client, dbName, collection, type} = this;
    return connection(client, assert, dbName, collection, type, query.res, persist);
  };

}

module.exports = MongoBine;

