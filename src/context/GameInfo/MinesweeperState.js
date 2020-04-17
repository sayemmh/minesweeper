import React, { useReducer } from "react";
import MinesweeperContext from "./MinesweeperContext";
import MinesweeperReducer from "./MinesweeperReducer";

// define constants
const GRID_NUMBER_OF_ROWS = 18;
const GRID_NUMBER_OF_COLS = 22;
const GRID_NUMBER_OF_MINES = 60;

const MinesweeperState = props => {
  // Default Values
  const grid_state = {
    row_count: GRID_NUMBER_OF_ROWS,
    col_count: GRID_NUMBER_OF_COLS,
    total_mine_count: GRID_NUMBER_OF_MINES,
    display_time_clock: new Date().getTime()
  };

  const [state, new_state] = useReducer(MinesweeperReducer, grid_state);

  const set_board_clock = current_time =>
    new_state({ type: "BOARD_CLOCK", payload: current_time });

  return (
    <MinesweeperContext.Provider
      value={{
        row_count: state.row_count,
        col_count: state.col_count,
        total_mine_count: state.total_mine_count,
        display_time_clock: state.display_time_clock,
        set_board_clock
      }}
    >
      {props.children}
    </MinesweeperContext.Provider>
  );
};

export default MinesweeperState;
