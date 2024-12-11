const toggleCheckbox = document.getElementById("mode-toggle");
const body = document.body;

if (body.classList.contains("dark-mode")) {
  toggleCheckbox.checked = true;
}

toggleCheckbox.addEventListener("change", () => {
  if (toggleCheckbox.checked) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
  }else{
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
  }
});



const questions = [

  // Sant/Falskt-svar
  {
      question: "Solen är en medelstor stjärna.",
      type: "true-false",
      options: ["Sant", "Falskt"],
      correctAnswer: ["Sant"],
  },
  {
      question: "Den röda planeten är Venus.",
      type: "true-false",
      options: ["Sant", "Falskt"],
      correctAnswer: ["Falskt"],
  },


  // Multiple Choice-svar
  {
      question: "Vad är namnet på vår galax?",
      type: "multiple-choice",
      options: ["Andromedagalaxen", "Vintergatan", "Triangelgalaxen", "Stora Magellanska molnet"],
      correctAnswer: ["Vintergatan"],
  },
  {
      question: "Vilken är den största planeten i vårt solsystem?",
      type: "multiple-choice",
      options: ["Saturnus", "Jupiter", "Uranus", "Neptunus"],
      correctAnswer: ["Jupiter"],
  },
  {
      question: "Vad kallas det ljusfenomen som skapas när solvinden kolliderar med jordens atmosfär?",
      type: "multiple-choice",
      options: ["Supernova", "Aurora Borealis", "Kometens svans", "Meteorsvärm"],
      correctAnswer: ["Aurora Borealis"],
  },


  // Checkbox-svar
  {
      question: "Vilka av följande planeter har ringar?",
      type: "checkbox",
      options: ["Mars", "Saturnus", "Uranus", "Jupiter"],
      correctAnswer: ["Saturnus", "Uranus", "Jupiter"],
  },
  {
      question: "Vilka av följande är dvärgplaneter?",
      type: "checkbox",
      options: ["Europa", "Haumea", "Makemake", "Ganymedes"],
      correctAnswer: ["Haumea", "Makemake"],
  },
  {
      question: "Vilka av dessa himlakroppar tros kunna hysa liv?",
      type: "checkbox",
      options: ["Europa", "Titan", "Deimos", "Io"],
      correctAnswer: ["Europa", "Titan"],
  },
  {
      question: "Vilken är den hetaste planeten i solsystemet?",
      type: "radio",
      options: ["Venus", "Merkurius", "Mars", "Jupiter"],
      correctAnswer: ["Venus"],
  },
  {
      question: "Vilken himlakropp kallas ofta för 'Jordens tvilling'?",
      type: "radio",
      options: ["Mars", "Venus", "Merkurius", "Pluto"],
      correctAnswer: ["Venus"],
  },
  {
      question: "Vilket namn har de två rymdfarkoster som nu har lämnat vårt solsystem?",
      type: "multiple-choice",
      options: ["Apollo och Gemini", "Pioneer 10 och 11", "Voyager 1 och 2", "Cassini och Galileo"],
      correctAnswer: ["Voyager 1 och 2"],
  },
  {
      question: "Vilken planet roterar 'baklänges' jämfört med de andra?",
      type: "multiple-choice",
      options: ["Jupiter", "Uranus", "Mars", "Venus"],
      correctAnswer: ["Venus"],
  },
];



const quizContainer = document.getElementById("quiz-container");
const actionButton = document.getElementById("action-button");
let currentQuestionIndex = 0;
let score = 0


function displayQuestion() {
  const questionData = questions[currentQuestionIndex];
  quizContainer.innerHTML = ""; 

  const questionEl = document.createElement("h3");
  questionEl.textContent = questionData.question;
  quizContainer.appendChild(questionEl);

  questionData.options.forEach(option => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = questionData.type === "checkbox" ? "checkbox" : "radio"; 
    input.name = `answer-${currentQuestionIndex}`; 
    input.value = option;
    label.appendChild(input);
    label.append(option);
    quizContainer.appendChild(label);
    quizContainer.appendChild(document.createElement("br"));
  });
}



actionButton.addEventListener("click", () => {
  if (actionButton.textContent === "Starta Quiz") {
     
    

    displayQuestion();
    actionButton.textContent = "Nästa fråga"; 
  } else if (actionButton.textContent === "Nästa fråga") {
    
    checkAnswer(); 
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      
      quizContainer.innerHTML = "<h3>Du har slutfört quizet!</h3>";
      actionButton.textContent = "Se ditt resultat";
    }
  } else if (actionButton.textContent === "Se ditt resultat") {
    
    showResults(); 
    actionButton.textContent ="Spela igen";
  } else if (actionButton.textContent === "Spela igen"){
    restartQuiz();
  }
});

let answers =[];

function checkAnswer(){
  const questionInfo = questions[currentQuestionIndex];
  const pickedAnswers = [...document.querySelectorAll("input[name='answer-" + currentQuestionIndex +"']:checked")].map(input => input.value);

  const isCorrect = questionInfo.correctAnswer.every(answer => pickedAnswers.includes(answer)) && pickedAnswers.length ===questionInfo.correctAnswer.length;

  answers[currentQuestionIndex] = isCorrect? 'Rätt':'Fel';

    if (isCorrect) {
      score++;
      answers[currentQuestionIndex] = 'Rätt';
    }else{
      answers[currentQuestionIndex] = 'Fel';
    }
}


function checkScore(correctAnswers, totalQuestions){
  const procent = ((correctAnswers/ totalQuestions) * 100).toFixed(0);  // Tycker det ser fult ut med decimalerna, därför jag valt utan! .toFixed(1);
  let yourscore ="";
  let color = "";
  let backgroundColor = "";
  let border = "";
  let borderRadius = "";
  let padding = "";
  let letterspacing= "";
  let fontSize = "";
  


  
  if (procent > 75){
    yourscore = `Du: ${procent}% rätt. Riktigt bra jobbat! `;
    color = "green";

    backgroundColor = "black";
    border =  "4px solid #ffffffbe";
    borderRadius = "35px";
    padding = "25px";
    letterspacing = "2px";
    fontSize ="16px";
    


  }else if (procent >= 50){
    yourscore = `Du fick: ${procent}% rätt. Bra.`;
    color = "orange";
    backgroundColor = "black";
    border =  "4px solid #ffffffbe";
    borderRadius = "35px";
    padding = "25px";
    letterspacing = "2px";
    fontSize ="16px";




  }else{
    yourscore = `Du fick: ${procent}% rätt. Underkänt, försök igen!`;
    color = "red";
    backgroundColor = "black";
    border =  "4px solid #ffffffbe";
    borderRadius = "35px";
    padding = "25px";
    letterspacing = "2px";
    fontSize ="16px";
    columns="2px";
    

  }


  return {
    procent: procent,
    yourscore: yourscore,
    color : color,
    backgroundColor : backgroundColor,
    border: border,
    borderRadius: borderRadius,
    padding: padding,
    letterspacing: letterspacing,
    fontSize: fontSize,
    columns: columns,

  };
}



function showResults(){
  const result = checkScore(score, questions.length);

  let displayResult = `
  <h3 style= "color: ${result.color}">Ditt Resultat</h3>
  <p>Du hade ${score} av ${questions.length} rätt!</p>
  <p>${result.yourscore}</p>
  <hr>
  <h4> Frågor och svar:</h4>
  `;

  questions.forEach((question, index) => {
    const pickedAnswers = [...document.querySelectorAll(`input[name="answer-${index}"]:checked`)].map(input => input.value);
    const isCorrect = question.correctAnswer.every(answer => pickedAnswers.includes(answer)) && pickedAnswers.length === question.correctAnswer.length;

 
    let feedback = answers[index] === 'Rätt' ? "Rätt!" : "Fel!";
    let feedbackColor = answers[index] === 'Rätt' ? "green" : "red";


    
    displayResult +=`
        <div style="margin-bottom: 10px;">
        <strong>Fråga ${index + 1}: ${question.question}</strong><br>
        Svarade: ${pickedAnswers.join(', ')}<br>
        <span style="color: ${feedbackColor}">${feedback}</span>
        <hr>
        </div>`;


  });


  quizContainer.innerHTML = displayResult;
  quizContainer.style.backgroundColor = result.backgroundColor;
  quizContainer.style.border = result.border;

}

  function restartQuiz(){
    currentQuestionIndex = 0;
    score = 0; 
    actionButton.textContent ="Starta Quiz";
    quizContainer.innerHTML = "<h3>Kör Quizet igen</h3>";

    quizContainer.style.backgroundColor ="";
    quizContainer.style.borderRadius="";
    quizContainer.style.padding="";
    quizContainer.style.letterSpacing="";
    quizContainer.style.border="";
    quizContainer.style.fontSize="";
  }
