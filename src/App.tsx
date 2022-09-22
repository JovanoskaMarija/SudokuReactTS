import { useState } from "react"
import "./App.css"
import { compareSudoku, deepCopy, initial, solver } from "./helpers/helpers"

type InputChangeProps = {
  e: React.ChangeEvent<HTMLInputElement>
  row: number
  col: number
}

function App() {
  const [sudokuArr, setSudokuArr] = useState(initial)

  function onInputChange({ e, row, col }: InputChangeProps) {
    let val = parseInt(e.target.value) || -1,
      grid = deepCopy(sudokuArr)

    if (val === -1 || (val >= 1 && val <= 9)) {
      grid[row][col] = val
    }

    setSudokuArr(grid)
  }

  function checkSudoku() {
    let sudoku = deepCopy(initial)
    solver(sudoku)
    let compare = compareSudoku(sudokuArr, sudoku)

    if (compare.isComplete) {
      alert("You have solved Sudoku!")
    } else if (compare.isSolvable) {
      alert("Keep Going!")
    } else {
      alert("Sudoku can not be solved. Try again!")
    }
  }

  //fn to solve sudoku by navigating to each cell
  function solveSudoku() {
    let sudoku = deepCopy(initial)
    solver(sudoku)
    setSudokuArr(sudoku)
  }

  function resetSudoku() {
    let sudoku = deepCopy(initial)
    setSudokuArr(sudoku)
  }

  return (
    <div className="app">
      <div className="app-header">
        <h3>Sudoku</h3>
        <table>
          <tbody>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => {
              return (
                <tr
                  key={rIndex}
                  className={(row + 1) % 3 === 0 ? "bBorder" : ""}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cIndex) => {
                    return (
                      <td
                        key={rIndex + cIndex}
                        className={(col + 1) % 3 === 0 ? "rBorder" : ""}
                      >
                        <input
                          value={
                            sudokuArr[row][col] === -1
                              ? ""
                              : sudokuArr[row][col]
                          }
                          onChange={(e) => onInputChange({ e, row, col })}
                          className="cellInput"
                          maxLength={1}
                          disabled={initial[row][col] !== -1}
                        />
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>

        <div className="btnContainer">
          <button className="btn checkBtn" onClick={checkSudoku}>
            Check
          </button>
          <button className="btn solveBtn" onClick={solveSudoku}>
            Solve
          </button>
          <button className="btn resetBtn" onClick={resetSudoku}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
