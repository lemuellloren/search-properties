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

const joinMonster = require('join-monster');

const Owner = new graphql.GraphQLObjectType({
  name: 'Owner',
  fields: () => ({
    id: { type: graphql.GraphQLString },
    first_name: { type: graphql.GraphQLString },
    last_name: { type: graphql.GraphQLString }
  })
});

Owner._typeConfig = {
  sqlTable: 'owner',
  uniqueKey: 'id',
}

const Property = new graphql.GraphQLObjectType({
  name: 'Property',
  fields: () => ({
    property_id: { type: graphql.GraphQLString },
    street: { type: graphql.GraphQLString },
    city: { type: graphql.GraphQLString },
    state: { type: graphql.GraphQLString },
    postal_code: { type: graphql.GraphQLString },
    rent: { type: graphql.GraphQLInt }
  })
});

Property._typeConfig = {
  sqlTable: 'property',
  uniqueKey: 'property_id'
}