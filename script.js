'use strict'
const MINE = 'x'
const FLAG = 'P'


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
  // console.log(setMinesNegsCount(gBoard, gLevel.size, gLevel.size));
  renderBoard()
}

function buildBoard() {
  var board = [];
  for (var i = 0; i < gLevel.size; i++) {
    board.push([]);
    for (var j = 0; j < gLevel.size; j++) {
      var cell = createCell()
      // setMines()
      if (i === 1 && j === 2 || i === 3 && j === 0) {
        cell.isMine = true
      }
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

      var cellClass = 'cell';
      var currCell = gBoard[i][j]
      var mindCountforCurrCell = setMinesNegsCount(i, j, gBoard)
      currCell.minesAroundCount = mindCountforCurrCell

      if (currCell.isMine) {
        cellClass += ' mine'
      }
      strHTML += `<td onclick="cellClicked(${i},${j},this)" class="${cellClass}">${currCell.innerStr} </td>`
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
    isMarked: true,
    innerStr: '',

  }
  return cell
}


function cellClicked(cellI, cellJ, element) {

  var currCell = gBoard[cellI][cellJ]
  // if (currCell.minesAroundCount === 0) return;
  if (!currCell.isMine) element.innerHTML = currCell.minesAroundCount
  if (currCell.isMine) {
    element.style.backgroundColor = 'red'
    element.innerHTML = MINE
    // element.innerHTML = currCell.minesAroundCount


  }

  console.log('elCell:', element);
}

setMines(gBoard)
function setMines(board) {
  for (let i = 0; i < gLevel.mines; i++) {
    board[i][j] = getRandomInt(0 , board.length)
    
  }
console.log(board);
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




































  // console.log('cellI:', cellI);
  // console.log('cellJ:', cellJ);

    // var mindCountforCurrCell = setMinesNegsCount(cellI, cellJ, gBoard)
    // console.log(mindCountforCurrCell);
    // currCell.minesAroundCount = mindCountforCurrCell
    // if (currCell.isMine) {
    //   setMinesNegsCount(cellI, cellJ, gBoard)

    // }


// function setMinesNegsCount(board, rowLength, colLength) {
//   var count = 0


//   for (let rowIdx = 0 ; rowIdx < rowLength; rowIdx++) {
//     for (let colIdx = 0; colIdx < colLength; colIdx++) {
//       console.log("rowIdx: ", rowIdx, "colIdx: ", colIdx)

//       if (board[rowIdx-1][colIdx] && board[rowIdx-1][colIdx].isMine) count++
//       else if (board[rowIdx-1][colIdx-1] && board[rowIdx-1][colIdx-1].isMine) count++
//       else if ()

//       board[rowIdx][colIdx].minesAroundCount = count





//       if (rowIdx - 1 < 0 || rowIdx + 1 > rowLength || colIdx - 1 < 0 || colIdx + 1 > colLength) {
//         console.log("not allowed")
//       } else {
//         var obj = board[rowIdx-1][colIdx]
//         var obj = board[rowIdx-1][colIdx-1]
//         var obj = board[rowIdx-1][colIdx+1]
//         var obj = board[rowIdx][colIdx-1]
//         var obj = board[rowIdx-1][colIdx+1]
//         var obj = board[rowIdx+1][colIdx]
//         var obj = board[rowIdx+1][colIdx-1]
//         var obj = board[rowIdx+1][colIdx+1]
//       }
//     }
//   }

