document.addEventListener('DOMContentLoaded', () => {
  const board = new GameBoard()
  const domHandler = new DOMHandler(board)
  let game

  document.getElementById('name-form').addEventListener('submit', (event) => {
    event.preventDefault()

    const player1Name = document.getElementById('player1-name').value
    const player2Name = document.getElementById('player2-name').value

    const player1 = new Player(player1Name, 'X')
    const player2 = new Player(player2Name, 'O')

    game = new Game(board, player1, player2)
    domHandler.updateCurrentPlayer(game.currentPlayer.name)
    game.playGame()
  })

  document.getElementById('game-board').addEventListener('click', (event) => {
    if (event.target.classList.contains('cell')) {
      const row = event.target.dataset.row
      const col = event.target.dataset.column

      if (game.move(game.currentPlayer, row, col)) {
        domHandler.updateCell(row, col, game.currentPlayer.symbol)
        game.switchPlayers()
        domHandler.updateCurrentPlayer(game.currentPlayer.name)
        if (game.gameBoard.checkWin()) {
          game.switchPlayers()
          alert(`${game.currentPlayer.name} wins!`)
          return
        }
        if (game.gameBoard.isFull()) {
          alert("It's a draw!")
          return
        }
      }
    }
  })
})
