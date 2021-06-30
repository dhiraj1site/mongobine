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

module.exports  = helpers;