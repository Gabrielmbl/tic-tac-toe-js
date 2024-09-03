class Game {
  constructor(gameBoard, player1, player2) {
    this.gameBoard = gameBoard
    this.player1 = player1
    this.player2 = player2
    this.currentPlayer = player1
  }

  move(player, x, y) {
    x = parseInt(x, 10)
    y = parseInt(y, 10)
    if (this.gameBoard.board[x][y] === '') { 
      this.gameBoard.board[x][y] = player.symbol
      return true
    } else {
      false
    }
  }

  switchPlayers() {
    this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1
  }

  playGame() {
    while(!this.gameBoard.isFull() && !this.gameBoard.checkWin()) {
      this.playRound()
    }
    this.gameResults()
  }

  playRound() {
    this.gameBoard.displayOnConsole()
    console.log(`${this.currentPlayer.name}'s turn: `)
    // const x = prompt('X coordinate: ')
    // const y = prompt('Y coordinate: ')
    if (this.move(this.currentPlayer, x, y) === true) {
      this.switchPlayers()
    }
  }

  gameResults() {
    this.gameBoard.displayOnConsole()
    if (this.gameBoard.checkWin()) {
      this.switchPlayers()
      console.log(`${this.currentPlayer.name} just won the game`)
    } else {
      console.log(`It's a draw`)
    }
  }

}
