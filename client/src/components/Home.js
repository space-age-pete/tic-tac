import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  ADD_PLAYER_MUTATION,
  // GAME_SUBSCRIPTION,
  // CLEAR_PLAYERS_MUTATION,
  // MAKE_MOVE_MUTATION,
} from "../utils/graphql";
import jwtDecode from "jwt-decode";

function Home({ join }) {
  const [name, setName] = useState("");
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
      join({ name, token, gameId: 3 });
    },
    onError: (err) => {
      setError(err.graphQLErrors?.[0]?.message);
    },
    variables: { name },
  });

  return (
    <div>
      <div className="container">
        <div>
          <h3>Join a Game:</h3>
          <label htmlFor="codeInput">4-Digit Code:</label>
          <input
            id="codeInput"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <label htmlFor="nameInput">Name:</label>
          <input
            id="nameInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <button onClick={joinGame} style={{ marginTop: "10px" }}>
            JOIN
          </button>
          <div style={{ height: "20px", margin: "25px", color: "red" }}>
            {error}
          </div>
        </div>
        <div>
          <h3>Start a New Game:</h3>
          <label htmlFor="nameInput">Name:</label>
          <input id="nameInput" />
          <br />
          <button onClick={joinGame} style={{ marginTop: "10px" }}>
            JOIN
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
