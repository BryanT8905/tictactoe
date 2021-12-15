

const gameboardModule = (() => {
	let gameStateArray = ["", "", "", "", "", "", "", "", ""];
	const getBoard = document.getElementById('board');
	const getCells = document.querySelectorAll('.cell');
	const boardCells= Array.from(getCells);

	const hideBoard = () => getBoard.classList.add("hidden");
	const displayBoard = () => getBoard.classList.remove("hidden");

	const winningCombination = [

		[0, 1, 2],
    	[3, 4, 5],
    	[6, 7, 8],
    	[0, 3, 6],
   		[1, 4, 7],
   		[2, 5, 8],
    	[0, 4, 8],
    	[2, 4, 6]
	]

	hideBoard();

	return{gameStateArray,getBoard,getCells,boardCells, hideBoard, displayBoard, winningCombination}

})();

const playerFactory = (name) => {
	return {name}
}

//module to start the game
const playGame = (() => {
   	const firstPlayerName = document.getElementById("P1Name");
   	const secondPlayerName = document.getElementById("P2Name");
   	const input1 = document.getElementById('input1');
   	const input2 = document.getElementById('input2');
   	const input3 = document.getElementById('input3');
   	const playerInfo = document.getElementById("playerturn");
   	let rules = document.getElementById("rules");
   	let playerX;
	let playerO;
	let nextPlayerName;
   	let currentPlayer = "X"
   	const board = gameboardModule;

	const updatebtn = document.getElementById('btn1')
	const restartbtn =  document.getElementById('restart')
	restartbtn.classList.add('hidden')

//dsiplays which player's turn 
	const addPlayerName = () => {
		const playerInput = document.getElementById('playerInput');
		playerX = playerFactory(firstPlayerName.value);
		playerO = playerFactory(secondPlayerName.value);
		
		displayPlayerInput()
		playerInput.remove()
		board.displayBoard()
		addClick()
		input3.innerHTML = `${playerX.name}, you're up first`;
		nextPlayerName = playerX.name;

	}
// display the names of each player
	const displayPlayerInput = () => {
    	input1.innerHTML = `Player 1: ${playerX.name}`;
    	input2.innerHTML = `Player 2: ${playerO.name}`;
    }  
	

	updatebtn.addEventListener("click", function(){
		const firstPlayer = document.getElementById("P1Name");
   		const secondPlayer = document.getElementById("P2Name");
   	//if nothing is entered in either of the name fields, the execution of the function stops
   		if(firstPlayer.value===""|| secondPlayer.value===""){
   			alert("Please enter a name to play")
   			return;
   		}
   		addPlayerName()
   		restartbtn.classList.remove('hidden')
		})
	 

    const switchPlayer = () => {
    	playerX = playerFactory(firstPlayerName.value);
		playerO = playerFactory(secondPlayerName.value);
		//check winner before switching players
		selectWinner()
    	currentPlayer = currentPlayer==="X" ? "O":"X";
    	nextPlayerName = nextPlayerName===playerX.name ? playerO.name:playerX.name;
   		input3.innerHTML = `${nextPlayerName}, it's your turn`;	
    }
//when player clicks a cell
    const cellClick = (e) => {
    	let clickedCell = e.target;
    	let cellIndex = parseInt(clickedCell.getAttribute("data-cell-index"))
    	clickedCell.textContent = currentPlayer;
    	board.gameStateArray[cellIndex] = currentPlayer
    	switchPlayer()
    	clickedCell.classList.add('pointerEvent')
    	
    }
//add click event to each cell
    const addClick = () => {
    	Array.from(board.getCells).forEach(function(cell){
    		cell.addEventListener("click", cellClick)
    	})

    }
//array destructuring to select winner
    const selectWinner = () => {
    	for (const win of board.winningCombination) {
    		const [a,b,c] =win;
    		if(board.gameStateArray[a] !="" && board.gameStateArray[a]=== board.gameStateArray[b]&& board.gameStateArray[b]===board.gameStateArray[c]){
    			board.boardCells[a].classList.add('shade')
    			board.boardCells[b].classList.add('shade')
    			board.boardCells[c].classList.add('shade')
    			displayWinningMessage()
    			disableCells()
    			break;	
    		
			}
			
    	}
    //handle draw
    	let full = true;
    	for(let i = 0; i<=8; i++){
    		if(board.gameStateArray[i] === ""){
    			full = false
    		}
    	}
    	if(full === true){
    		displayDrawMessage()
    	}

    	console.log(board.gameStateArray)
    		
	}

	const displayDrawMessage = () => {
    	playerInfo.classList.add('hidden');
    	rules.textContent = "It's a tie!!"	
	}


    const displayWinningMessage = () => {
    	playerInfo.classList.add('hidden');
    	let player1 = playerFactory(firstPlayerName.value);
    	let player2 = playerFactory(secondPlayerName.value);
    	
    	if(currentPlayer ==="X"){
    		rules.innerHTML = `${player1.name} wins!!`
    		
    	}else if(currentPlayer ==="O"){
    		rules.innerHTML = `${player2.name} wins!!`
    	} 
       	
    }
//disables all cells on the board after a player wins
    const disableCells = () => {
    	board.boardCells.forEach((cell) => {
    		cell.classList.add('pointerEvent')
    	})
    }

    

const restartGame = () => {
	board.gameStateArray = ["", "", "", "", "", "", "", "", ""]
	board.boardCells.forEach((cell) => {
    		cell.textContent = "";
			cell.classList.remove('pointerEvent')
			cell.classList.remove('shade')	
    	})
    	playerInfo.classList.remove('hidden');
    	rules.innerHTML = "Player 1 is 'X' and Player 2 is 'O'"
    	
    
    }
    restartbtn.addEventListener("click", restartGame)
    
     

	
})();












