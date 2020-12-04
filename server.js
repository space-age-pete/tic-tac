const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const { typeDefs, resolvers } = require("./graphql");
const Game = require("./models/Game");

require("dotenv").config();

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect("mongodb://localhost:27017/tic-tac", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => server.listen({ port: 5000 }))
  .then((res) => {
    console.log(res.url);
    return Game.find({});
  })
  .then((game) => {
    // console.log(game);
    // game.players = [];
    // game.save();
    console.log(game);
  })
  .catch((err) => console.log(err));

//notes:

//MVP:

//Forget about rooms for now?
//add later: ability to create room or join room (spectate?)
//limit array to 2 people through mongoose?

//TODOs:
//add resign feature? or just new game in general?
//more than one game?
//jwt
//errors!!!

//thinking about games/rooms/
//cleaning up old ones? automatically delete after a game ends?
//or after a certain amount of time? or manually?
//keep track using timestamps perhaps?
//model after jackbox -- have a vip who can start/restart?
//still use 4-digit alphanumeric code?
