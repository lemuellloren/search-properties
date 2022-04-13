const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const graphql = require('graphql');

const QueryRoot = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      hello: {
        type: graphql.GraphQLString,
        resolve: () => "Hello world!"
      }
    })
  })

const schema = new graphql.GraphQLSchema({ query: QueryRoot });


const app = express();
const port = 8000;
app.use('/api', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
app.listen(port);

const { Client } = require('pg')
const client = new Client({
  host: "localhost",
  user: "lemuellloren",
  password: "",
  database: "properties"
})
client.connect()