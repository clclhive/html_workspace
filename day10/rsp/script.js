
const scissorsBtn = document.getElementById('scissors');
const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');

const resultContainer = document.getElementById('result-container');
const roundResultText = document.getElementById('round-result');
const playerChoiceImg = document.getElementById('player-choice-img');
const computerChoiceImg = document.getElementById('computer-choice-img');
const totalScoreText = document.getElementById('total-score');

// 전적 변수 (변경 없음)
let wins = 0;
let losses = 0;
let draws = 0;

const choices = ['scissors', 'rock', 'paper'];

const imagePaths = {
    scissors: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrmS7OHPd-ZUuONczV_RXQwVYpPOwi_R1d5Q&s',
    rock: 'data:image/jpeg;base64,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',
    paper: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaQ1ka9GpiqvYbpCZafd5Yx9X-D4IFdXvwdw&s'
};



const choiceNames = {
    scissors: '가위',
    rock: '바위',
    paper: '보'
};


scissorsBtn.addEventListener('click', () => playGame('scissors'));
rockBtn.addEventListener('click', () => playGame('rock'));
paperBtn.addEventListener('click', () => playGame('paper'));

function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    updateScore(result);
    updateUI(playerChoice, computerChoice, result);
}

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}


function determineWinner(player, computer) {
    if (player === computer) {
        return 'draw'; // 무승부
    }
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'scissors' && computer === 'paper') ||
        (player === 'paper' && computer === 'rock')
    ) {
        return 'win'; // 승리
    }
    return 'lose'; // 패배
}

function updateScore(result) {
    if (result === 'win') {
        wins++;
    } else if (result === 'lose') {
        losses++;
    } else {
        draws++;
    }
}


function updateUI(playerChoice, computerChoice, result) {
    resultContainer.style.display = 'block';

    if (result === 'win') {
        roundResultText.textContent = '승리했습니다!';
        roundResultText.style.color = 'green';
    } else if (result === 'lose') {
        roundResultText.textContent = '패배했습니다';
        roundResultText.style.color = 'red';
    } else {
        roundResultText.textContent = '무승부입니다';
        roundResultText.style.color = 'gray';
    }


    playerChoiceImg.src = imagePaths[playerChoice];
    computerChoiceImg.src = imagePaths[computerChoice];
    
    playerChoiceImg.alt = choiceNames[playerChoice];
    computerChoiceImg.alt = choiceNames[computerChoice];

    totalScoreText.textContent = `전적: ${wins}승 ${draws}무 ${losses}패`;
}