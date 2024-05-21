const playSectionEl = document.querySelector(".play_section");
const quizSectionEl = document.querySelector(".quiz_section");
const finalSectionEl = document.querySelector(".final_section");

const playBtn = playSectionEl.querySelector(".play-btn");
const playAgainBtn = finalSectionEl.querySelector(".play_again-btn");
const goHomeBtn = finalSectionEl.querySelector(".go_home-btn");

const progressBarEl = document.querySelector(".progress_bar");

const questionNoEl = document.querySelector(".question_no");
const totalQuestionsEl = document.querySelector(".total_questions");
const scoreEl = document.querySelector(".score_value");

const questionEl = document.querySelector(".quiz_section__question");
const optionOneEl = document.querySelector(".option_one");
const optionTwoEl = document.querySelector(".option_two");
const optionThreeEl = document.querySelector(".option_three");
const optionFourEl = document.querySelector(".option_four");
const optionsContainerEl = document.querySelector(".options_container");

const finalSectionScoreEl = finalSectionEl.querySelector(".final_score");

const questions = [
  {
    question: "Which HTML tag is used to define an inline style?",
    choice1: "<script>",
    choice2: "<css>",
    choice3: "<style>",
    choice4: "<span>",
    answer: 3,
    questionPoints: 10,
  },
  {
    question: "Which property is used to change the text color in CSS?",
    choice1: "text-color",
    choice2: "font-color",
    choice3: "text-style",
    choice4: "color",
    answer: 4,
    questionPoints: 20,
  },
  {
    question: "Which of the following is the correct way to comment in HTML?",
    choice1: "// Comment",
    choice2: "<!-- Comment -->",
    choice3: "/* Comment */",
    choice4: "<! Comment>",
    answer: 2,
    questionPoints: 30,
  },
];

let score = 0;
let questionIndex = 0;
let question = questions[questionIndex];

const displayQuestion = (score, questionIndex, question) => {
  const questionNo = questionIndex + 1;
  const totalQuestions = questions.length;
  const progressPercentage = Math.round((questionNo / totalQuestions) * 100);

  quizSectionEl.classList.remove("hidden");
  progressBarEl.style.width = `${progressPercentage}%`;

  scoreEl.innerText = score;
  questionNoEl.innerText = questionIndex + 1;
  totalQuestionsEl.innerText = questions.length;
  questionEl.innerText = question.question;
  optionOneEl.innerText = question.choice1;
  optionTwoEl.innerText = question.choice2;
  optionThreeEl.innerText = question.choice3;
  optionFourEl.innerText = question.choice4;
};

const validOptionsAndNextQuestion = async (e) => {
  const selectedOption = e.target.closest(".option_container");
  const selectedOptionNo = parseInt(selectedOption.dataset["no"]);
  if (!selectedOption) return;

  if (selectedOptionNo === question.answer) {
    selectedOption.classList.add("correct_option");
    score += question.questionPoints;
  } else {
    selectedOption.classList.add("error_option");
    score -= Math.floor(question.questionPoints / 4);
  }
  updateScore(score);
  optionsContainerEl.removeEventListener("click", validOptionsAndNextQuestion);
  optionsContainerEl.classList.add("dropdown_proof");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  questionIndex++;
  optionsContainerEl.querySelectorAll(".option_container").forEach((option) => {
    option.classList.remove("correct_option", "error_option");
  });

  if (questionIndex < questions.length) {
    question = questions[questionIndex];
    displayQuestion(score, questionIndex, question);
  } else {
    updateFinalScore(score);
    quizSectionEl.classList.add("hidden");
    finalSectionEl.classList.remove("hidden");
  }
  optionsContainerEl.addEventListener("click", validOptionsAndNextQuestion);
  optionsContainerEl.classList.remove("dropdown_proof");
};

const updateScore = (newScore) => {
  score = newScore;
  scoreEl.innerText = newScore;
};

const updateFinalScore = (finalScore) => {
  finalSectionScoreEl.innerText = finalScore;
};

playBtn.addEventListener("click", () => {
  playSectionEl.classList.add("hidden");

  displayQuestion(score, questionIndex, question);
});

optionsContainerEl.addEventListener("click", validOptionsAndNextQuestion);

playAgainBtn.addEventListener("click", () => {
  finalSectionEl.classList.add("hidden");
  playSectionEl.classList.add("hidden");

  score = 0;
  questionIndex = 0;
  question = questions[questionIndex];
  displayQuestion(score, questionIndex, question);
});

goHomeBtn.addEventListener("click", () => {
  finalSectionEl.classList.add("hidden");
  playSectionEl.classList.remove("hidden");

  score = 0;
  questionIndex = 0;
  question = questions[questionIndex];
});
