const questions = [
    {
        question: "What is the largest planet in our Solar System?",
        options: ["a) Earth", "b) Mars", "c) Jupiter", "d) Saturn"],
        answer: 2
    },
    {
        question: "Which galaxy is the Milky Way expected to collide with in the future?",
        options: ["a) Andromeda Galaxy", "b) Triangulum Galaxy", "c) Whirlpool Galaxy", "d) Sombrero Galaxy"],
        answer: 0
    },
    {
        question: "What is the name of the first artificial Earth satellite launched by the Soviet Union in 1957?",
        options: ["a) Sputnik 1", "b) Apollo 11", "c) Voyager 1", "d) Hubble"],
        answer: 0
    },
    {
        question: "What is the main component of the Sun?",
        options: ["a) Oxygen", "b) Carbon Dioxide", "c) Hydrogen", "d) Nitrogen"],
        answer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["a) Venus", "b) Mercury", "c) Mars", "d) Neptune"],
        answer: 2
    },
    // You can add more questions here
];


let currentQuestion = 0;
let score = 0;
let timeRemaining = 10; // Adjust timer duration as needed

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("time-remaining");
const feedbackEl = document.getElementById("feedback");
const finalScoreEl = document.getElementById("final-score");
const nextBtn = document.getElementById("next-btn");

function displayQuestion() {
  const question = questions[currentQuestion];
  questionEl.textContent = question.question;
  optionsEl.innerHTML = ""; // Clear previous options

  question.options.forEach((option, index) => {
    const optionEl = document.createElement("li");
    optionEl.textContent = option;
    optionEl.addEventListener("click", () => checkAnswer(index));
    optionsEl.appendChild(optionEl);
  });

  startTimer();
}

function startTimer() {
  timeRemaining = 10; // Reset timer for each question
  timerEl.textContent = timeRemaining;
  const timerInterval = setInterval(() => {
    timeRemaining--;
    timerEl.textContent = timeRemaining;
    if (timeRemaining === 0) {
      clearInterval(timerInterval);
      checkAnswer(-1); // No answer selected within time limit
    }
  }, 1000);
}

function checkAnswer(selectedOption) {
  const question = questions[currentQuestion];
  if (selectedOption === question.answer) {
    score++;
    feedbackEl.textContent = "Correct!";
  } else {
    feedbackEl.textContent = "Incorrect. The correct answer is " + questions[currentQuestion].options[question.answer];
  }
  showNextButton();
}

function showNextButton() {
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion === questions.length) {
        clearInterval(timeRemaining);
      showFinalScore();
    } else {
      displayQuestion();
      feedbackEl.textContent = ""; // Clear feedback for next question
      nextBtn.style.display = "none"; // Hide next button until answer is selected
    }
  });
  
  function showFinalScore() {
    finalScoreEl.textContent = "Final Score: " + score + " out of " + questions.length;
    nextBtn.style.display = "none"; // Hide next button after final score
    optionsEl.innerHTML = ""; // Clear options
    questionEl.textContent = "Quiz Finished!";
    // Here's the timer stopping functionality:
    clearInterval(timerInterval); // Clear any existing timer interval
  }
  displayQuestion();