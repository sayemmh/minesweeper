import React from "react";
import "./Cell.css";
import { cell_size } from "./constants";
import { faCircle, faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cell = ({
  x_cord,
  y_cord,
  has_mine,
  adjacent_mines,
  uncovered,
  user_flagged,
  clickHandler
}) => {
  const helper_paint_cell = () => {
    if (has_mine) {
      return (
        <p>
          <FontAwesomeIcon icon={faCircle} />
        </p>
      );
    } else if (adjacent_mines > 0) {
      return <i>{adjacent_mines}</i>;
    }
    return null;
  };

  return (
    <div
      className={`grid_cell btn-light`}
      style={{
        width: cell_size,
        height: cell_size
      }}
    >
      <span>{helper_paint_cell()}</span>
      <button
        className="clickable btn-dark"
        onClick={e => clickHandler(e, x_cord, y_cord)}
        style={{
          cursor: "auto",
          opacity: uncovered ? 0 : 1,
          display: "block"
        }}
      >
        {user_flagged ? (
          <p>
            <FontAwesomeIcon className="redflag" icon={faFlag} />{" "}
          </p>
        ) : null}
      </button>
    </div>
  );
};

export default Cell;
