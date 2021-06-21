# MongoBine

# Installation

`npm install mongobine`

# How to use

Mongobine is a simple wrapper around javascript mongodb driver. It offers basic CRUD operations

```
var mongobine = require('mongobine');

// create a new mongo instance passing your connection details
var mongo = new mongobine({collection: 'users', url: 'mongodb://localhost:27017', document: 'binebox'});

// Allows you to basic simple CRUD operations for mongodb

//create
mongo.insert({email: "myemail@email.com"});

//retrieve
mongo.find({email: "myemail@email.com"});

//update
mongo.update({email : "myemail@email.com"}, {code: 23}).then(res => {
    console.log('got the update response', res);
});

//delete
mongo.delete({email: "myemail@email.com"});
```