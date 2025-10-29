//html 요소
const attemptInput = document.getElementById("attemptInput");
const setAttemptsBtn = document.getElementById("setAttemptsBtn");
const retryBtn = document.getElementById("retryBtn");
const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const resultDisplay = document.getElementById("resultDisplay");
const attemptsLeft = document.getElementById("attemptsLeft");
//게임 상태
let computerNumber = 0;
let maxAttempts = 10;
let currentAttempts = 10; // 남은 시도 횟수
let gameActive = false; // 게임 진행 상태 여부

function initalizeGame(newMaxAttempts) {
  computerNumber = Math.floor(Math.random() * 99) + 1;
  maxAttempts = newMaxAttempts;
  currentAttempts = maxAttempts;
  //화면 표시
  attemptInput.value = maxAttempts;
  attemptsLeft.textContent = currentAttempts;
  resultDisplay.textContent = "start new game plz insert new number";
  gameActive = true;
  guessInput.disabled = false;
  submitBtn.disabled = false;
  guessInput.value = "";
  guessInput.focus(); //입력창 바로가기
}

retryBtn.addEventListener("click", () => {
  window.location.reload();
});

// 선택 (시도 횟스 변경) 버튼
setAttemptsBtn.addEventListener("click", () => {
  const newMaxAttempts = parseInt(attemptInput.value, 10);

  // 유효 숫자 확인
  if (isNaN(newMaxAttempts) || newMaxAttempts <= 0) {
    alert("plz insert number over 1");
    return;
  }

  initalizeGame(newMaxAttempts);
  alert(`New game started with ${newMaxAttempts} attempts`);
});

// 제출 버튼
submitBtn.addEventListener("click", () => {
  handleGuess();
});

//Enter 키로 제출
guessInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    handleGuess();
  }
});

// 게임 로직
function handleGuess() {
  //게임 비활성화 시 함수 종료 혹은 정답/실패 시
  if (!gameActive) {
    alert("Game is Over plz press New Game");
    return;
  }

  const userGuess = parseInt(guessInput.value, 10);

  //유효성 검사
  if (isNaN(userGuess) || userGuess < 1 || userGuess > 99) {
    resultDisplay.textContent = "wrong Number. Try it again";
    guessInput.value = "";
    guessInput.focus();
    return;
  }

  // 시도 횟수 차감 및 업데이트
  currentAttempts--;
  attemptsLeft.textContent = currentAttempts;

  // 숫자 비교
  if (userGuess === computerNumber) {
    //정답
    resultDisplay.textContent = `correct (answer: ${computerNumber})`;
    gameActive = false;
    guessInput.disabled = true;
    submitBtn.disabled = true;
  } else if (userGuess > computerNumber) {
    //down
    resultDisplay.textContent = "down";
  } else {
    //up
    resultDisplay.textContent = "up";
  }

  // 실패 로직(기회 전부 소진)
  if (gameActive && currentAttempts <= 0) {
    resultDisplay.textContent = `You failed (answer: ${computerNumber})`;
    gameActive = false;
    guessInput.disabled = true;
    submitBtn.disabled = true;
  }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
