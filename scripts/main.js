let GameBoard = (() => {
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    return { gameBoard }
})();

let Player = (name) => {
    let turn = false;
    let winStatus = false;
    let getName = () => {
        return name;
    }
    return { name, turn, winStatus, getName }
}

let Game = (() => {
    let playerX = Player('X');
    let Player0 = Player('0');
    let gameStatus = true;
    let totalTurns = 0;

    playerX.turn = true;

    let getGameStatus = () => { return gameStatus; }

    let compareCells = (index1, index2, index3) => {
        if (GameBoard.gameBoard[index1] === GameBoard.gameBoard[index2] && GameBoard.gameBoard[index2] === GameBoard.gameBoard[index3]) {
            if (GameBoard.gameBoard[index1] === 'X') {
                playerX.winStatus = true;
                gameStatus = false;
                return playerX.name;
            }
            else if (GameBoard.gameBoard[index1] === '0') {
                Player0.winStatus = true;
                gameStatus = false;
                return Player0.name;
            }
        }
    }

    let checkWinOrDraw = () => {
        let result = compareCells(0, 1, 2);

        if (!result) {
            result = compareCells(3, 4, 5);
        }
        if (!result) {
            result = compareCells(6, 7, 8);
        }
        if (!result) {
            result = compareCells(0, 3, 6);
        }
        if (!result) {
            result = compareCells(1, 4, 7);
        }
        if (!result) {
            result = compareCells(2, 5, 8);
        }
        if (!result) {
            result = compareCells(0, 4, 8);
        }
        if (!result) {
            result = compareCells(2, 4, 6);
        }
        totalTurns++;

        if (!result && totalTurns > 8) {
            result = "Draw";
        }

        return result;
    }

    let endGame = (result) => {
        let container = document.querySelectorAll('.cell');
        container.forEach((cell, index) => {
            cell.removeEventListener('click', DisplayController.markCell)
        });
    }

    return { playerX, Player0, endGame, getGameStatus, checkWinOrDraw }

})();

let DisplayController = (() => {

    let result;
    let description = document.querySelector(".description");

    let markCell = (event) => {
        cell = event.target;
        index = cell.getAttribute("data-index");
        if (cell.textContent === "" && Game.getGameStatus()) {
            if (Game.playerX.turn) {
                cell.textContent = "X";
                GameBoard.gameBoard[index] = "X";
                Game.playerX.turn = false;
                Game.Player0.turn = true;
                description.textContent = "Player 0's turn"
            }
            else {
                cell.textContent = '0';
                GameBoard.gameBoard[index] = "0";
                Game.playerX.turn = true;
                Game.Player0.turn = false;
                description.textContent = "Player X's turn"
            }
        }
        result = Game.checkWinOrDraw()
        if (result) {
            if (result === "Draw") {
                description.textContent = "Its a Draw!";
            }
            else {
                description.textContent = `Player ${result} Won!`;
            }
            Game.endGame(result);
        }
    }

    let renderContent = () => {
        let container = document.querySelectorAll('.cell')
        container.forEach((cell, index) => {
            cell.addEventListener('click', markCell);
        });
    }
    return { renderContent, markCell }
})();

DisplayController.renderContent();