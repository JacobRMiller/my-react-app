const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
// Imports the Google Cloud client library
const BigQuery = require('@google-cloud/bigquery');



// Your Google Cloud Platform project ID
const projectId = 'metacx-prototype-a-196818';

// Creates a client
const bigquery = new BigQuery({
    projectId: projectId,
});
const dataset = bigquery.dataset('metacx');
const table = dataset.table('jupiter');


table.insert({
    count: 3,
    eventDateTime: '2016-12-17T17:16:27',
    eventName: 'jupiter1',
    userid: 'jake'
}, insertHandler);



const { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    test: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {


        table.insert({
            count: 1,
            eventDateTime: "2012-04-23T18:25:43.511Z",
            eventName: "jupiter",
            userid: "jake"
        }, insertHandler);

        return 'Hello world!';
    },
    test: () => {
        return "this is jakes test";
    }
};


app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));





app.listen(3010);
console.log("server listening on port 3010");


//-
// Handling the response. See <a href="https://developers.google.com/bigquery/troubleshooting-errors">
// Troubleshooting Errors</a> for best practices on how to handle errors.
//-
function insertHandler(err, apiResponse) {
    if (err) {
        // An API error or partial failure occurred.
console.log(err.toString());
        if (err.name === 'PartialFailureError') {
            // Some rows failed to insert, while others may have succeeded.

            // err.errors (object[]):
            // err.errors[].row (original row object passed to `insert`)
            //console.log() err.errors[].errors[].reason);
            console.log(err.reason);
        }
    }
}

