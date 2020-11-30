import React, { useRef, useState } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import "./index.css";
import {
  ADD_PLAYER_MUTATION,
  GAME_SUBSCRIPTION,
  CLEAR_PLAYERS_MUTATION,
  MAKE_MOVE_MUTATION,
} from "./utils/graphql";

import GameBoard from "./GameBoard";

function App() {
  const nameRef = useRef(null);

  const [name, setName] = useState("");

  // const { data, data: { racers } = {} } = useQuery(FETCH_RACERS_QUERY);

  const [joinGame] = useMutation(ADD_PLAYER_MUTATION, {
    onCompleted() {
      // nameRef.current.value = "";
      //setName("");
    },
    variables: { name },
  });

  const [makeMove] = useMutation(MAKE_MOVE_MUTATION);

  const [clearPlayers] = useMutation(CLEAR_PLAYERS_MUTATION);

  const { data, loading } = useSubscription(GAME_SUBSCRIPTION);

  const moveHandler = (event) => {
    event.preventDefault();
    const num = event.target.id;
    const x = num > 6 ? 2 : num > 3 ? 1 : 0;
    const y = !(num % 3) ? 2 : !((num + 1) % 3) ? 1 : 0;

    makeMove({ variables: { name, x, y } });
  };

  if (!data) return <h4>LOADING...</h4>;

  let { player1, player2, turn, board } = data.renameGame;
  board = JSON.parse(board);

  return (
    <div>
      <div className="form">
        <label htmlFor="nameInput">Name:</label>
        <input
          name="nameInput"
          ref={nameRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={joinGame} style={{ marginTop: "10px" }}>
          Register
        </button>
      </div>
      <button onClick={clearPlayers}>Start Over</button>
      {/* {!loading && JSON.stringify(data, null, 2)} */}
      {/* <ul>
        {!loading &&
          data.renameGame.players.map(({ name, id, turn }) => (
            <li key={id} style={turn ? { fontWeight: "bold" } : {}}>
              {name}
            </li>
          ))}
      </ul> */}
      {!loading && (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <h3>Player 1: {player1.name || "waiting..."}</h3>
            {turn === "player1" && <p>It's your turn!</p>}
          </div>
          <GameBoard board={board} moveHandler={moveHandler} />
          <div>
            <h3>Player 2: {player2.name || "waiting..."}</h3>
            {turn === "player2" && <p>It's your turn!</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
