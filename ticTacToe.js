class PlayerO {
}

class PlayerX {
}

class TicTacToe {
  constructor() {
    this.board = [...Array(3)].map((element) => [...Array(3)]);
    this.playerX = new PlayerX();
    this.playerO = new PlayerO();
    this.currentPlayer = this.playerX;
  }

  draw = () => this.countMoves() === this.board.reduce((acc, curr) => acc + curr.length, 0) && !this.win();

  win = () => this.calculateWinner() !== undefined;

  countMoves = () => this.board.filter((element) => element !== undefined).length;

  calculateWinner = () => {
    const winningPositions = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],

      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],

      [[0, 0], [1, 1], [2, 2]],
      [[2, 0], [1, 1], [0, 2]],
    ];
    const winnerX = winningPositions.find(
      (element) => element.every((position) => this.board[position[0]][position[1]] === this.playerX),
    );
    const winnerO = winningPositions.find(
      (element) => element.every((position) => this.board[position[0]][position[1]] === this.playerO),
    );
    if (winnerX !== undefined) {
      return this.board[winnerX[0][0]][winnerX[0][1]];
    } else if (winnerO !== undefined) {
      return this.board[winnerO[0][0]][winnerO[0][1]];
    } else {
      return undefined;
    }
  };

  legalMove = (columns, rows) => this.board[columns][rows] === undefined && !this.win();

  move = (columns, rows) => {
    if (this.legalMove(columns, rows)) {
      this.board[columns][rows] = this.currentPlayer;
      this.turnPlayer();
    }
  }

  turnPlayer = () => {
    this.currentPlayer = this.currentPlayer === this.playerX ? this.playerO : this.playerX;
  }
}
