const quiz = document.getElementById("quiz");
let clock = document.getElementById("clock");
let end = document.getElementById("ending");
let highscores = document.getElementById("highscore");
let name = document.getElementById("name");
let submit = document.getElementById("submit");
let begin = document.getElementById("begin");
let start = document.getElementById("start");
let hassub = false;
let count = 0;
let time = 62; // reference this time, set Interval to decrease by 1, questions
//var of questions
let countdown = null;
let score = 0;
var questions = [
  {
    text: "What is the color of the sky?",
    choices: ["blue", "red", "green", "black"],
    answer: "blue",
  },
  {
    text: "What's 4 + 4?",
    choices: ["3", "9", "16", "8"],
    answer: "8",
  },
  {
    text: "How many legs does an ostrich have?",
    choices: ["3", "2", "1", "0"],
    answer: "2",
  },
  {
    text: "How old was Bilbo in Fellowship of the Ring?",
    choices: ["45", "84", "111", "30"],
    answer: "111",
  },
  {
    text: "Whats a huge dust storm called in the desert?",
    choices: ["Gust of Wind", "Haboob", "Sand storm", "Dust Devil"],
    answer: "Haboob",
  },
];

function makeQuiz() {
  for (let i = 0; i < questions.length; i++) {
    // for loop iterating over the questions
    let container = document.createElement("div"); // creating a div to contain questions in html
    container.setAttribute("class", "question-container"); //Giving container a class
    container.setAttribute("data-index", i); //Giving container a custom attribute called index, which is set to current qustion in for loop
    let quiztitle = document.createElement("h2"); // make title for question
    quiztitle.textContent = questions[i].text; // set the text of title = to the text property of the current question
    container.appendChild(quiztitle); // add title to container for each question
    document.getElementById("quiz").style.textAlign = "center";

    for (let j = 0; j < questions[i].choices.length; j++) {
      // second loop that iterates over the choices of each question
      const currentchoice = questions[i].choices[j]; //store the current choice

      let button = document.createElement("button"); // make a button for current choice
      button.textContent = currentchoice; // set the text of the button to current choice
      button.setAttribute(
        // add a custom attribute to the button to store wheather the answer is equal to the value of the current button
        "data-correct",
        questions[i].answer === currentchoice,
        button.setAttribute("class", "question-option")
      );
      button.addEventListener("click", function (event) {
        // add an event listner for a click which in order to progress question of the quiz
        if (event.target.getAttribute("data-correct") === "false") {
          time = time - 20;
          timetext();
        } else {
          score = score + 1;
        }
        let currentelement = document.querySelector(
          // use queryselector to get current container
          ".question-container[data-index='" + count + "']" // element with class name question container that has attribute data index = current count
        );
        currentelement.style.display = "none"; //set current container display to none
        count++; // increase count
        currentelement = document.querySelector(
          // use query selector to get the next question because count has increased
          ".question-container[data-index='" + count + "']"
        );
        if (count < questions.length) {
          // check whether not there is a next question
          currentelement.style.display = "block"; //if there is show the next question
        } else {
          quiz.style.display = "none";
          end.style.display = "block";
          clearInterval(countdown);
          display();
        }
      });
      container.appendChild(button); //add current button to container
    }
    quiz.appendChild(container); //add current container to quiz
  }
}
function timer() {
  time = time - 1;
  timetext();
  if (time < 0) {
    end.style.display = "block";
    quiz.style.display = "none";
    clearInterval(countdown);
    clock.textContent = "0:00";
    display();
  }
}
function timetext() {
  const min = Math.floor(time / 60);
  let sec = time % 60;
  if (sec < 10) {
    sec = "0" + sec;
  }
  clock.textContent = min + ":" + sec;
}
begin.addEventListener("click", function () {
  countdown = setInterval(timer, 1000);
  start.style.display = "none";
  quiz.style.display = "block";
});
submit.addEventListener("click", function () {
  if (!hassub) {
    store();
    hassub = true;
    highscores.innerHTML = "";
    display();
  }
});
function store() {
  let gethigh = JSON.parse(localStorage.getItem("highscore"));
  let username = name.value;
  if (gethigh) {
    gethigh.push(username + ": " + score);
    localStorage.setItem("highscore", JSON.stringify(gethigh));
  } else {
    localStorage.setItem(
      "highscore",
      JSON.stringify([username + ": " + score])
    );
  }
}
function display() {
  let current = JSON.parse(localStorage.getItem("highscore"));
  if (current) {
    for (i = 0; i < current.length; i++) {
      let list = document.createElement("li");
      list.textContent = current[i];
      highscores.appendChild(list);
    }
  }
}
makeQuiz();
console.log(questions[0].text);

console.log(quiz.getAttribute("data-random"));
// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score
