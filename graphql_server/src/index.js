const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');

const resolvers = {
  Query: {
    info: () => `This is the API of the Questionaire app`,
    feed: async (parent, args, context) => {
      return context.prisma.inputdata.findMany();
    }
  },
  Mutation: {
    post: (parent, args, context, info) => {
    let newInputData = context.prisma.inputdata.create({
        data: {
            question: args.question,
            answer: args.answer,
        },
    })
    return newInputData
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