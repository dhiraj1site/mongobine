const ObjectIdWrapper = require('mongodb').ObjectID;
const helpers = {};

helpers.resolveAction = function(type) {
    switch(type) {
        case 'find':
            return 'findDocument';
        case 'findOne':
            return 'findOneDocument';
        case 'update':
            return 'updateDocument';
        case 'insert': 
            return 'insertDocument';
        case 'delete':
            return 'removeDocument';
    }
}

helpers.resolveQuery = function(obj) {
    var query, _send, _obj;
    _obj = obj;
    if(Object.keys(obj)[0] == "_id") {
        try {
            _send = {_id: new ObjectIdWrapper(obj._id) };
        }
        catch(err) {
            return {
                type: 0, 
                res: err
            };
        }
        query = _send;
    }
    else {
      query = _obj;
    }
    return {
        type: 1, 
        res: query
    }
}

module.exports  = helpers;