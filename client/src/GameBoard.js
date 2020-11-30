import React from "react";

const s = {
  container: {
    display: "grid",
    gridTemplateColumns: "50px 50px 50px",
    gridTemplateRows: "50px 50px 50px",
  },
  box: {},
};

function GameBoard({ board }) {
  return (
    <div style={s.container}>
      {/* <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div> */}
      {board.flatMap((num) => (
        <div key={num}>{num}</div>
      ))}
    </div>
  );
}

export default GameBoard;
