'use strict'
const MINE = '💣'
const FLAG = '🚩'
var faces = document.querySelector('.faces')

var gBoard;

var gLevel = {
  size: 4,
  mines: 2
};

var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
  isFirstClick: true
}
var timerShown = document.querySelector('.timer')
var timer = '000'
var min = 0
var sec = 0
var ms = 0
var isStart = true


// <-------------------------------------->


function init() {
  gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    isFirstClick: true
  }
  isStart = true
  gBoard = buildBoard()
  renderBoard()
  timerShown.innerHTML = '000'
  var timer = '000'

}



function buildBoard() {
  var board = [];
  for (var i = 0; i < gLevel.size; i++) {
    board.push([]);
    for (var j = 0; j < gLevel.size; j++) {
      var cell = createCell()
      board[i][j] = cell
    }
  }

  console.table(board)
  return board;
}

function renderBoard() {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < gLevel.size; i++) {
    strHTML += `<tr>`
    for (var j = 0; j < gLevel.size; j++) {
      var cellClass = 'cell cell';
      var currCell = gBoard[i][j]
      strHTML += `<td oncontextmenu="cellMarked(this, ${i}, ${j})" onclick="cellClicked(${i},${j},this)" class="${cellClass}-${i}-${j}">${currCell.innerStr} </td>`
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>'

  var printBoard = document.querySelector('.container-board')
  printBoard.innerHTML = strHTML

}

function createCell() {
  var cell = {

    minesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: false,
    innerStr: '',

  }
  return cell
}

function cellClicked(cellI, cellJ, element) {
  if (isStart == true) {
    counter()
    isStart = false
  }

  var clickedCell = gBoard[cellI][cellJ]
  clickedCell.isShown = true

  if (clickedCell.isMine) {
    element.style.backgroundColor = 'red'
    element.innerHTML = MINE
    stopCounter()
    showAllCells()
    faces.innerHTML = '🙁'
    return
  }

  if (gGame.isFirstClick === true) {
    for (var i = 0; i < gLevel.mines; i++) {
      setMines()
    }

    for (let i = 0; i <= gBoard.length - 1; i++) {
      for (let j = 0; j <= gBoard[i].length - 1; j++) {
        var minesCount = setMinesNegsCount(i, j, gBoard)
        var activeCell = gBoard[i][j]
        activeCell.minesAroundCount = minesCount
      }
    }
    gGame.isFirstClick = false

  }
  element.innerHTML = clickedCell.minesAroundCount
}

var flagged = true

function cellMarked(elCell, i, j) {
  window.event.preventDefault()
  var currCell = gBoard[i][j]

  if (currCell.isMarked === true) {
    currCell.isMarked = false
    elCell.innerHTML = ''
    return
  }

  currCell.isMarked = true
  elCell.innerHTML = FLAG
  if (currCell.isMine === true) {
    gGame.markedCount++
    checkGameOver()

  }
  console.log('gBoard', gBoard);
  console.log('i:', i);
  console.log('j:', j);
}



function checkGameOver() {
  console.log('inside gameOver function');
  console.log('gGame.minesCount:', gGame.markedCount);
  if (gGame.markedCount === gLevel.mines) {
    stopCounter()

    //A- UPDATE THE MODEL :
    //1) RUN ON ALL CELLS AND CHANGE isShown = TRUE
    for (var i = 0; i < gBoard.length; i++) {
      for (var j = 0; j < gBoard[i].length; j++) {
        var currCell = gBoard[i][j]
        currCell.isShown = true

      }
    }
  }
  showAllCells()
}

function showAllCells() {
  for (let i = 0; i <= gBoard.length - 1; i++) {
    for (let j = 0; j <= gBoard[i].length - 1; j++) {
      var cell = document.querySelector(`.cell-${i}-${j}`)
      var currCell = gBoard[i][j]
      console.log('currCell:', currCell);

      if (currCell.isMine === true) {
        cell.innerHTML = MINE
        cell.style.backgroundColor = 'red'

      }
      if (currCell.isShown === false && currCell.isMine === false) {
        // cell.innerHTML = currCell.minesAroundCount
        cellClicked(i, j, cell)
      }
    }

  }
}



function setMines() {
  var i = getRandomInt(0, gBoard.length - 1)
  console.log('i:', i);
  var j = getRandomInt(0, gBoard.length - 1)
  console.log('j:', j);

  var currCell = gBoard[i][j];
  currCell.isMine = true


}


function setMinesNegsCount(rowIdx, colIdx, board) {

  var minesCount = 0;
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (i === rowIdx && j === colIdx) continue;
      if (j < 0 || j >= board[i].length) continue;
      var temp = board[i][j]
      if (temp.isMine) minesCount++

    }
  }
  return minesCount;
}


function timerMs() {
  ms = ms + 1

  if (sec >= 60) {
    ms = 0
    sec = 0
    min = min + 1
  }
  document.querySelector('.timer').innerHTML =

    (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms);
}

function counter() {
  timer = setInterval(timerMs, 1000)
}

function stopCounter() {
  clearInterval(timer)
}

function smiley() {
  init()
  faces.innerHTML = '😀'

}

function changeToMedium() {
  gLevel.size = 8
  gLevel.mines = 12
  init()

  // var board = document.querySelector('.container-board')
  // buildBoard()
  // renderBoard()
}

function changeToExpert() {
  gLevel.size = 12
  gLevel.mines = 30
  init()

  var board = document.querySelector('.container-board')
  buildBoard()
  renderBoard()
}

function changeToBeginner() {
  gLevel.size = 4
  gLevel.mines = 2
  init()

  var board = document.querySelector('.container-board')
  buildBoard()
  renderBoard()

}


























