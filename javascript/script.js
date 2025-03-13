const ticTacToe = (() => {
  const gameboardHtml = document.querySelector('.gameboard');
  const newGameBtn = document.querySelector('.new-game');
  const winScreenHtml = document.querySelector('.win-screen');
  let board = ['', '', '', '', '', '', '', '', ''];
  let playerToggle = true;
  const playerX = 'X';
  const playerO = 'O';

  const render = () => {
    if (gameboardHtml.innerHTML === '') {
      board.forEach((value, index) => {
        const fieldHtml = document.createElement('div');
        fieldHtml.classList.add('field');
        fieldHtml.setAttribute('id', index);
        gameboardHtml.appendChild(fieldHtml);
      });
      gameboardHtml.classList.remove('hidden');
    }

    const clickField = document.querySelectorAll('.field');
    clickField.forEach((field) => {
      field.addEventListener('click', handleClick);
    });
  };

  const handleClick = (event) => {
    if (playerToggle) {
      if (board[event.target.id] === '') {
        const playerSignHtml = document.createElement('p');
        playerSignHtml.classList.add('sign');
        playerSignHtml.innerHTML = 'X';
        gameboardHtml.children[event.target.id].appendChild(playerSignHtml);
        board[event.target.id] = playerX;
        playerToggle = false;
        if (checkWinningCondition()) winScreen();
      }
    } else {
      if (board[event.target.id] === '') {
        const playerSignHtml = document.createElement('p');
        playerSignHtml.classList.add('sign');
        playerSignHtml.innerHTML = 'O';
        gameboardHtml.children[event.target.id].appendChild(playerSignHtml);
        board[event.target.id] = playerO;
        playerToggle = true;
        if (checkWinningCondition()) winScreen();
      }
    }
  };

  const checkWinningCondition = () => {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [6, 4, 2],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    for (let i = 0; i < win.length; i++) {
      let [a, b, c] = win[i];
      if (
        board[a] === playerX &&
        board[b] === playerX &&
        board[c] === playerX
      ) {
        winScreenHtml.innerHTML = `${playerX} Wins!`;
        return true;
      } else if (
        board[a] === playerO &&
        board[b] === playerO &&
        board[c] === playerO
      ) {
        winScreenHtml.innerHTML = `${playerO} Wins!`;
        return true;
      }
    }
    if (!board.includes('')) {
      winScreenHtml.innerHTML = 'Draw';
      return true;
    }
  };

  const winScreen = () => {
    if (winScreenHtml.innerHTML !== '') {
      setTimeout(() => {
        gameboardHtml.classList.add('hidden');
      }, '880');
      setTimeout(() => {
        winScreenHtml.classList.remove('hidden');
      }, '888');
    } else return;
  };

  const newGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    playerToggle = true;
    winScreenHtml.innerHTML = '';
    winScreenHtml.classList.add('hidden');
    gameboardHtml.innerHTML = '';
    render();
  };
  newGameBtn.addEventListener('click', newGame);

  return {
    render,
    newGame,
  };
})();
