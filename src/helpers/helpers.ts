export const initial = [
  [-1, 5, -1, 9, -1, -1, -1, -1, -1],
  [8, -1, -1, -1, 4, -1, 3, -1, 7],
  [-1, -1, -1, 2, 8, -1, 1, 9, -1],
  [5, 3, 8, 6, -1, 7, 9, 4, -1],
  [-1, 2, -1, 3, -1, 1, -1, -1, -1],
  [1, -1, 9, 8, -1, 4, 6, 2, 3],
  [9, -1, 7, 4, -1, -1, -1, -1, -1],
  [-1, 4, 5, -1, -1, -1, 2, -1, 9],
  [-1, -1, -1, -1, 3, -1, -1, 7, -1],
]

export function deepCopy(arr: number[][]) {
  return JSON.parse(JSON.stringify(arr))
}

export function compareSudoku(currentSudoku, solvedSudoku) {
  let res = {
    isComplete: true,
    isSolvable: true,
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (currentSudoku[i][j] !== solvedSudoku[i][j]) {
        if (currentSudoku[i][j] !== -1) {
          res.isSolvable = false
        }
        res.isComplete = false
      }
    }
  }
  return res
}

//check num is unique in row
export function checkRow(grid: number[][], row: number, num: number) {
  return grid[row].indexOf(num) === -1
}

//check num is unique in col
export function checkCol(grid: number[][], col: number, num: number) {
  return grid.map((row) => row[col]).indexOf(num) === -1
}

//check num is unique in box
export function checkBox(
  grid: number[][],
  row: number,
  col: number,
  num: number
) {
  // get Box start index
  let boxArr: number[] = []
  let rowStart = row - (row % 3)
  let colStart = col - (col % 3)

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // get all the cell numbers and push to boxArr
      boxArr.push(grid[rowStart + i][colStart + j])
    }
  }

  return boxArr.indexOf(num) === -1
}

export function checkValid(
  grid: number[][],
  row: number,
  col: number,
  num: number
) {
  // num should be unique in row, col and 3x3 square
  if (
    checkRow(grid, row, num) &&
    checkCol(grid, col, num) &&
    checkBox(grid, row, col, num)
  ) {
    return true
  }
  return false
}

export function getNext(row: number, col: number) {
  //if col reaches 8, increase row num
  // if row reaches 8 & col reaches 8, next will be [0,0]
  // if col does not reach 8, increase col
  return col !== 8 ? [row, col + 1] : row !== 8 ? [row + 1, 0] : [0, 0]
}

//recursive fn to solve sudoku
export function solver(grid: number[][], row = 0, col = 0) {
  //if the current cell is already filled, move to the next cell
  if (grid[row][col] !== -1) {
    // for last cell, don't colve it
    let isLast = row >= 8 && col >= 8
    if (!isLast) {
      let [newRow, newCol] = getNext(row, col)
      return solver(grid, newRow, newCol)
    }
  }

  for (let num = 1; num <= 9; num++) {
    //check if this num is satisfying sudoku constraints
    if (checkValid(grid, row, col, num)) {
      // fill the num in the cell
      grid[row][col] = num

      //get next cell and repeat the function
      let [newRow, newCol] = getNext(row, col)

      if (!newRow && !newCol) {
        return true
      }

      if (solver(grid, newRow, newCol)) {
        return true
      }
    }
  }

  // if it is invalid fill with -1
  grid[row][col] = -1
  return false
}
