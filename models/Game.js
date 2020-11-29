const { Schema, model } = require("mongoose");

const GameSchema = new Schema({
  // players: [
  //   {
  //     id: Number,
  //     name: {
  //       type: String,
  //       unique: true,
  //       //not really working, more validation needed
  //       required: true,
  //     },
  //     turn: Boolean,
  //   },
  // ],
  player1: {
    name: {
      type: String,
      unique: true,
      // required: true,
    },
    turn: Boolean,
  },
  player2: {
    name: {
      type: String,
      unique: true,
      // required: true,
    },
    turn: Boolean,
  },
  turn: {
    type: String,
    default: "player1",
  },
  //board: null,
});

module.exports = model("Game", GameSchema);

//INSTEAD of having an array of 2 players, maybe have 2 separate objects?
//I'll try it out but array may be better for scatman
