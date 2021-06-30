const resolvers = {};

resolvers.findDocument = (_collection, assert,  db, object, callback) => {
    const collection = db.collection(_collection);
    collection.find(object).toArray((err, docs) => {
        assert.strictEqual(err, null);
        console.log(docs);
        callback(docs);
    });
};

resolvers.findOneDocument = (_collection, assert,  db, object, callback) => {
  const collection = db.collection(_collection);
  collection.findOne(object , (err, docs) => {
      assert.strictEqual(err, null);
      console.log(docs);
      callback(docs);
  });
};

resolvers.updateDocument = (_collection, assert, db, updateObject, callback) => {
    const collection = db.collection(_collection);
    var setObject = { $set: updateObject.updates };
    collection.updateOne(updateObject.target, setObject , (err, result)  => {
      assert.strictEqual(err, null);
      assert.strictEqual(1, result.result.n);
      callback(result);
    });
};

resolvers.insertDocument = (_collection, assert, db, insertObject, callback) => {
      const collection = db.collection(_collection);
      collection.insertOne(insertObject , (err, result)  => {
        assert.strictEqual(err, null);
        assert.strictEqual(1, result.result.n);
        callback(result);
      });
};

resolvers.removeDocument = (_collection, assert, db, deleteObject, callback) => {
  const collection = db.collection(_collection);
  collection.deleteOne(deleteObject , (err, result)  => {
    assert.strictEqual(err, null);
    assert.strictEqual(1, result.result.n);
    callback(result);
  });
};

module.exports = resolvers;