import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Die from "./components/Die";
import "./App.css";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rollsNeeded, setRollsNeeded] = useState(0);

  useEffect(() => {
    const firstVal = dice[0].value;
    const allHeld = dice.every((die) => die.held);
    const allSame = dice.every((die) => die.value === firstVal);
    if (allHeld && allSame) {
      setTenzies(true);
    }
  }, [dice]);

  function allNewDice() {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      const newDie = {
        value: getRandomValue(),
        id: i + 1,
        held: false,
      };
      newArray.push(newDie);
    }
    return newArray;
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((oldDie) => {
        return oldDie.id === id ? { ...oldDie, held: !oldDie.held } : oldDie;
      })
    );
  }

  function rollUnHeldDice() {
    setRollsNeeded(rollsNeeded + 1);
    console.log(rollsNeeded);
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die, index) =>
          die.held
            ? die
            : { value: getRandomValue(), id: index + 1, held: false }
        )
      );
    } else {
      setDice(allNewDice());
      setRollsNeeded(0);
      setTenzies(false);
    }
  }

  function getRandomValue() {
    return Math.ceil(Math.random() * 6);
  }

  const diceElements = dice.map((die) => (
    <Die key={die.id} {...die} hold={() => holdDice(die.id)} />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="game-info">
        <h1>Tenzies</h1>
        <p>
          {tenzies ? (
            <p>Finished in {rollsNeeded} rolls</p>
          ) : (
            <p>
              Roll until all dice are the same. Click each die to freeze it at
              its current value between rolls.
            </p>
          )}
        </p>
      </div>

      <div className="dice-grid">{diceElements}</div>
      <button onClick={rollUnHeldDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
