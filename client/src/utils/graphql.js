import { gql } from "@apollo/client";

//QUERIES:

export const FETCH_RACERS_QUERY = gql`
  query {
    racers {
      name
      car
      id
      wins
    }
  }
`;

//MUTATIONS:

export const ADD_PLAYER_MUTATION = gql`
  mutation addPlayer($name: String!) {
    joinGame(name: $name)
  }
`;

export const INCREMENT_RACER_WINS_MUTATION = gql`
  mutation winRace($id: ID!) {
    winRace(id: $id) {
      id
      name
      car
      wins
    }
  }
`;

export const CLEAR_PLAYERS_MUTATION = gql`
  mutation {
    clearPlayers
  }
`;

//SUBSCRIPTIONS:

export const GAME_SUBSCRIPTION = gql`
  subscription {
    renameGame {
      id
      player1 {
        name
      }
      player2 {
        name
      }
      turn
    }
  }
`;
