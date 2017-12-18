const MongoClient = require('mongodb').MongoClient;

module.exports.connect = () => {
    MongoClient.connect('mongodb://localhost:27017/Users', (err,db) => {
        if (err) {
            return console.log('Unable to connect mongodb server');
        }

        console.log('Connected to mongodb server');

        db.Collection('Todos').insertOne({test:"ToDo-1",completed: false}, (err, result) => { 
            if (err) {
                return console.log('Unable to insert todo', err);
            }

            console.log(JSON.stringify(results.ops, undefined, 2));
        });

        db.close();
    })
};