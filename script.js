const board = document.getElementById("board");
const status = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const toggleBtn = document.getElementById("toggleTheme");

let cells = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;
let vsAI = true; // toggle to true for AI play

function createBoard() {
  board.innerHTML = "";
  cells.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || cells[index]) return;

  makeMove(index, currentPlayer);
  if (vsAI && gameActive && currentPlayer === "X") {
    setTimeout(() => aiMove(), 500);
  }
}

function makeMove(index, player) {
  cells[index] = player;
  const cell = board.querySelector(`[data-index='${index}']`);
  cell.textContent = player;

  if (checkWin()) {
    status.textContent = `🎉 Player ${player} Wins!`;
    gameActive = false;
    return;
  }

  if (cells.every(c => c)) {
    status.textContent = "🤝 It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = player === "X" ? "O" : "X";
  status.textContent = `Player ${currentPlayer}'s Turn`;
}

function aiMove() {
  const available = cells.map((c, i) => c === "" ? i : null).filter(i => i !== null);
  if (available.length === 0) return;
  const index = available[Math.floor(Math.random() * available.length)];
  makeMove(index, "O");
}

function checkWin() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(pattern => {
    const [a,b,c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[b] === cells[c];
  });
}

restartBtn.onclick = () => {
  cells = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s Turn`;
  createBoard();
};

toggleBtn.onclick = () => {
  document.body.classList.toggle("dark-mode");
};

createBoard();