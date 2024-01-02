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
  const msgDiv = document.getElementById('msg');
  const highscoresWrapper = document.getElementById('highscores-wrapper');
  const highScores = document.getElementById('highscores');
  const viewScores = document.getElementById('view-scores');
  const clear = document.getElementById('clear');
    

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
      }, 1500)

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
    questionsEl.setAttribute('class', 'hide'); // Hide questions
    endScreen.removeAttribute('class'); // Show end screen
    finalScore.textContent = timer; // Final score is whatever time is left 

    saveScore();
  }

  // Function to save initials and score 
  function saveScore() {
    
    submitBtn.addEventListener('click', function(){
      
      let initialsInput = document.querySelector('#initials').value.trim();

      if (initialsInput === '') { // This is not working
        displayMessage('error', 'Please enter your initials')
        console.log('BOOOO');
        //return saveScore();
      };

      // Set initials and score to local storage as an array of objects
      let scoresList = JSON.parse(localStorage.getItem('initialsScore')) || [];
      let lastPLayer = {name: initialsInput, score: timer };
      
      scoresList.push(lastPLayer);

      localStorage.setItem('initialsScore', JSON.stringify(scoresList));

      highscoresWrapper.removeAttribute('class', 'hide');
      endScreen.setAttribute('class', 'hide');
      
      renderHighScore();
    });  
  };

  // Function to print initials and score to page
  function renderHighScore(){
    let arrayScores = JSON.parse(localStorage.getItem("initialsScore"));
    let playerIndex = 0;

    // Sort array of scores in descending order
    arrayScores.sort((s1, s2)=> {
      return s2.score - s1.score;
    });
    
    if (arrayScores) {
      arrayScores.forEach(element => {
        const playerInitials = arrayScores[playerIndex].name;
        const playerScore = arrayScores[playerIndex].score;
        let liEl = document.createElement("li");
        highScores.appendChild(liEl);
        liEl.innerText = `Name: ${playerInitials} - Score: ${playerScore}`;
        playerIndex ++;
      });  
    } 
  };

  // Function to display error message
  function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute("class", type);
  }
  
  // Click event loads Highscores  
  viewScores.addEventListener('click', function(){
    highscoresWrapper.removeAttribute('class', 'hide');
    startscreen.setAttribute('class', 'hide');
    endScreen.setAttribute('class', 'hide');
    clearHighscores(); // When clicking on Highscores link, remove existing highscores from page to prevent duplication
    renderHighScore();
  });

  // Clear highscores from page
  function clearHighscores() {
    while (highScores.hasChildNodes()) {
      highScores.removeChild(highScores.firstChild);
    };
  };
  
  // Clear localstorage
  clear.addEventListener('click', function() {
    localStorage.clear(); // Empty localstorage
    clearHighscores();
  });

  // Click to start quiz
  startBtn.addEventListener ('click', startQuiz);
  
  

