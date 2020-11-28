const { Game } = require("../models");

module.exports = {
  Query: {
    game: async () => await Game.findOne({}),
  },
  Mutation: {
    joinGame: async (_, { name }) => {
      const dbGame = await Game.findOne({});

      const id = dbGame.players.length + 1;
      const turn = id === 1 ? true : false;

      if (id === 3) return "game full";

      dbGame.players.push({ name, id, turn });

      dbGame.save();
      return "You've joined the Game!";
    },
  },
};
