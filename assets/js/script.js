// Create a code quiz that contains the following requirements:

// A start button that when clicked a timer starts and the first question appears.

// Questions contain buttons for each answer.
// When answer is clicked, the next question appears
// If the answer clicked was incorrect then subtract time from the clock
// The quiz should end when all questions are answered or the timer reaches 0.

// When the game ends, it should display their score and give the user the ability to save their initials and their score

// Pseudocode

// Set of questions - array of objects
// each question needs the following:
  // question text
  // set of answers
  // which answer is correct

// Landing page:
  // explanation of quiz
  // start button

// Click the start button: 
  // Landing page goes away - use CSS - classes already set uo for this
  // TImer starts 
  // The quesiton appears (with its answers)

// For each question: 
  // User clicks an answer
  // Their choice is compared to the correct answer as stored in the question's object
  // If correct, tell them
  // If incorrect, tell them AND subtract time from the timer
  // Optional: play a sound for correct/incorrect
  // Either way, the question dissapears after a few seconds and the next question appears

// After the last question: 
  // Timer stops
  // Question disappears
  // Form appears for user to enter their initials
  // Display their score

// User submits form
  // Initials and score get stored in local storage
  // User is taken to the high scores page
  // High scores are listed, sorted highest to lowest
  // User has option to take the quiz again 

  // Variables to reference DOM elements
  let timerEl = document.getElementById('time');
  let startscreen = document.getElementById('start-screen');
  const startBtn = document.getElementById('start');
  const questionsEl = document.getElementById('questions');
  const questionChoices = document.getElementById('choices');
  const endScreen = document.getElementById('end-screen');
  const finalScore = document.getElementById('final-score');
  const submitBtn = document.getElementById('submit');
  const initials = document.getElementById('initials');
  const feedbackEl = document.getElementById('feedback');
  const titleEl = document.getElementById('question-title');

  // Array of questions
  let questions = [
    {
      title: '1. Which Studio Ghibli film won an Academy Award in 2003 for Best Animated Feature?',
      choices: ['A. Arrietty', 'B. Spirited Away', 'C. My Neighbour Totoro', 'D. Howl\'s Moving Castle'],
      answer: 'B. Spirited Away'
    },
    {
      title: '2. In My Neighbour Totoro, what are the names of the 2 sisters?',
      choices: ['A. Jack & Jill', 'B. Chihiro & Haku', 'C. Satsuki & Mei', 'D. Hansel & Gretel'],
      answer: 'C. Satsuki & Mei'
    },
    {
      title: '3. In Howl\'s Moving Castle, what does Howl do for a living?',
      choices: ['A. Baker', 'B. Scientist', 'C. Farmer', 'D. Wizard'],
      answer: 'D. Wizard'
    },
    {
      title: '4. In Kiki\'s Delivery Service, what kind of animal is Kiki\'s familiar, Jiji?',
      choices: ['A. A cat', 'B. A rabbit', 'C. A caterpillar', 'D. A mouse'],
      answer: 'A. A cat'
    },
    {
      title: '5. Which Studio Ghibli film is about a boy who befriends a fish with a human face?',
      choices: ['A. Princess Mononoke', 'B. Porco Rosso', 'C. Ponyo', 'D. Castle in the Sky'],
      answer: 'C. Ponyo'
    },
  ];


// Variables that keep track of the state of the quiz
  let timer = questions.length * 15; // 15 seconds but can change this
  let timerInterval;
  let questionIndex = 0;

// Function to start the quiz
  function startQuiz() {
    startscreen.setAttribute('class', 'hide');
    questionsEl.removeAttribute('class', 'hide');
    timerInterval = setInterval(function(){
      timer--;
      timerEl.textContent = timer;
      if (timer <= 0) {
        endQuiz();
      }
    }, 1000)
    getQuestions();  
  }


// Function to grab questions and display to the page
  function getQuestions() {
    let currentQuestion = questions[questionIndex];

    titleEl.textContent = currentQuestion.title;

    questionChoices.innerHTML = '';
    
    for (let i = 0; i < currentQuestion.choices.length; i++) {
      const choice = currentQuestion.choices[i];
      let choiceBtn = document.createElement('button');
      choiceBtn.setAttribute('class', 'choice');
      choiceBtn.setAttribute('value', choice);
      choiceBtn.textContent = choice;

      choiceBtn.addEventListener('click', selectAnswer);
      questionChoices.appendChild(choiceBtn);
      
    }
  }

// Function to check answer and display feedback
  function selectAnswer(event) {
    if (event.target.value !== questions[questionIndex].answer) {
      timer -= 10;
      
      if (timer < 0) {
        timer = 0;
      }
        timerEl.textContent = timer;
        feedbackEl.textContent = 'Wrong!'
      } else {
        feedbackEl.textContent = 'Correct!';
      }
      feedbackEl.setAttribute('class', 'feedback');
      setTimeout( function() {
        feedbackEl.setAttribute('class', 'feedback hide'); 
      }, 2000)

      questionIndex++
      
      if (questionIndex === questions.length) {
        endQuiz();
      } else {
        getQuestions();
      }

  }
// Function to end the quiz
  function endQuiz() {
    clearInterval(timerInterval);
    questionsEl.setAttribute('class', 'hide');
    endScreen.removeAttribute('class');
  }

  // Function to save the score to local storage

  function saveScore() {
    
  }

  startBtn.addEventListener ('click', startQuiz);
