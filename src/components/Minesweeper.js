import React, { useState, useEffect, useContext, Fragment } from "react";
import MinesweeperContext from "../context/MinesweeperContext";
import Cell from "./Cell";
import "./Minesweeper.css";
import { cell_size } from "./constants";
import { build_grid } from "./functions/build_grid";
import DisplayMessage from "./DisplayMessage";
import { faSmile, faFrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Minesweeper = () => {
  const context = useContext(MinesweeperContext);
  const {
    row_count,
    col_count,
    total_mine_count,
    display_time_clock
  } = context;
  const [grid, set_grid] = useState([]);
  const [game_active, end_game] = useState(false);
  const [flags_left, set_flags_left] = useState(total_mine_count);
  const [mines_identified, set_mines_identified] = useState();
  const [message, trigger_message] = useState(null);

  useEffect(() => {
    (() => {
      set_grid(build_grid(row_count, col_count, total_mine_count));
      set_flags_left(total_mine_count);
      set_mines_identified(0);
      end_game(false);
      trigger_message(null);
    })();
  }, [row_count, col_count, total_mine_count, display_time_clock]);

  useEffect(() => {
    if (mines_identified === total_mine_count) {
      display_alert("You won!");
      end_game(true);
    }
  }, [mines_identified, total_mine_count]);

  const helper_game_over = () => {
    let cur_grid = [...grid];
    return cur_grid.map(r =>
      r.map(rc => {
        let mines_not_flagged = rc.has_mine && !rc.user_flagged;
        let flagged_not_mine = rc.user_flagged && !rc.has_mine;
        if (mines_not_flagged || flagged_not_mine) {
          return { ...rc, uncovered: true };
        } else {
          return rc;
        }
      })
    );
  };

  const display_alert = (header, timeout) => {
    trigger_message({
      header
    });
    if (timeout > 0) {
      setTimeout(() => trigger_message(null), timeout);
    }
  };

  const go_uncover_adjacent = (grid, x, y) => {
    for (let i = -1; i <= 1; i++) {
      let x_cord = x + i;
      if (x_cord < 0 || x_cord >= row_count) {
        continue;
      }
      for (let j = -1; j <= 1; j++) {
        let y_cord = y + j;
        if (y_cord < 0 || y_cord >= col_count) {
          continue;
        }
        let cur = grid[x_cord][y_cord];
        if (!cur.uncovered && !cur.has_mine && !cur.user_flagged) {
          uncover_cur_cell(cur.x_cord, cur.y_cord);
        }
      }
    }
    return grid;
  };

  const handle_grid_click = (event, x, y) => {
    if (event.shiftKey) {
      place_flag(x, y);
      return;
    }
    const cur = grid[x][y];
    if (game_active || cur.uncovered || cur.user_flagged) {
      return;
    }
    if (cur.has_mine) {
      set_grid(helper_game_over());
      display_alert("You set off a bomb");
      end_game(true);
      return;
    }
    if (!cur.user_flagged) {
      uncover_cur_cell(x, y);
    }
  };

  const place_flag = (row, col) => {
    let cur_grid = [...grid];
    const cur = cur_grid[row][col];
    if (cur.user_flagged) {
      set_flags_left(flags_left + 1);
      if (cur.has_mine) {
        set_mines_identified(mines_identified - 1);
      }
    } else {
      if (flags_left > 0) {
        set_flags_left(flags_left - 1);
        if (cur.has_mine) {
          set_mines_identified(mines_identified + 1);
        }
      } else {
        display_alert("You have no more flags left", 2500);
        return;
      }
    }
    cur_grid[row][col].user_flagged = !cur_grid[row][col].user_flagged;
    set_grid(cur_grid);
  };

  const uncover_cur_cell = (r, c) => {
    let cur_grid = [...grid];
    let cur = cur_grid[r][c];
    cur.uncovered = true;
    if (cur.adjacent_mines === 0) {
      cur_grid = go_uncover_adjacent(cur_grid, cur.x_cord, cur.y_cord);
    }
    set_grid(cur_grid);
  };

  const make_grid = () =>
    grid.map((row, i) =>
      row.map((cell, j) => (
        <div key={`${i},${j}`}>
          <Cell
            x_cord={i}
            y_cord={j}
            has_mine={cell.has_mine}
            adjacent_mines={cell.adjacent_mines}
            uncovered={cell.uncovered}
            user_flagged={cell.user_flagged}
            clickHandler={handle_grid_click}
          />
        </div>
      ))
    );

  const restart_game = e => {
    e.preventDefault();
    context.set_board_clock(new Date().getTime());
  };
  return (
    <div>
      <form onSubmit={restart_game}>
        {!game_active ? (
          <button className="btn btn-warning" size="lg" type="submit">
            <FontAwesomeIcon icon={faSmile} />
          </button>
        ) : (
          <button className="btn btn-warning" type="submit">
            <FontAwesomeIcon icon={faFrown} />
          </button>
        )}
      </form>
      <Fragment>
        <div
          className="mine_grid"
          style={{
            gridTemplateColumns: `repeat(${col_count}, ${cell_size}px)`
          }}
        >
          {make_grid()}
        </div>
        <DisplayMessage message={message} />
      </Fragment>
    </div>
  );
};

export default Minesweeper;
