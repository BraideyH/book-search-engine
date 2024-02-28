const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('@apollo/server');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const { expressMiddleware } = require('@apollo/server/express4');
const app = express();
const PORT = process.env.PORT || 3003;

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: authMiddleware,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/graphql', expressMiddleware(server));

  const _dirname = path.resolve();
  const pathBuild = path.join(_dirname, '../client/build');
  app.use(express.static(pathBuild));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  })

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server listening on port ${PORT}.`)
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
    })
  })
};
startApolloServer();