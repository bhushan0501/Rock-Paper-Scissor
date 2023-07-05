let yourScore = 0;
let computerScore = 0;
let result = ''

// function getComputerChoice() {
//     const choices = ['rock', 'paper', 'scissors'];
//     return choices[Math.floor(Math.random() * choices.length)];
// }

function game(playerChoice, computerSelection) {
    // let computerSelection = getComputerChoice();  

    if (playerChoice === computerSelection) {
        result = 'Tie'
    }
    if (playerChoice === 'rock' && computerSelection === 'paper') {
        computerScore++
        result = 'Computer'
    }
    if (playerChoice === 'rock' && computerSelection === 'scissors') {
        yourScore++
        result = 'Player'
    }
    if (playerChoice === 'scissors' && computerSelection === 'rock') {
        computerScore++
        result = 'Computer'
    }
    if (playerChoice === 'scissors' && computerSelection === 'paper') {
        yourScore++
        result = 'Player'
    }
    if (playerChoice=== 'paper' && computerSelection === 'rock') {
        yourScore++
        result = 'Player'
    }
    if (playerChoice === 'paper' && computerSelection === 'scissors') {
        computerScore++
        result = 'Computer'
    }

    updateScoreMessage(result, playerChoice, computerSelection)
    

    // if(result === 'Player Wins!') {
    //     playerScore = playerScore + 1;
    // }
    // else if (result === 'Computer Wins!') {
    //     computerScore = computerScore + 1;
    // }
    // else {
    //     tie = tie + 1;
    // }
}

// for (let i=0; i<5; i++) {
//     game();
// }

function getRandomChoice() {
    let randomNumber = Math.floor(Math.random() * 3)
        switch (randomNumber) {
            case 0:
            return 'rock'
            case 1:
            return 'paper'
            case 2:
            return 'scissors'
        }
}

function isGameOver() {
    return yourScore === 5 || computerScore === 5
}

// UI

const scoreInfo = document.getElementById('scoreInfo')
const scoreMessage = document.getElementById('scoreMessage')
const yourScorePara = document.getElementById('yourScore')
const computerScorePara = document.getElementById('computerScore')
// const playerSign = document.getElementById('playerSign')
// const computerSign = document.getElementById('computerSign')
const rockBtn = document.getElementById('rockBtn')
const paperBtn = document.getElementById('paperBtn')
const scissorsBtn = document.getElementById('scissorsBtn')
const endgameModal = document.getElementById('endgameModal')
const endgameMsg = document.getElementById('endgameMsg')
const overlay = document.getElementById('overlay')
const restartBtn = document.getElementById('restartBtn')

rockBtn.addEventListener('click', () => handleClick('rock'))
paperBtn.addEventListener('click', () => handleClick('paper'))
scissorsBtn.addEventListener('click', () => handleClick('scissors'))
restartBtn.addEventListener('click', restartGame)
overlay.addEventListener('click', closeEndgameModal)

function handleClick(playerChoice) {
    if (isGameOver()) {
        openEndgameModal()
        return
    }

    const computerSelection = getRandomChoice()
    game(playerChoice, computerSelection)
    updateScore()

    if (isGameOver()) {
        openEndgameModal()
        setFinalMessage()
    }
}

function updateScore() {
    if (result === 'tie') {
        scoreInfo.textContent = "It's a tie!"
    } else if (result === 'Player') {
        scoreInfo.textContent = 'You won!'
    } else if (result === 'Computer') {
        scoreInfo.textContent = 'You lost!'
    }

    yourScorePara.textContent = `Player: ${yourScore}`
    computerScorePara.textContent = `Computer: ${computerScore}`
}

function updateScoreMessage(winner, playerChoice, computerSelection) {
    if (winner === 'Player') {
        scoreMessage.textContent = `${capitalizeFirstLetter(
        playerChoice
        )} beats ${computerSelection.toLowerCase()}`
        return
    }
    if (winner === 'Computer') {
        scoreMessage.textContent = `${capitalizeFirstLetter(
        playerChoice
        )} is beaten by ${computerSelection.toLowerCase()}`
        return
    }

    scoreMessage.textContent = `${capitalizeFirstLetter(
        playerChoice
    )} ties with ${computerSelection.toLowerCase()}`
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function openEndgameModal() {
    endgameModal.classList.add('active')
    overlay.classList.add('active')
}

function closeEndgameModal() {
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
}

function setFinalMessage() {
    return yourScore > computerScore
        ? (endgameMsg.textContent = 'You won!')
        : (endgameMsg.textContent = 'You lost...')
}

function restartGame() {
    yourScore = 0
    computerScore = 0
    scoreInfo.textContent = 'Halo'
    scoreMessage.textContent = 'Score 5 points to win the game!'
    yourScorePara.textContent = 'Player: 0'
    computerScorePara.textContent = 'Computer: 0'
    // playerSign.textContent = '❔'
    // computerSign.textContent = '❔'
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
}