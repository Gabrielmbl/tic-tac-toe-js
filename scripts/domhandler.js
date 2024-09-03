class DOMHandler {
  constructor(gameBoard) {
    this.gameBoard = gameBoard
    this.boardElement = document.getElementById('game-board')
    this.currentPlayerElement = document.querySelector('.current-player')
    this.render()
  }

  render() {
    this.clearBoard()
    this.createBoard()
  }

  clearBoard() {
    this.boardElement.innerHTML = ''
  }

  createBoard() {
    this.gameBoard.board.forEach((row, rowIndex) => {
      const rowElement = this.createRowElement(row, rowIndex)
      this.boardElement.appendChild(rowElement)
    })
  }

  createRowElement(row, rowIndex) {
    const rowElement = document.createElement('div')
    rowElement.className = 'row'

    row.forEach((cell, cellIndex) => {
      const cellElement = this.createCellElement(cell, rowIndex, cellIndex)
      rowElement.appendChild(cellElement)
    })

    return rowElement
  }

  createCellElement(cell, rowIndex, cellIndex) {
    const cellElement = document.createElement('div')
    cellElement.className = 'cell'
    cellElement.textContent = cell
    cellElement.dataset.row = rowIndex
    cellElement.dataset.column = cellIndex

    return cellElement
  }

  updateCell(row, col, symbol) {
    const cell = this.boardElement.querySelector(`[data-row="${row}"][data-column="${col}"]`)
    if (cell) {
      cell.textContent = symbol
    }
  }

  updateCurrentPlayer(playerName) {
    if (this.currentPlayerElement) {
      this.currentPlayerElement.textContent = `Current Player: ${playerName}`
    }
  }
}
