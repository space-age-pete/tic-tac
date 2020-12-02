const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const { typeDefs, resolvers } = require("./graphql");
const Game = require("./models/Game");

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
//add gameover functionality
//jwt
//errors!!!
