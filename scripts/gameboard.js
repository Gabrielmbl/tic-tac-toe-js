class GameBoard {
  constructor() {
    this.board= [
      ['','',''],
      ['','',''],
      ['','','']
    ]
  }

  displayOnConsole() {
    this.board.forEach(row => {
      console.log(row.join('  |  '))
      console.log('-------------')
    })
  }

  isFull() {
    return !this.board.some(row => row.some(cell => cell === ''))
  }

  checkWin() {
    const board = this.board

    if (this.checkRows(board) || this.checkColumns(board) || this.checkDiagonals(board)) {
      return true
    }

    return false
  }

  checkRows(board) {
    for (let row of board) {
      if (row.every(cell => cell === 'X') || row.every(cell => cell === 'O')) {
        return true
      }
    }
  }

  checkColumns(board) {
    for (let i = 0; i < 3; i++) {
      if (board.every(row => row[i] === 'X') || board.every(row => row[i] === 'O')) {
        return true
      }
    }
  }

  checkDiagonals(board) {  
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && (board[0][0] === 'X' || board[0][0] === 'O')) {
      return true
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && (board[0][2] === 'X' || board[0][2] === 'O')) {
      return true
    }

  }

}