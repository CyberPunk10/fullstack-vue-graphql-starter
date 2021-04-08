const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

// import typeDefs and resolvers
const filePath = path.join(__dirname, 'typeDefs.gql')
const typeDefs = fs.readFileSync(filePath, 'utf-8')
const resolvers = require('./resolvers')

// import Environment Variables and Mongoose models
require('dotenv').config({ path: '.env' })
const User = require('./models/User')
const Post = require('./models/Post')

// Connect to mongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(console.log('MongoDB connected...'))
  .catch(error => console.error('MongoDB disconnected...', error))

// Create Apollo/GraphQl server using typeDefs, resolvers and context object
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
})

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`)
})
