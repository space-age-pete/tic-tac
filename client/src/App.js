import React, { useRef, useState } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import "./index.css";
import {
  ADD_PLAYER_MUTATION,
  GAME_SUBSCRIPTION,
  CLEAR_PLAYERS_MUTATION,
} from "./utils/graphql";
//please branch

function App() {
  const nameRef = useRef(null);

  const [name, setName] = useState("");

  // const { data, data: { racers } = {} } = useQuery(FETCH_RACERS_QUERY);

  const [joinGame] = useMutation(ADD_PLAYER_MUTATION, {
    onCompleted() {
      // nameRef.current.value = "";
      setName("");
    },
    variables: { name },
  });

  const [clearPlayers] = useMutation(CLEAR_PLAYERS_MUTATION);

  const {
    // data: { renameGame },
    data,
    loading,
  } = useSubscription(GAME_SUBSCRIPTION);

  // if (!data) return null;
  // if (killError) {
  //   console.log(killError);
  //   return null;
  // }

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
      {/* {!loading && JSON.stringify(data.renameGame, null, 2)} */}
      <ul>
        {!loading &&
          data.renameGame.players.map(({ name, id, turn }) => (
            <li key={id} style={turn ? { fontWeight: "bold" } : {}}>
              {name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
