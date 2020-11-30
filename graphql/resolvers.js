const { Game } = require("../models");
const { db } = require("../models/Game");

const GAME_CHANGE = "GAME_CHANGE";

module.exports = {
  Query: {
    game: async () => await Game.findOne({}),
  },
  Mutation: {
    joinGame: async (_, { name }, { pubsub }) => {
      const dbGame = await Game.findOne({});
      console.log(dbGame);
      console.log(dbGame.player1);

      if (!dbGame.player1.name) dbGame.player1 = { name };
      else if (dbGame.player1.name === name) return "choose a different name";
      else if (!dbGame.player2.name) {
        dbGame.player2 = { name };
        dbGame.turn = "player" + Math.floor(Math.random() * 2 + 1);
      } else return "game full";

      dbGame.save();

      pubsub.publish(GAME_CHANGE, { renameGame: dbGame });
      return `You've joined the Game, ${name}!`;
      //start game proper
      //gameStatus in model?
    },
    clearPlayers: async (_, __, { pubsub }) => {
      const dbGame = await Game.findOne({});
      dbGame.player1 = {};
      dbGame.player2 = {};
      dbGame.turn = "";
      dbGame.save();
      pubsub.publish(GAME_CHANGE, { renameGame: dbGame });
      return `NO MORE PLAYERS`;
    },
    makeMove: async (_, { name, x, y }, { pubsub }) => {
      const dbGame = await Game.findOne({});

      if (!dbGame.turn) return "The Game has not yet begun";
      if (dbGame[dbGame.turn].name !== name) return "It is not your turn!";

      let board = JSON.parse(dbGame.board);
      if (board[x][y]) return "already a mark there";

      board[x][y] = dbGame.turn;
      dbGame.board = JSON.stringify(board);
      dbGame.turn = dbGame.turn === "player1" ? "player2" : "player1";

      dbGame.save();
      pubsub.publish(GAME_CHANGE, { renameGame: dbGame });

      return `${name} made a move!`;
    },
  },
  Subscription: {
    renameGame: {
      subscribe: async (_, __, { pubsub }) => {
        const dbGame = await Game.findOne({});
        setTimeout(
          () => pubsub.publish(GAME_CHANGE, { renameGame: dbGame }),
          0
        );
        return pubsub.asyncIterator(GAME_CHANGE);
      },
    },
  },
};

// joinGame: async (_, { name }, { pubsub }) => {
//   const dbGame = await Game.findOne({});

//   const id = dbGame.players.length + 1;
//   const turn = id === 1 ? true : false;

//   if (id === 3) return "game full";
//   if (dbGame.players.find((p) => p.name === name))
//     return "someone else has that name";

//   //why am i using names for tic-tac-toe?
//   dbGame.players.push({ name, id, turn });

//   dbGame.save();

//   pubsub.publish(GAME_CHANGE, { renameGame: dbGame });
//   return `You've joined the Game, ${name}!`;
// },

// clearPlayers: async (_, __, { pubsub }) => {
//   const dbGame = await Game.findOne({});
//   dbGame.players = [];
//   dbGame.save();
//   pubsub.publish(GAME_CHANGE, { renameGame: dbGame });
//   return `NO MORE PLAYERS`;
// },
