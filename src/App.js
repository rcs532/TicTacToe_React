import "./App.css";
import React, { useState, useEffect } from "react";

const init = [];

function App() {
  const [matrix, setMatrix] = useState(init);
  const [matrixSize, setMatrixSize] = useState(3);
  const [currentPlayer, setCurrentPlayer] = useState("o");
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [winner, setWinner] = useState(false);

  const [reset, setReset] = useState(false);

  useEffect(() => {
    setWinner(false);
    setSelectedColumn(null);
    setSelectedRow(null);
    const row = new Array(matrixSize).fill(null);
    const tempMatrix = [];
    for (let i = 0; i < matrixSize; i++) {
      tempMatrix.push([...row]);
    }
    setMatrix(tempMatrix);
  }, [reset]);

  function squareClick(r, c) {
    console.log(r, c);
    if (!matrix[r][c] && !winner) {
      //si no tiene nada adentro y no hay ganador todavia
      setSelectedColumn(c);
      setSelectedRow(r);
      let nextPlayer = currentPlayer === "x" ? "o" : "x"; //si es x lo cambio a o y al reves
      setCurrentPlayer(nextPlayer); //seteo el nextPLayer
      const matrixCopy = [...matrix]; //hago una copia de la matrix
      matrixCopy[r][c] = nextPlayer; //pongo el simbolo del nextPLayer
      setMatrix(matrixCopy); //seteo la matrix
    }
  }
  function isWinner() {
    let vertical = true;
    let horizontal = true;
    let diagonal1 = true;
    let diagonal2 = true;
    if (selectedColumn == null || selectedRow == null) {
      return;
    }
    for (let i = 0; i < matrixSize; i++) {
      if (matrix[i][selectedColumn] !== currentPlayer) {
        vertical = false;
      }
      if (matrix[selectedRow][i] !== currentPlayer) {
        horizontal = false;
      }
      if (matrix[i][i] !== currentPlayer) {
        diagonal1 = false;
      }
      if (matrix[i][matrixSize - i - 1] !== currentPlayer) {
        diagonal2 = false;
      }
    }
    if (vertical || horizontal || diagonal1 || diagonal2) {
      setWinner(true);
    }
  }

  useEffect(() => {
    //cada vez que se renderiza algo chequea por un winner
    if (!winner) {
      isWinner();
    }
  });

  function resetGame() {
    setReset(!reset);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic Tac Toe</h1>
        <button onClick={resetGame}>Reset Game</button>
        <div>
          {matrix.map((val, c) => (
            <div className="c">
              {val.map((val1, r) => (
                <div
                  onClick={() => {
                    squareClick(r, c);
                  }}
                  className="r"
                >
                  {matrix[r][c]}
                </div>
              ))}
            </div>
          ))}
        </div>
        <h2>{winner ? `Player ${currentPlayer} is the winner` : ""}</h2>
      </header>
    </div>
  );
}

export default App;
