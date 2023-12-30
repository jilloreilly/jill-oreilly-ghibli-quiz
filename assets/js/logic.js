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
  // Either way, the question dissapears after a few seconds and the bext  question appears

// After the last question: 
  // Timer stops
  // Question dissapears
  // Form appears for user to enter their initials
  // Display their score

// User submits form
  // Initials and score get stored in local storage
  // User is taken to the high scores page
  // High scores are listed, sorted highest to lowest
  // User has option to take the quiz again 


