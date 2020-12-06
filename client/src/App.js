import React, { useState } from "react";
import GameRoom from "./components/GameRoom";
import Home from "./components/Home";

function App() {
  const [gameId, setGameId] = useState("");
  const [name, setName] = useState("");

  const join = (playerData) => {
    localStorage.setItem("jwtToken", playerData.token);
    setGameId(playerData.gameId);
    setName(playerData.name);
  };

  const quit = () => {
    localStorage.removeItem("jwtToken");
    setGameId("");
    setName("");
  };

  if (gameId && name)
    return <GameRoom gameId={gameId} name={name} quit={quit} />;
  return <Home join={join} quit={quit} />;
}

export default App;
