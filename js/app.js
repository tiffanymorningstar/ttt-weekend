/*-------------------------------- Constants --------------------------------*/


/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".board > div")
console.log(squareEls)

const messageEl = document.getElementById("message")
console.log(messageEl)
/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/
init()
function init() {
  board = [null, null, null, null, null, null, null, null, null]
  console.log(board)
  turn = 1
  winner = 1
  render()
}

function render() {
  board.forEach(function (square, idx) {
    if (square === 1) {
      squareEls[idx].textContent = 'X'
    } else if (square === -1) {
      squareEls[idx].textContent = 'O'
    } else {
      squareEls[idx].textContent = ''

    }
  });

  if (winner === null) {
    if (turn === 1) {
      messageEl.textContent = "It is player 1's turn"
    } else {
      messageEl.textContent = "It is player 2's turn"
    }

  } else if (winner === 'T') {
    messageEl.textContent = 'It is a tie'
  } else if (winner === 1) {
    messageEl.textContent = 'Congrats Player 1, you won!'
  } else if (winner === -1) {
    messageEl.textContent = 'Congrats Player 2, you won!'

  }
}


