/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];


/*---------------------------- Variables (state) ----------------------------*/

let board, turn, winner

//board is referring to all the squares on the ttt board
//which turn it is
//if there is a winner
//all of these are always changing

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".board > div")
console.log(squareEls)
//Node list of all the squares. Gives you access to the board as a group, as opposed to the squares individually

const messageEl = document.getElementById("message")
console.log(messageEl)
//Displays messages for which turn it is, or who has won

const boardEl = document.querySelector('.board')

const resetBtnEl = document.querySelector("#reset-button")

//Everything you put in Cached element references, gives you access to your html

/*----------------------------- Event Listeners -----------------------------*/
resetBtnEl.addEventListener('click', init)
//When reset button is clicked, init is invoked, and we are brought back to original state.

//Bubbling -We can add an event listener to a top level object, and it can access the individual elements that are nested in the parent element.  Example: 

boardEl.addEventListener('click', handleClick)
//Event listenser has to be set to boardEls, not squareEls, since squareEls are a node list, squareEls are added in html, not JS.  
//When someone clicks on the board, then handClick is called.

/*-------------------------------- Functions --------------------------------*/
init()
//initialize the game, always put it for interaction on game

function init() {
  board = [null, null, null, null, null, null, null, null, null]
  console.log(board)
  turn = 1 //represents player X
  winner = null
  render()
}
//beginning settings of the game
//board is all nulls at the start at the game
//turn is set to 1, that is the first player to take their turn
//if winner null, no winner at the start of the game
//renders/update page to starting settings
//render function does two things
//runs every time a move is made
//accessing state variables, 
//and manipulating the html based on the state variables

function handleClick(evt) {
  console.log(evt.target)
  let sqIdx = parseInt(evt.target.id[2])
  console.log(sqIdx)
//When we click, we want to grab the idx of whatever square we click
//We then grab each of the div ids, they contain the index.
//Grab the id, then we manipilate it from string to a number
  if (isNaN(sqIdx)) {
    return 
  }
// Then we assign it to square index, the index that corresponds to both square we click on, as well as the position in the state board variable.  

  if (winner) {
    return
  }
  if (board[sqIdx]) {
    return 
  }
  board[sqIdx] = turn 

  turn = turn * -1 
  winner = getWinner()
  render()
}
//After we grab that index, we add functionality.
//We check if the still going.
//If stopped and we have a winner, we stop/leave
// If we click on a space with something in it, we need to not do anything
//If we click on a valid square, we continue with handle click function.  We set that index equal to turn.  
//after board state is set for square, we can go to the next player
//Just multiply by -1 to go to next player
//Then we set the winner.  
//Then get winnder function, see below.


function getWinner() {
  let bestCombo = []
  winningCombos.forEach(function (combo) {
    let comboValue = board[combo[0]]+ board [combo[1]] + board[combo[2]]
    //Adding up square positions, to use below to see if it equals three and there s a winner
    bestCombo.push(Math.abs(comboValue))
  })
  //Why did we use Math.abs?
//Using index to get a combo

let winnersCombo = bestCombo.some(function(value){
  return value === 3
})
  if (winnersCombo === true) {
    return turn * -1
  } else if (!board.some((value)=> value === null)){
    return 'T'
  }
  return null
}
//Checks if there is a winner, if so truthy value.  If not, the game is still ongoing, so winner will be equal to null.
//Then render, then goes through the board.
//Each time render function is called, html is changing.
//Check after every move to see if there is a winner
//winningCombos (an array of an array), looping through tuntil they get a combo of 3, which is a winner
//Each loop is a different inner array.
//We want to add the total value the combinations have in the state board variable to see if it is a winner.  It's only a winner if the wining combination totals three. 
// Compares to boards 



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
//Here, the state variable board is accessed, determining where to place an x or o, or leave it blank, value stored in board, render grabs the data to put in the correspoding html
//Checks each square to see if it is null or has a value, if it has a value it updates appropriate X, O.  
//Checks against array for status, updates square via squareEls
//Ripple effect, changes to squareEls updates the board, so it is correct for the next check

  if (winner === null) {
    if (turn === 1) {
      messageEl.textContent = "It is player 1's turn"
    } else {
      messageEl.textContent = "It is player 2's turn"
    }
    //After we render, we check if the game is still going on
    //Check if winner has been set
    //check whose turn it is, & display.
    //If finished just display who won



  } else if (winner === 'T') {
    messageEl.textContent = 'It is a tie'
  } else if (winner === 1) {
    messageEl.textContent = 'Congrats Player 1, you won!'
  } else if (winner === -1) {
    messageEl.textContent = 'Congrats Player 2, you won!'
  }
}


