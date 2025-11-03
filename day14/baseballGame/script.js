const startBtn = document.getElementById("start-btn");
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const resultArea = document.getElementById("result-area");

let computerNumber = [];
let gameStarted = false;
let guessCount = 0;

startBtn.addEventListener("click", startGame);
guessBtn.addEventListener("click", handleGuess);

guessInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && gameStarted) {
        handleGuess();
    }
});
function startGame() {
    computerNumber = [];
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    while (computerNumber.length < 3) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        computerNumber.push(digits.splice(randomIndex, 1)[0]);
    }

    gameStarted = true;
    guessCount = 0;
    guessInput.disabled = false;
    guessBtn.disabled = false;
    startBtn.disabled = true;

    resultArea.innerHTML = ''; 
    guessInput.value = '';
    guessInput.focus();

    console.log('Answer: ' + computerNumber.join('')); 
}

function handleGuess() {
    if (!gameStarted) return;
    
    const guessString = guessInput.value;

    // [규칙 3] 3자리인가? (사용자님 코드 - 좋습니다!)
    if(guessString.length !==3){
        alert('Please enter a 3-digit number');
        return;
    }
    if(isNaN(guessString)){
        alert('Please enter a number');
        return;
    }
    const guessSet = new Set(guessString);
    if(guessSet.size !== 3){
        alert('Please enter a unique number');
        return;
    }
    const guessArray = guessString.split('').map(Number);
    guessCount++;

    let strikes = 0;
    let balls = 0;

    for(let i = 0; i < 3; i++){
        if(guessArray[i] === computerNumber[i]){
            strikes++;
        }else if(computerNumber.includes(guessArray[i])){
            balls++;
        }
    } 

    let resultText = '';

    if(strikes === 3){
        resultText = `<h3>${guessString} - You win! </h3> <p>${guessCount}번 만에 맞추셨습니다!</p>`;
        gameStarted = false;
        guessInput.disabled = true;
        guessBtn.disabled = true;
        startBtn.disabled = false;
    }else if(strikes === 0 && balls === 0){
        resultText = `${guessString} : <strong>Out!</strong>`; 
    }else{
        resultText = `${guessString} : <strong>${strikes} strikes, ${balls} balls</strong>`; 
    }

    const resultElement = document.createElement('p');
    resultElement.innerHTML = resultText;
    resultArea.prepend(resultElement);
    
    guessInput.value = '';
    guessInput.focus();
}