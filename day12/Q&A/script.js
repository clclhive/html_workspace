const startQuizBtn = document.getElementById('startBtn');
const quizContainer = document.getElementById('quizContainer');
const checkAnswersBtn = document.getElementById('checkBtn');
const resultContainer = document.getElementById('result-container');

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

  startQuizBtn.addEventListener('click', () => {
    const randomProblems = shuffleArray(problemPool).slice(0,10);

    quizContainer.innerHTML = '';
    resultContainer.innerHTML = '';

    let quizHTML = '';
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

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  checkAnswersBtn.addEventListener('click', () => {
    const answerInputs = document.querySelectorAll('.answer-input');
    let correctAnswers = 0;
    cosnt totalQuestions = answerInputs.length;

    answerInputs.forEach((input) => {
      const userAnswer = input.value;
      const correctAnswer = input.dataset.answer;
      const feedbackElement = input.nextElementSibling;

        if(Number(userAnswer) === Number(correctAnswer)) {
            feedbackSpan.textContent = "b"
        

  });