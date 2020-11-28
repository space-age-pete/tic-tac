import React, { useRef, useState } from "react";
// import { useQuery, useMutation } from "@apollo/client";
import "./index.css";
// import {
//   DELETE_RACER_MUTATION,
//   FETCH_RACERS_QUERY,
//   INCREMENT_RACER_WINS_MUTATION,
//   REGISTER_RACER_MUTATION,
// } from "./utils/graphql";
//please branch

function App() {
  const nameRef = useRef(null);

  const [name, setName] = useState("");

  // const { data, data: { racers } = {} } = useQuery(FETCH_RACERS_QUERY);

  // const [registerRacer] = useMutation(REGISTER_RACER_MUTATION, {
  //   onCompleted() {
  //     // nameRef.current.value = "";
  //     setCar("");
  //     setName("");
  //   },
  //   update(cache, { data }) {
  //     const existingRacers = cache.readQuery({
  //       query: FETCH_RACERS_QUERY,
  //     });
  //     console.log(existingRacers, data);
  //     //data.racers = [result.data.registerRacer, ...data.racers];
  //     cache.writeQuery({
  //       query: FETCH_RACERS_QUERY,
  //       data: { racers: [...existingRacers.racers, data.registerRacer] },
  //     });
  //   },
  //   // refetchQueries: [{ query: FETCH_RACERS_QUERY }],
  //   variables: { name, car },
  // });

  // const [winRace] = useMutation(INCREMENT_RACER_WINS_MUTATION);

  // const [killRacer, { error: killError }] = useMutation(
  //   DELETE_RACER_MUTATION,
  //   {}
  // );

  // const kill = (id) => {
  //   // let id = event.target.dataset.id;
  //   console.log(typeof id);
  //   killRacer({
  //     update(cache) {
  //       const existingRacers = cache.readQuery({
  //         query: FETCH_RACERS_QUERY,
  //       });
  //       cache.writeQuery({
  //         query: FETCH_RACERS_QUERY,
  //         data: {
  //           racers: existingRacers.racers.filter((racer) => racer.id !== id),
  //         },
  //       });
  //     },
  //     variables: { id },
  //   });
  // };

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
        <button onClick={() => ""} style={{ marginTop: "10px" }}>
          Register
        </button>
      </div>
    </div>
  );
}

export default App;
