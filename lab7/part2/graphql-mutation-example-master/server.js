const express = require('express'),
  graphqlHTTP = require('express-graphql'),
  schema = require('./schema.js'),
  cors = require('cors'),
  port = 3002;


const app = express();
const dev = process.env.NODE_ENV === 'development';
app.use(require('morgan')('dev'))
app.use(cors())

app.use('/graphql', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if (req.method === 'OPTIONS') {
      res.sendStatus(200);
  } else {
      next();
  }
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true 
}));

const server = app.listen(port, () => {
  console.log(`GraphQL API server running at localhost:${port}`);
});

