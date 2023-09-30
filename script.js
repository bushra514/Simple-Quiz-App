
// Define the questions and answers

const questions = [
    {

        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Madrid", "Rome"],
        correctAnswer: 0,
    },

    {

        question: "What is the largest ocean in the world?",
        options: ["Pacific", "Atlantic", "Indian", "Arctic"],
        correctAnswer: 3,
    },

    {

        question: "Which gas is most abundant in the Earth's atmosphere?",
        options: [" Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: 2,
    },

    {

        question: "What is the value of π (pi) to two decimal places?",
        options: ["3.14", "2.71", "4.16", "3.50"],
        correctAnswer: 0,
    },

    {

        question: "Which film won the Academy Award for Best Picture in 2020?",
        options: ["Joker", "Parasite", "1917", "La La Land"],
        correctAnswer: 1,
    },

    {

        question: "Who co-founded Apple Inc. along with Steve Jobs?",
        options: ["Bill Gates", "Jeff Bezos", " Steve Wozniak", "Mark Zuckerberg"],
        correctAnswer: 2,
    },

    {

        question: "Who painted the Mona Lisa?",
        options: [" Vincent van Gogh", " Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
    },

];



// Define DOM elements
const questionElement = document.querySelector(".quiz-questions p");
const optionContainer = document.querySelector(".option-container");
const nextButton = document.querySelector(".next-btn button");
const countdownElement = document.getElementById("countdown");

const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const startButton = document.querySelector(".start-btn");




// Event listener for "Get Started" button click
startButton.addEventListener("click", () => {

    console.log("Button clicked");
    // Hide the start screen and displaying the question screen
  
    startButton.style.display = "none"; // Hide the start button
    quizContainer.style.display = "none"; 
    questionContainer.style.display = "block";
    // showQuestion(currentQuestionIndex); // Display the first question

});



// Define the current question index
let currentQuestionIndex = 0;
let timer;

// Function to start the quiz
function startQuiz() {
  quizContainer.style.display = "none";
  questionContainer.style.display = "block";  
  showQuestion(currentQuestionIndex); // Display the first question
}

// Function to display a question
function showQuestion(questionIndex) {
  if (questionIndex < questions.length) {
    const currentQuestion = questions[questionIndex];
    
    // Set the question text after the <hr> element
    const questionTextElement = document.querySelector('.question-text p');
    questionTextElement.textContent = currentQuestion.question;

    // Clear the option container
    optionContainer.innerHTML = "";

    // Create and append answer options
    currentQuestion.options.forEach((option, index) => {
      const optionElement = document.createElement("div");
      optionElement.className = "option";
      optionElement.textContent = option;
      optionContainer.appendChild(optionElement);

      // Add click event listener to check the answer
      optionElement.addEventListener("click", () => checkAnswer(index));
    });

    startTimer(); // Start the timer for the question
  } else {
    // Quiz is finished
    questionElement.textContent = "Quiz Finished!";
    optionContainer.innerHTML = "";
    nextButton.style.display = "none";
    countdownElement.style.display = "none";
    showResult(); // Show the final result
  }
}

// Function to start the timer
// Function to start the timer
function startTimer() {
  let timeLeft = 10; // 10 seconds per question
  countdownElement.style.display = "block";

  timer = setInterval(function () { // Use the global timer variable
    countdownElement.textContent = ` ${timeLeft}s`;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timer);
      checkAnswer(-1); // Time's up, check for a wrong answer
    }
  }, 2000);
}


// Function to check the selected answer
function checkAnswer(selectedIndex) {
  clearInterval(timer); // Stop the timer

  const currentQuestion = questions[currentQuestionIndex];
  const options = optionContainer.querySelectorAll(".option");

  // Check if the selected answer is correct
  if (selectedIndex === currentQuestion.correctAnswer) {
    // Correct answer
    options[selectedIndex].style.backgroundColor = "green";
  } else {
    // Wrong answer
    options[selectedIndex].style.backgroundColor = "red";
    options[currentQuestion.correctAnswer].style.backgroundColor = "green"; // Highlight the correct answer in green

    // Disable clicking on other options after selecting an answer
    options.forEach((option, index) => {
      option.style.pointerEvents = "none";
    });
  }

  setTimeout(() => {
    // Delay for 1 second before moving to the next question
    options[selectedIndex].style.backgroundColor = ""; // Reset background color
    options[currentQuestion.correctAnswer].style.backgroundColor = ""; // Reset correct answer background color
    options.forEach((option, index) => {
      option.style.pointerEvents = "auto"; // Re-enable clicking on options
    });

    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
  }, 1000);
}




// Add these variables at the top of your script.js file
const resultScore = document.querySelector(".result-score");

// Event listener for the "Next" button
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  showQuestion(currentQuestionIndex);
});

// Function to show the final result
function showResult() {
  // Calculate and display the user's score
  const score = (currentQuestionIndex / questions.length) * 100;
  resultScore.textContent = `Your Score: ${score.toFixed(2)}%`;
  resultScore.style.display = "block";
  nextButton.style.display = "none"; // Hide the "Next" button
  countdownElement.style.display = "none"; // Hide the countdown
}

// Modify the checkAnswer function to check for the end of the quiz
function checkAnswer(selectedIndex) {
  clearInterval(timer); // Stop the timer

  const currentQuestion = questions[currentQuestionIndex];

  if (selectedIndex === currentQuestion.correctAnswer || selectedIndex === -1) {
    // Correct answer or time's up
    if (currentQuestionIndex === questions.length - 1) {
      // This was the last question
      showResult();
    } else {
      currentQuestionIndex++;
      setTimeout(() => {
        showQuestion(currentQuestionIndex);
      }, 1000); // Delay the next question display by 1 second (adjust as needed)
    }
  }
}

// Event listener to start the quiz
startButton.addEventListener("click", startQuiz);

// Start the quiz when the page loads
startQuiz();


// Event listener to start the quiz
startButton.addEventListener("click", startQuiz);


// Start the quiz when the page loads
startQuiz();
