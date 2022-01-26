'use strict'
const MINE = 'X'


var gBoard;

var gLevel = {
  size: 4,
  mines: 2
};

var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0
}


// <-------------------------------------->


function init() {
  gBoard = buildBoard()
  renderBoard()
}

function buildBoard() {
  var board = [];
  for (var i = 0; i < gLevel.size; i++) {
    board.push([]);
    for (var j = 0; j < gLevel.size; j++) {
      board[i][j] = createCell()
    }
  }

  board[1][2] = MINE
  board[2][0] = MINE

  console.table(board)
  return board;
}


function renderBoard() {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < gLevel.size; i++) {
    strHTML += `<tr>`
    for (var j = 0; j < gLevel.size; j++) {
      var cell = gBoard[i][j]
      var className = 'cell cell-';
      strHTML += '<td onclick class="'+ className + '"></td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>'

  // gLevel.mines[2][2] = MINE
  // gBoard[2][0] = MINE
  var printBoard = document.querySelector('.container-board')
  printBoard.innerHTML = strHTML

}

function createCell() {
  var cell = {
    minesAroundCount: 4,
    isShown: true,
    isMine: false,
    isMarked: true
  }

  return cell
}


// function setMines(board) {

//   for (var i = 0; i < gLevel.mines; i++) {
//     var mineOne = getRandomInt(0, board.length - 1);
//     var mineTwo = getRandomInt(0, board.length - 1);
//   }
// }