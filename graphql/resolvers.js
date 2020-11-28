const { Game } = require("../models");

const GAME_CHANGE = "GAME_CHANGE";

module.exports = {
  Query: {
    game: async () => await Game.findOne({}),
  },
  Mutation: {
    joinGame: async (_, { name }, { pubsub }) => {
      const dbGame = await Game.findOne({});

      const id = dbGame.players.length + 1;
      const turn = id === 1 ? true : false;

      if (id === 3) return "game full";

      dbGame.players.push({ name, id, turn });

      dbGame.save();

      pubsub.publish(GAME_CHANGE, { renameGame: dbGame });
      return `You've joined the Game, ${name}!`;
    },
    clearPlayers: async (_, __, { pubsub }) => {
      const dbGame = await Game.findOne({});
      dbGame.players = [];
      dbGame.save();
      pubsub.publish(GAME_CHANGE, { renameGame: dbGame });
      return `NO MORE PLAYERS`;
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
