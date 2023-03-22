import React from "react";

function Dice(props) {
  const styles = {
    backgroundColor: props.held ? "#59E391" : "white",
  };

  return (
    <div className="die" style={styles} onClick={props.hold}>
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}

export default Dice;