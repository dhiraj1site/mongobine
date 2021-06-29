var mongobine = require('./index');

//skiptime stamp optional for skipping timestamp on every update, post
var mongo = new mongobine({collection: 'users', skipTimeStamp: false});

//CRUD operations for mongodb

//create
mongo.insert({email: "myemail@email.com"});

// //retrieve
mongo.find({});

// //update
mongo.update({email : "myemail@email.com"}, {code: 2233}).then(res => {
    console.log('got the update response', res);
});

// //delete
mongo.delete({email: "myemail@email.com"});
