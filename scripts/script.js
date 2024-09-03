document.addEventListener('DOMContentLoaded', () => {
  const board = new GameBoard()
  const domHandler = new DOMHandler(board)
  let game

  document.getElementById('name-form').addEventListener('submit', (event) => {
    event.preventDefault()
    const { player1, player2 } = setPlayers()

    game = new Game(board, player1, player2)
    domHandler.updateCurrentPlayer(game.currentPlayer.name)
    game.playGame()
    document.getElementById('restart-button').style.display = 'block' 
    document.getElementById('game-results').textContent = ''
  })

  document.getElementById('game-board').addEventListener('click', (event) => {
    if (event.target.classList.contains('cell')) {
      const row = event.target.dataset.row
      const col = event.target.dataset.column

      if (game.move(game.currentPlayer, row, col)) {
        handleMove(domHandler, row, col, game)
        if (game.gameBoard.checkWin()) {
          return declareWinner(game)
        }
        if (game.gameBoard.isFull()) {
          return handleDraw()
        }
      }
    }
  })

  document.getElementById('restart-button').addEventListener('click', () => {
    board.resetBoard()
    domHandler.render()
    document.getElementById('game-results').textContent = ''
    document.getElementById('restart-button').style.display = 'none'

    document.getElementById('name-form').reset()
  })
})

function handleMove(domHandler, row, col, game) {
  domHandler.updateCell(row, col, game.currentPlayer.symbol)
  game.switchPlayers()
  domHandler.updateCurrentPlayer(game.currentPlayer.name)
}

function handleDraw() {
  document.getElementById('game-results').textContent = "It's a draw!"
  document.getElementById('restart-button').style.display = 'block'
  return
}

function declareWinner(game) {
  game.switchPlayers()
  document.getElementById('game-results').textContent = `${game.currentPlayer.name} wins!`
  document.getElementById('restart-button').style.display = 'block'
  return
}

function setPlayers() {
  const player1Name = document.getElementById('player1-name').value
  const player2Name = document.getElementById('player2-name').value

  const player1 = new Player(player1Name, 'X')
  const player2 = new Player(player2Name, 'O')
  return { player1, player2 }
}

