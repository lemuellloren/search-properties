const express = require('express');
const {
  graphqlHTTP
} = require('express-graphql');
const graphql = require('graphql');
const joinMonster = require('join-monster');

// connect database 
const {
  Client
} = require('pg')
const client = new Client({
  host: "localhost",
  user: "lemuellloren",
  password: "",
  database: "properties"
})
client.connect()

// define schema 
const Property = new graphql.GraphQLObjectType({
  name: 'Property',
  fields: () => ({
    id: {
      type: graphql.GraphQLString
    },
    street: {
      type: graphql.GraphQLString
    },
    city: {
      type: graphql.GraphQLString
    },
    state: {
      type: graphql.GraphQLString
    },
    postal_code: {
      type: graphql.GraphQLString
    },
    rent: {
      type: graphql.GraphQLInt
    },
    owner: {
      type: Owner,
      sqlJoin: (propertyTable, ownerTable, args) => `${propertyTable}.property_id = ${ownerTable}.id`
    }
  })
});

Property._typeConfig = {
  sqlTable: 'property',
  uniqueKey: 'id',
}

const Owner = new graphql.GraphQLObjectType({
  name: 'Owner',
  fields: () => ({
    id: {
      type: graphql.GraphQLString
    },
    first_name: {
      type: graphql.GraphQLString
    },
    last_name: {
      type: graphql.GraphQLString
    },
    properties: {
      type: graphql.GraphQLList(Property),
      sqlJoin: (ownerTable, propertyTable, args) => `${ownerTable}.id = ${propertyTable}.property_id`
    }
  })
})

Owner._typeConfig = {
  sqlTable: 'owner',
  uniqueKey: 'id',
}


const QueryRoot = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    hello: {
      type: graphql.GraphQLString,
      resolve: () => "Hello world!"
    },
    properties: {
      type: new graphql.GraphQLList(Property),
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, sql => {
          return client.query(sql)
        })
      }
    },
    property: {
      type: Property,
      args: {
        id: {
          type: graphql.GraphQLNonNull(graphql.GraphQLInt)
        }
      },
      where: (propertyTable, args, context) => `${propertyTable}.id = ${args.id}`,
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, sql => {
          return client.query(sql)
        })
      }
    },
    owners: {
      type: new graphql.GraphQLList(Owner),
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, sql => {
          return client.query(sql)
        })
      }
    },
    owner: {
      type: Owner,
      args: { id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) } },
      where: (ownerTable, args, context) => `${ownerTable}.id = ${args.id}`,
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, sql => {
          return client.query(sql)
        })
      }
    },
  })
});


const schema = new graphql.GraphQLSchema({
  query: QueryRoot,
});


const app = express();
const port = 8000;
app.use('/api', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(port);