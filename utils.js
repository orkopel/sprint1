


function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}





// function countNegs(mat, rowIdx, colIdx) {
//     var count = 0
//     for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
//       if (i < 0 || i > mat.length - 1) continue
//       for (var j = colIdx - 1; j <= colIdx + 1; j++) {
//         if (j < 0 || j > mat[0].length - 1) continue
//         if (i === rowIdx && j === colIdx) continue
//         var currCell = mat[i][j]
//         if (currCell === '$') count++
//       }
//     }
//     return count
//   }