const board = document.getElementById("board");
const statusText = document.getElementById("status");
let cells = [];
let currentPlayer = "X";
let gameActive = true;

function createBoard() {
  board.innerHTML = "";
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => makeMove(i));
    board.appendChild(cell);
    cells.push(cell);
  }
  statusText.textContent = `Player ${currentPlayer}'s turn`; 
}

function makeMove(index) {
  if (!gameActive || cells[index].textContent !== "") return;

  cells[index].textContent = currentPlayer;
  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins! 🎉`; 
    gameActive = false;
  } else if (cells.every(cell => cell.textContent !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`; 
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8], 
    [0,4,8], [2,4,6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[b].textContent === cells[c].textContent
    );
  });
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`; 
  createBoard(); 

createBoard();
}
