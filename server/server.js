const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');

const QueryRoot = new graphql.GraphQLInputObjectType({
    name: 'Query',
    fields: () => ({
        hello: {
            type: graphql.GraphQLString,
            resolve: () => 'Hello World!'
        }
    }) 
});

const schema = new graphql.GraphQLSchema({ query: QueryRoot })

const app = express();
const port = 4000;
app.use('/api', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
app.listen(port);