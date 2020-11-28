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
  }

  type Subscription {
    game: Game!
  }
`;
