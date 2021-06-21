const helpers = {};

helpers.resolveAction = function(type) {
    switch(type) {
        case 'find':
            return 'findDocument';
        case 'update':
            return 'updateDocument';
        case 'insert': 
            return 'insertDocument';
        case 'delete':
            return 'removeDocument';
    }
}

module.exports  = helpers;