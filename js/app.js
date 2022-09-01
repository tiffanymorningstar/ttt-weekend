/*-------------------------------- Constants --------------------------------*/


/*---------------------------- Variables (state) ----------------------------*/
let board

turn, winner
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelector(".board > div")
console.log(squareEls)

const messageEl = document.querySelector("message")
console.log(messageEl)
/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/
init()
function init() {
  board = [null, null, null, null, null, null, null, null, null]
  console.log(board)
  turn = 1
  winner = null
  render()
}