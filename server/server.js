const express = require('express')
const graphqlHTTP = require('express-graphql')
const graphql = require('graphql')

const QueryRoot = new graphql.GraphQLInputObjectType({
    name: 'Query',
    fields: () => ({
        hello: {
            type: graphql.GraphQLString,
            resolve: () => 'Hello World!'
        }
    }) 
})