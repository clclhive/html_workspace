// HTML 문서에서 필요한 요소(element)들을 미리 찾아와 변수에 저장합니다.
const attemptInput = document.getElementById("attemptInput");
const setAttemptsBtn = document.getElementById("setAttemptsBtn");
const retryBtn = document.getElementById("retryBtn");
const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const resultDisplay = document.getElementById("resultDisplay");
const attemptsLeft = document.getElementById("attemptsLeft");

// 게임의 상태를 관리하는 변수들입니다.
let computerNumber = 0; // 컴퓨터가 생성한 1~99 사이의 랜덤 숫자
let maxAttempts = 10; // 최대 시도 가능 횟수
let currentAttempts = 10; // 현재 남은 시도 횟수
let gameActive = false; // 게임이 현재 진행 중인지 여부 (true: 진행중, false: 종료)

// 게임을 초기화하거나 새로 시작하는 함수입니다.
function initalizeGame(newMaxAttempts) {
  computerNumber = Math.floor(Math.random() * 99) + 1; // 1~99 사이의 새로운 난수 생성
  maxAttempts = newMaxAttempts; // 최대 시도 횟수 설정
  currentAttempts = maxAttempts; // 남은 시도 횟수를 최대로 초기화

  // 화면에 표시되는 값들을 초기 상태로 설정합니다.
  attemptInput.value = maxAttempts; // 시도 횟수 입력창에 값 표시
  attemptsLeft.textContent = currentAttempts; // 남은 횟수 표시
  resultDisplay.textContent = "start new game plz insert new number";
  gameActive = true; // 게임 상태를 '진행 중'으로 변경
  guessInput.disabled = false; // 숫자 추측 입력창 활성화
  submitBtn.disabled = false; // 제출 버튼 활성화
  guessInput.value = ""; // 입력창 내용 비우기
  guessInput.focus(); // 사용자 편의를 위해 입력창에 자동으로 포커스
}

retryBtn.addEventListener("click", () => {
  window.location.reload();
});

// 선택 (시도 횟스 변경) 버튼
setAttemptsBtn.addEventListener("click", () => { // '시도 횟수 변경' 버튼 클릭 시 실행
  const newMaxAttempts = parseInt(attemptInput.value, 10); // 입력된 값을 정수로 변환

  // 입력값이 숫자가 아니거나 0 이하인 경우 경고창을 띄우고 함수를 종료합니다.
  if (isNaN(newMaxAttempts) || newMaxAttempts <= 0) { 
    alert("plz insert number over 1");
    return;
  }

  initalizeGame(newMaxAttempts);
  alert(`New game started with ${newMaxAttempts} attempts`);
});

// 제출 버튼
submitBtn.addEventListener("click", () => { // '제출' 버튼 클릭 시 실행
  handleGuess();
});

// 숫자 추측 입력창에서 Enter 키를 눌렀을 때도 제출되도록 합니다.
guessInput.addEventListener("keyup", (event) => { // 'keyup'은 키보드에서 손을 뗄 때 발생
  if (event.key === "Enter") {
    handleGuess();
  }
});

// 게임 로직
function handleGuess() {
  // 게임이 종료된 상태(정답을 맞췄거나, 기회를 다 썼을 때)라면 경고창을 띄우고 더 이상 진행하지 않습니다.
  if (!gameActive) {
    alert("Game is Over plz press New Game");
    return;
  }

  const userGuess = parseInt(guessInput.value, 10); // 사용자가 입력한 추측 값을 정수로 변환

  // 유효성 검사: 입력값이 숫자가 아니거나 1~99 범위를 벗어난 경우
  if (isNaN(userGuess) || userGuess < 1 || userGuess > 99) {
    resultDisplay.textContent = "wrong Number. Try it again"; // 안내 메시지 표시
    guessInput.value = "";
    guessInput.focus();
    return;
  }

  // 시도 횟수 차감 및 업데이트
  currentAttempts--;
  attemptsLeft.textContent = currentAttempts;

  // 사용자의 추측과 컴퓨터의 숫자를 비교합니다.
  if (userGuess === computerNumber) {
    // 정답을 맞춘 경우
    resultDisplay.textContent = `correct (answer: ${computerNumber})`;
    gameActive = false; // 게임 종료
    guessInput.disabled = true; // 입력창 비활성화
    submitBtn.disabled = true; // 제출 버튼 비활성화
  } else if (userGuess > computerNumber) {
    // 추측이 더 큰 경우
    resultDisplay.textContent = "down";
  } else {
    // 추측이 더 작은 경우
    resultDisplay.textContent = "up";
  }

  // 실패 처리: 게임이 아직 진행 중이고 남은 기회가 0 이하일 때
  if (gameActive && currentAttempts <= 0) {
    resultDisplay.textContent = `You failed (answer: ${computerNumber})`;
    gameActive = false; // 게임 종료
    guessInput.disabled = true; // 입력창 비활성화
    submitBtn.disabled = true; // 제출 버튼 비활성화
  }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
