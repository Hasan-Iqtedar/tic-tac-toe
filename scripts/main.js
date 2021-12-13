let GameBoard = (() => {

    let gameBoard = ['X', 'X', '0', '0', 'X', 'X', '0', 'X', 'X'];
    return { gameBoard }

})();

let Player = (name) => {

    let turn = false;

    let getName = () => {
        return name;
    }

    let markCell = () => {

    }

    return { name, turn, getName }
}

let DisplayController = (() => {

    let playerX = Player('X');
    let Player0 = Player('0');
    let gameStatus;

    playerX.turn = true;

    let renderContent = () => {
        let container = document.querySelectorAll('.cell')
        container.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                if (cell.textContent === "") {
                    if (playerX.turn) {
                        cell.textContent = "X";
                        playerX.turn = false;
                        Player0.turn = true;
                    }
                    else {
                        cell.textContent = '0';
                        playerX.turn = true;
                        Player0.turn = false;
                    }
                }
            });
        });

    }

    return { renderContent }

})();

DisplayController.renderContent()