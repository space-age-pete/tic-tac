import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  ADD_PLAYER_MUTATION,
  NEW_GAME_MUTATION,
  // GAME_SUBSCRIPTION,
  // CLEAR_PLAYERS_MUTATION,
  // MAKE_MOVE_MUTATION,
} from "../utils/graphql";
import jwtDecode from "jwt-decode";

function Home({ join }) {
  const [joinName, setJoinName] = useState("");
  const [newName, setNewName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("this ran");
    if (error) setTimeout(() => setError(""), 1000);
  }, [error]);

  const [joinGame] = useMutation(ADD_PLAYER_MUTATION, {
    onCompleted({ joinGame: token }) {
      // nameRef.current.value = "";
      //setName("");
      console.log(token);
      console.log(jwtDecode(token));
      localStorage.setItem("jwtToken", token);
      join({ name: joinName, token, gameId: 3 });
    },
    onError: (err) => {
      setError(err.graphQLErrors?.[0]?.message);
    },
    variables: { name: joinName, code },
  });

  const [newGame] = useMutation(NEW_GAME_MUTATION, {
    onCompleted({ newGame: token }) {
      // nameRef.current.value = "";
      //setName("");
      console.log(token);
      console.log(jwtDecode(token));
      localStorage.setItem("jwtToken", token);

      //should be recieving this info from backend as an object tbh
      //also need to subscribe to proper room
      join({ name: newName, token, gameId: 3 });
    },
    onError: (err) => {
      setError(err.graphQLErrors?.[0]?.message);
    },
    variables: { name: newName },
  });

  const codeInputHandler = ({ target: { value } }) => {
    if (value.length < 5) setCode(value.toUpperCase());
  };

  return (
    <div>
      <div className="container">
        <div>
          <h3>Join a Game:</h3>
          <label htmlFor="codeInput">4-Digit Code:</label>
          <input id="codeInput" value={code} onChange={codeInputHandler} />
          <label htmlFor="nameInput">Name:</label>
          <input
            id="nameInput"
            value={joinName}
            onChange={(e) => setJoinName(e.target.value)}
          />
          <br />
          <button onClick={joinGame} style={{ marginTop: "10px" }}>
            JOIN GAME
          </button>
          <div style={{ height: "20px", margin: "25px", color: "red" }}>
            {error}
          </div>
        </div>
        <div>
          <h3>Start a New Game:</h3>
          <label htmlFor="nameInput">Name:</label>
          <input id="nameInput" onChange={(e) => setNewName(e.target.value)} />
          <br />
          <button onClick={newGame} style={{ marginTop: "10px" }}>
            CREATE GAME
          </button>
          <div style={{ height: "20px", margin: "25px", color: "red" }}>
            {error}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
