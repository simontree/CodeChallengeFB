const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client')
  
const resolvers = {
  Query: {
    info: () => `This is the API of the Questionaire app`,
    feed: async (parent, args, context) =>{
        return context.prisma.link.findMany()
    }
  },
  Mutation: {
    post: (parent, args, context, info) => {
    let newLink = context.prisma.link.create({
        data: {
            url: args.url,
            description: args.description,
        },
    })
    return newLink
    }
  }
}

const prisma = new PrismaClient()

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
  resolvers,
  context: {
    prisma,
  }
})
server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );