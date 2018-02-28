const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');


app.listen(3010);

var { graphql, buildSchema } = require('graphql');

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
    return 'Hello world!';
  },
  test: () => {
      return "this is jakes test";
  }
};

// Run the GraphQL query '{ hello }' and print out the response
//graphql(schema, '{ hello }', root).then((response) => {
 // console.log(response);
//});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));