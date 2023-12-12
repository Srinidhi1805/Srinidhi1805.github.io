const boardElement = document.getElementById('board');
let count = 0;
const squares = [];

// Create squares and add click event listener
for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.addEventListener('click', () => toggleSquare(x, y));
        boardElement.appendChild(square);
        squares.push(square);
    }
}
initializeBoard();

function toggleSquare(x, y) {
    squares[y * 5 + x].classList.toggle('is-off');
    flipAdjacentSquares(x, y);
    checkWinCondition();
    count++;
}

function flipAdjacentSquares(x, y) {
    const neighbors = [
        [x - 1, y],
        [x + 1, y],
    ];

    for (const [neighborX, neighborY] of neighbors) {
        if (neighborX >= 0 && neighborX < 5 && neighborY >= 0 && neighborY < 5) {
            squares[neighborY * 5 + neighborX].classList.toggle('is-off');
        }
    }
}

function checkWinCondition() {
    if (document.querySelectorAll('.square.is-off').length === 1 || document.querySelectorAll('.square.is-off').length === 0) {
        alert('You win!');
        document.getElementById('lastWin').innerHTML = count;
    }
}

function initializeBoard() {
    // Generate random solvable configuration using backtracking
    let isSolvable = false;
    while (!isSolvable) {
        // Reset board to all white
        for (const square of squares) {
            square.classList.remove('is-off');
        }

        // Simulate random clicks until a solution is found
        const simulatedClicks = [];
        while (simulatedClicks.length < 100) {
            const randomX = Math.floor(Math.random() * 5);
            const randomY = Math.floor(Math.random() * 5);
            simulatedClicks.push([randomX, randomY]);
            count = 0;
            toggleSquare(randomX, randomY);
        }

        // Check if the final configuration is solvable
        isSolvable = isBoardSolved(squares);
    }
}

function isBoardSolved(board) {
    return board.every(row => row.every(cell => cell === 0));
}