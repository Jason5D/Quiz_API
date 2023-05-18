let correctAnswers = 0;
let incorrectAnswers = 0;
let currentIndex = 0;
let correctAnswer = "True";
var playerName = localStorage.getItem("playerName");
let right = document.querySelector("#right");
let wrong = document.querySelector("#wrong");
const rightAnswerSound = document.getElementById("rightSound");
const wrongAnswerSound = document.getElementById("wrongSound");

//This code is to reference the question number title on the game page
let qNumber = document.querySelector("h2");



//put playername into #greeting html    
document.getElementById("greeting").innerHTML = "Hello " + playerName + "!";


//starts the game when the start button is clicked
function startGame(event) {
    event.preventDefault(); //prevents game from starting until user inputs a name
    var nameField = document.getElementById("inputBox").value;
    localStorage.setItem("playerName", nameField); //the storage element allow the variable to be used across pages
    window.location.href = "game.html";

}

//fetching api data
async function getQuestions() {
  const response = await fetch("https://opentdb.com/api.php?amount=20&category=9&difficulty=medium&type=boolean");
  results = await response.json();
  correctAnswer = results.results[currentIndex]["correct_answer"];
  updateQuestion();
  /*the line of code below interpolates the currentIndex into a string that is updated on 
    the game page*/
  qNumber.textContent = `Question ${currentIndex + 1} of 20`;
}

//updates the question
function updateQuestion() {
  const questionContent = document.querySelector("#question");
  questionContent.textContent = results.results[currentIndex]["question"];
}

//records true selections based on right answer and logs the score
const trueButton = document.querySelector('#true');
trueButton.addEventListener('click', () => {
  if (currentIndex < 20) {
    correctAnswer = results.results[currentIndex]["correct_answer"];
    if(correctAnswer === "True"){
        rightAnswerSound.play();
        correctAnswers++;
    } else {
        wrongAnswerSound.play();
        incorrectAnswers++;
    }
    currentIndex++;

//ask if want to play again and reset or homepage
    if (correctAnswers + incorrectAnswers === 20) {
        let playAgain = confirm("Do you want to play again?");
        if (playAgain === true) {
            window.location.href = "game.html";
        } else {
            window.location.href = "index.html";
        }
    }
    updateQuestion();
  }
  console.log(correctAnswer);
  console.log(incorrectAnswers);
  console.log(correctAnswers);
  right.textContent = `Right Answers: ${correctAnswers}`;
  wrong.textContent = `Wrong Answers: ${incorrectAnswers}`;
  qNumber.textContent = `Question ${currentIndex + 1} of 20`;
});

//records false selections based on right answer and logs the score
const falseButton = document.querySelector('#false');
falseButton.addEventListener('click', () => {
  if (currentIndex < 20) {
    correctAnswer = results.results[currentIndex]["correct_answer"];
    if(correctAnswer === "False"){
        rightAnswerSound.play();
        correctAnswers++;
    } else {
        wrongAnswerSound.play();
        incorrectAnswers++;
    }
    currentIndex++;

//ask if want to play again and reset or homepage
    if (correctAnswers + incorrectAnswers === 20) {
        let playAgain = confirm("Do you want to play again?");
        if (playAgain === true) {
            window.location.href = "game.html";
        } else {
            window.location.href = "index.html";
        }
    }
    updateQuestion();
  }
  console.log(correctAnswer);
  console.log(incorrectAnswers);
  console.log(correctAnswers);
  right.textContent = `Right Answers: ${correctAnswers}`;
  wrong.textContent = `Wrong Answers: ${incorrectAnswers}`;
  qNumber.textContent = `Question ${currentIndex + 1} of 20`;
});

//calls function to start game
getQuestions();