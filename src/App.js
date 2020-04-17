import React from "react";
import Minesweeper from "./components/Minesweeper";
import MinesweeperState from "./context/GameInfo/MinesweeperState";
import "./App.css";

const App = () => {
  return (
    <div className="header">
      <MinesweeperState>
        <div className="container text-center">
          <Minesweeper />
        </div>
      </MinesweeperState>
      <div className="instructions">
        Rules - hold shift key and click to flag a mine. You will not be able to
        flag more than 75 mines.
      </div>
    </div>
  );
};

export default App;
