const MATRIXSIZE = 9;
const SMALLSQUARESIZE = 3;

module.exports = function solveSudoku(matrix) {
  // your solution
    let indexes = checkSudokuIsSolved(matrix);
    if (indexes.length === 0){
        return matrix;
    }
    for (let n = 1; n <= MATRIXSIZE; n++){
        if(checkLinesColumnsAndBlocks(matrix, n, indexes[0], indexes[1])){
            matrix[indexes[0]][indexes[1]] = n;
            if (solveSudoku(matrix)){
                return matrix;
            }
            matrix[indexes[0]][indexes[1]] = 0;
        }
    }
    return 0;
}

function checkSudokuIsSolved(matrix) {
    let indexes = [];
    for (let i = 0; i < MATRIXSIZE; i++) {
        for (let j = 0; j < MATRIXSIZE; j++) {
            if (matrix[i][j] === 0) {
                indexes.push(i);
                indexes.push(j);
                return indexes;
            }
        }
    }
    return indexes;
}

function checkLinesColumnsAndBlocks(matrix, number, lineIndex, columnIndex){
    if(checkLines(matrix, number, lineIndex) && checkColumns(matrix, number, columnIndex) &&
    checkSmallSquares(matrix, number, lineIndex - lineIndex % SMALLSQUARESIZE,
                                                            columnIndex - columnIndex % SMALLSQUARESIZE)){
        return true;
    }
    return false;
}

function checkLines(matrix, number, lineIndex){
    if (matrix[lineIndex].indexOf(number) >= 0) {
        return false;
    }
    return true;
}

function checkColumns(matrix, number, columnIndex){
    for(let i = 0; i < MATRIXSIZE; i++){
        if(matrix[i][columnIndex] === number){
            return false;
        }
    }
    return true;
}

function checkSmallSquares(matrix, number, lineIndex, columnIndex) {
    for (let i = 0; i < SMALLSQUARESIZE; i++) {
        for (let j = 0; j < SMALLSQUARESIZE; j++) {
            if (matrix[i + lineIndex][j + columnIndex] === number) {
                return false;
            }
        }
    }
    return true;
}
