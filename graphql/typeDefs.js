const { gql } = require("apollo-server");

module.exports = gql`
  type Player {
    id: ID!
    name: String!
    turn: Boolean!
  }

  type Game {
    id: ID!
    players: [Player]
  }

  type Query {
    game: Game
  }

  type Mutation {
    joinGame(name: String!): String!
    clearPlayers: String!
  }

  type Subscription {
    renameGame: Game!
  }
`;

//have subscription take in room/game id as a variable/parameter so it
//knows which room to watch
