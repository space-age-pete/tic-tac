const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

const { typeDefs, resolvers } = require("./graphql");
const Game = require("./models/Game");

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect("mongodb://localhost:27017/tic-tac", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => server.listen({ port: 5000 }))
  .then((res) => {
    console.log(res.url);
    return Game.findOne({});
  })
  .then((game) => console.log(game))
  .catch((err) => console.log(err));

//notes:

//MVP:

//Forget about rooms for now?
//add later: ability to create room or join room (spectate?)
//limit array to 2 people through mongoose?
