export const build_grid = (input_rows, input_cols, input_mine_count) => {
  // helper methods
  const helper_empty_grid = (input_rows, input_cols) => {
    let grid = [];
    for (let i = 0; i < input_rows; i++) {
      grid.push([]);
      for (let j = 0; j < input_cols; j++) {
        grid[i].push({
          x_cord: i,
          y_cord: j,
          uncovered: false,
          has_mine: false,
          user_flagged: false,
          adjacent_mines: 0
        });
      }
    }
    return grid;
  };

  // insert a coordinate and return the number of adjacent mines
  const helper_count_adjacent_mines = (row, col) => {
    if (grid[row][col].has_mine) {
      return;
    }
    let adjacent_mine_count = 0;
    for (let i = -1; i <= 1; i++) {
      let x = i + row;
      if (x < 0 || x >= input_rows) {
        continue;
      }
      for (let j = -1; j <= 1; j++) {
        let y = j + col;
        if (y < 0 || y >= input_cols) {
          continue;
        }
        if (grid[x][y].has_mine) {
          adjacent_mine_count++;
        }
      }
    }
    return adjacent_mine_count;
  };

  // call helpers
  let grid = helper_empty_grid(input_rows, input_cols);

  let mineCounter = 0;
  while (mineCounter < input_mine_count) {
    const r1 = Math.floor(Math.random() * input_rows);
    const c1 = Math.floor(Math.random() * input_cols);

    const cell = grid[r1][c1];
    if (!cell.has_mine) {
      grid[r1][c1] = { ...cell, has_mine: true };
      mineCounter++;
    }

    grid.map((row, i) =>
      row.map(
        (_, j) =>
          (grid[i][j] = {
            ...grid[i][j],
            adjacent_mines: helper_count_adjacent_mines(i, j)
          })
      )
    );
  }
  return grid;
};
