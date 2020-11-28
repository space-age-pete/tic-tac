const { Schema, model } = require("mongoose");

const GameSchema = new Schema({
  players: [
    {
      id: Number,
      name: {
        type: String,
        unique: true,
        required: true,
      },
      turn: Boolean,
    },
  ],
  //board: null,
});

module.exports = model("Game", GameSchema);
