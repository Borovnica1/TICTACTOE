const game = ((players) => {
  let currPlayer = 0;
  const gameBoardCells = document.querySelectorAll('.cell');
  
  const gameBoard = (() => {
    const gameBoardArr = [['', '', ''],
                          ['', '', ''],
                          ['', '', '']];
    let cellsOccupied = 0;
    
    const clearBoard = () => {
      gameBoardArr.forEach((row,i) => row.forEach((char, j) => gameBoardArr[i][j] = ''))
      renderGameBoard();
    };

    const markSpot = (row, col, player) => {
      gameBoardArr[row][col] = player.sym;
      cellsOccupied++;
      renderGameBoard();
    };

    const checkIfWon = (row, col, player) => {
      let cnt = 0, tempRow = 0, tempCol = 0;
      while (tempRow < 3 && tempCol < 3) {
        if (gameBoardArr[tempRow][tempCol] === player.sym) cnt++;
        tempRow++;
        tempCol++;
      }
      if (cnt === 3) return true;
      cnt = 0, tempRow = 0, tempCol = 2;
      while (tempRow < 3) {
        if (gameBoardArr[tempRow][tempCol] === player.sym) cnt++;
        tempRow++;
        tempCol--;
      }
      if (cnt === 3) return true;
      cnt = 0, tempRow = row, tempCol = 0;
      while (tempCol < 3) {
        if (gameBoardArr[tempRow][tempCol] === player.sym) cnt++;
        tempCol++;
      }
      if (cnt === 3) return true;
      cnt = 0, tempRow = 0, tempCol = col;
      while (tempRow < 3) {
        if (gameBoardArr[tempRow][tempCol] === player.sym) cnt++;
        tempRow++;
      }
      if (cnt === 3) return true;
      return false;
    };

    const renderGameBoard = () => {
      const symbols = [];
      gameBoardArr.forEach(row => row.forEach(char => symbols.push(char)));
      for (let index = 0; index < gameBoardCells.length; index++) {
        gameBoardCells[index].firstChild.textContent = symbols[index];
      }
    }
    return {
      gameBoardArr,
      checkIfWon,
      markSpot,
      clearBoard
    }
  })();
  
  gameBoardCells.forEach(cell => cell.addEventListener('click', () => {
    if (cell.firstChild.textContent.length === 0) {
      gameBoard.markSpot(cell.dataset['row'], cell.dataset['col'], players[currPlayer]);
      
      if (gameBoard.checkIfWon(cell.dataset['row'], cell.dataset['col'], players[currPlayer])) {
        const score = document.querySelector(`.player${players[currPlayer].n}__score`);
        score.textContent = `${(Number(score.textContent)+1)}`;
        gameBoard.clearBoard();
      }
      
      currPlayer = currPlayer === 1 ? 0 : 1;
    };
  }));
  
  gameBoard.clearBoard();
});


const startBtn = document.querySelector('.overlay__container--btn').addEventListener('click', () => {
  const factoryPlayer = (sym, name, n) => {
    return { sym, name, n}
  };
  const playerOne = factoryPlayer('X', document.querySelector('#player1').value, 'One');
  const playerTwo = factoryPlayer('O', document.querySelector('#player2').value, 'Two');
  const players = [playerOne, playerTwo];

  document.querySelector('.playerOne__name').textContent = playerOne.name;
  document.querySelector('.playerTwo__name').textContent = playerTwo.name;

  document.querySelector('.overlay').style.display = 'none';
  document.querySelector('.scores').style.display = 'flex';
  document.querySelector('.gameboard').style.display = 'grid';

  game(players);
});

const newGameBtn = document.querySelector('.newGame-btn').addEventListener('click', () => {
  document.querySelector(`.playerOne__score`).textContent = '0'
  document.querySelector(`.playerTwo__score`).textContent = '0'
  document.querySelector('.overlay').style.display = 'flex';
  document.querySelector('.scores').style.display = 'none';
  document.querySelector('.gameboard').style.display = 'none';
});