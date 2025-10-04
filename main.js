import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const statusDisplay = document.getElementById('status');
  const restartButton = document.getElementById('restart-button');
  const cells = document.querySelectorAll('.cell');

  let currentPlayer = 'X';
  let boardState = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const winningMessage = () => `Player ${currentPlayer} has won!`;
  const drawMessage = () => `Game ended in a draw!`;
  const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;

  const handleCellPlayed = (clickedCell, clickedCellIndex) => {
    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
  };

  const handlePlayerChange = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = currentPlayerTurn();
  };

  const handleResultValidation = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
      const winCondition = winningConditions[i];
      const a = boardState[winCondition[0]];
      const b = boardState[winCondition[1]];
      const c = boardState[winCondition[2]];
      if (a === '' || b === '' || c === '') {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      statusDisplay.textContent = winningMessage();
      gameActive = false;
      return;
    }

    const roundDraw = !boardState.includes('');
    if (roundDraw) {
      statusDisplay.textContent = drawMessage();
      gameActive = false;
      return;
    }

    handlePlayerChange();
  };

  const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (boardState[clickedCellIndex] !== '' || !gameActive) {
      return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
  };

  const handleRestartGame = () => {
    gameActive = true;
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = currentPlayerTurn();
    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('x', 'o');
    });
  };

  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  restartButton.addEventListener('click', handleRestartGame);

  statusDisplay.textContent = currentPlayerTurn();
});
