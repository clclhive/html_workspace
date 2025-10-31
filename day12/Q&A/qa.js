// -----------------------------------------------------------------
// 1. DOM 요소 선택 (사용자 HTML ID 기준으로 수정)
// -----------------------------------------------------------------
const startQuizBtn = document.getElementById("startBtn"); // ID 수정됨
const checkAnswersBtn = document.getElementById("checkBtn"); // ID 수정됨
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");

// -----------------------------------------------------------------
// 2. 문제 데이터 (50문제)
// -----------------------------------------------------------------
const problemPool = [
  { q: "2 x 2", a: 4 }, { q: "2 x 3", a: 6 }, { q: "2 x 4", a: 8 }, { q: "2 x 5", a: 10 }, { q: "2 x 6", a: 12 },
  { q: "2 x 7", a: 14 }, { q: "2 x 8", a: 16 }, { q: "2 x 9", a: 18 }, { q: "3 x 2", a: 6 }, { q: "3 x 3", a: 9 },
  { q: "3 x 4", a: 12 }, { q: "3 x 5", a: 15 }, { q: "3 x 6", a: 18 }, { q: "3 x 7", a: 21 }, { q: "3 x 8", a: 24 },
  { q: "3 x 9", a: 27 }, { q: "4 x 2", a: 8 }, { q: "4 x 3", a: 12 }, { q: "4 x 4", a: 16 }, { q: "4 x 5", a: 20 },
  { q: "4 x 6", a: 24 }, { q: "4 x 7", a: 28 }, { q: "4 x 8", a: 32 }, { q: "4 x 9", a: 36 }, { q: "5 x 2", a: 10 },
  { q: "5 x 3", a: 15 }, { q: "5 x 4", a: 20 }, { q: "5 x 5", a: 25 }, { q: "5 x 6", a: 30 }, { q: "5 x 7", a: 35 },
  { q: "5 x 8", a: 40 }, { q: "5 x 9", a: 45 }, { q: "6 x 2", a: 12 }, { q: "6 x 3", a: 18 }, { q: "6 x 4", a: 24 },
  { q: "6 x 6", a: 36 }, { q: "6 x 7", a: 42 }, { q: "6 x 8", a: 48 }, { q: "6 x 9", a: 54 }, { q: "7 x 2", a: 14 },
  { q: "7 x 3", a: 21 }, { q: "7 x 7", a: 49 }, { q: "7 x 8", a: 56 }, { q: "7 x 9", a: 63 }, { q: "8 x 8", a: 64 },
  { q: "8 x 9", a: 72 }, { q: "9 x 2", a: 18 }, { q: "9 x 3", a: 27 }, { q: "9 x 8", a: 72 }, { q: "9 x 9", a: 81 }
];

// -----------------------------------------------------------------
// 3. '문제 출제' 버튼 이벤트 리스너 (ID 수정됨)
// -----------------------------------------------------------------
startQuizBtn.addEventListener("click", () => {
  const randomProblems = shuffleArray(problemPool).slice(0, 10);

  quizContainer.innerHTML = "";
  resultContainer.innerHTML = "";

  let quizHTML = ""; 
  randomProblems.forEach((problem, index) => {
    quizHTML += `
      <div class="problem-item">
        <label>${index + 1}. ${problem.q} = </label>
        <input type="number" class="answer-input" data-answer="${problem.a}">
        <span class="feedback"></span>
      </div>
    `;
  });

  quizContainer.innerHTML = quizHTML;
});

// -----------------------------------------------------------------
// 4. 배열 섞기 함수 (Fisher-Yates shuffle)
// -----------------------------------------------------------------
function shuffleArray(array) {
  const newArray = [...array]; 
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// -----------------------------------------------------------------
// 5. [신규] '정답 확인' 버튼 이벤트 리스너
// -----------------------------------------------------------------
checkAnswersBtn.addEventListener("click", () => {
  // 5-1. 화면에 있는 모든 정답 입력창(.answer-input)을 찾습니다.
  const answerInputs = document.querySelectorAll(".answer-input");
  
  // 5-2. 맞은 개수 카운터와 총 문제 개수를 준비합니다.
  let correctCount = 0;
  const totalQuestions = answerInputs.length;

  // 5-3. (예외 처리) 퀴즈가 없으면(0개면) 실행 중단
  if (totalQuestions === 0) {
    resultContainer.innerHTML = "<h3>문제를 먼저 출제해 주세요!</h3>";
    return; // 함수를 즉시 종료
  }

  // 5-4. 각 입력창을 순회하며 채점합니다.
  answerInputs.forEach((input) => {
    const userAnswer = input.value; // 사용자가 입력한 값
    const correctAnswer = input.dataset.answer; // 우리가 숨겨둔 정답 (data-answer)
    const feedbackSpan = input.nextElementSibling; // input 바로 뒤의 <span> 태그

    // 5-5. 값 비교 (둘 다 숫자로 변환해서 비교)
    if (Number(userAnswer) === Number(correctAnswer)) {
      // 정답일 경우
      feedbackSpan.textContent = "✔️";
      correctCount++; // 맞은 개수 증가
    } else {
      // 오답일 경우
      feedbackSpan.textContent = "❌";
    }
  });

  // 5-6. 모든 채점이 끝난 후, 결과 계산 및 표시
  const percentage = (correctCount / totalQuestions) * 100;
  
  resultContainer.innerHTML = `
    <h3>정답 개수: ${correctCount} / ${totalQuestions}</h3>
    <h3>정답률: ${percentage.toFixed(1)}%</h3>
  `;
  // toFixed(1) : 소수점 첫째 자리까지만 표시
});