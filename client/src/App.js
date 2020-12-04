import React, { useRef, useState, useEffect } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import "./index.css";
import {
  ADD_PLAYER_MUTATION,
  GAME_SUBSCRIPTION,
  CLEAR_PLAYERS_MUTATION,
  MAKE_MOVE_MUTATION,
} from "./utils/graphql";
import jwtDecode from "jwt-decode";

import GameBoard from "./GameBoard";

function App() {
  const nameRef = useRef(null);

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("this ran");
    if (error) setTimeout(() => setError(""), 1000);
  }, [error]);

  // const { data, data: { racers } = {} } = useQuery(FETCH_RACERS_QUERY);

  const [joinGame] = useMutation(ADD_PLAYER_MUTATION, {
    onCompleted({ joinGame: token }) {
      // nameRef.current.value = "";
      //setName("");
      console.log("huh????");
      console.log(token);
      console.log(jwtDecode(token));
    },
    onError: (err) => {
      setError(err.graphQLErrors?.[0]?.message);
    },
    variables: { name },
  });

  const [makeMove] = useMutation(MAKE_MOVE_MUTATION, {
    onError: (err) => {
      console.log(JSON.stringify(err));
      setError(err.graphQLErrors[0].message);
    },
  });

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

  let {
    renameGame: { player1, player2, turn, board, winner },
    renameGame,
  } = data;
  board = JSON.parse(board);

  function titleDisplay() {
    if (winner === "It's a Cat's Game!") return winner;
    if (winner) return `${winner} Wins!`;
    if (!turn) return "Waiting For Players to Join";
    if (renameGame[turn].name === name) return "Make Your Move!";
    return `It's ${renameGame[turn].name}'s Turn`;
  }

  return (
    <div style={{ textAlign: "center" }}>
      {!loading && (
        <div>
          <h1>{titleDisplay()}</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div>
              <h1>X</h1>
              <h3>{player1.name || "waiting..."}</h3>
              {player1.name === name && <p>(You)</p>}
            </div>
            <GameBoard board={board} moveHandler={moveHandler} />
            <div>
              <h1>O</h1>
              <h3>{player2.name || "waiting..."}</h3>
              {player2.name === name && <p>(You)</p>}
            </div>
          </div>
          <div style={{ height: "20px", margin: "25px", color: "red" }}>
            {error}
          </div>
        </div>
      )}

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
    </div>
  );
}

export default App;
