const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
// Imports the Google Cloud client library



const projectId = 'metacx-prototype-a-196818';
const topicName = 'projects/metacx-prototype-a-196818/topics/jupiter';

const PubSub = require(`@google-cloud/pubsub`);
const pubsub = new PubSub({
    projectId: projectId
});

const BigQuery = require('@google-cloud/bigquery');
const bigquery = new BigQuery({
    projectId: projectId,
});
const dataset = bigquery.dataset('metacx');
const table = dataset.table('jupiter');

const { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
  
  input MessageInput {
    count: Int,
    eventDateTime: String,
    eventName: String,
    userid: String
  }
  
  type Mutation {
    setMessage(input: MessageInput) : String
  }
  
`);

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {},
    setMessage: ({input}) => {

        const data = JSON.stringify(input);

        const dataBuffer = Buffer.from(data);

        pubsub
            .topic(topicName)
            .publisher()
            .publish(dataBuffer)
            .then(results => {
                const messageId = results[0];
                console.log(`Message ${messageId} published.`);
            })
            .catch(err => {
                console.error('ERROR:', err);
            });


        return "Hello MetaVerse";
    }
};


const subscriptionName = "projects/metacx-prototype-a-196818/subscriptions/sample";
//Read message from the queue and then write to big query
const subscription = pubsub.subscription(subscriptionName);
const timeout = 60;

// Create an event handler to handle messages
let messageCount = 0;
const messageHandler = message => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);

    table.insert(JSON.parse(message.data.toString('utf8')), insertHandler);

    messageCount += 1;
    message.ack();
};

// Listen for new messages until timeout is hit
subscription.on(`message`, messageHandler);
setTimeout(() => {
    subscription.removeListener('message', messageHandler);
    console.log(`${messageCount} message(s) received.`);
}, timeout * 1000);


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

