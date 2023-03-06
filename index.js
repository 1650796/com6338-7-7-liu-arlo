// Your code here
var questionsArr = [
    {
    question: 'What is the smallest domestic cat breed?',
    answer: 'Singapura',
    options: [
        'Singapura',
        'Balinese',
        'Munchkin',
        'Devon Rex',
    ]
    },

    {
    question: 'How long did the oldest cat on record live?',
    answer: '38 years',
    options: [
        '28 years',
        '25 years',
        '38 years',
        '30 years',
    ]
    },

    {
    question: 'How many bones does a typical cat have in its body?',
    answer: '230',
    options: [
        '206',
        '230',
        '216',
        '233',
    ]
    },

    {
    question: 'What is the largest domestic cat breed?',
    answer: 'Ragdoll',
    options: [
        'Turkish Van',
        'Bengal',
        'Maine Coon',
        'Ragdoll',
    ]
    },

    {
    question: 'What is a group of cats called?',
    answer: 'A clowder',
    options: [
        'A clan',
        'A litter',
        'A clowder',
        'A gathering',
    ]
    },
]

var quiz = document.getElementById('quiz');
var score;
var prevScoreText = document.createElement('p');
var startBtn = document.createElement('button');
var currentQuestion
var question = document. createElement('p');
var timer = document.createElement('p');
var timeRemaining;
var timerText;

function playQuiz() {
    score = 0;
    currentQuestion = 0;
    quiz.innerHTML = "";

    startBtn.id = 'start-quiz';
    startBtn.textContent = "Start Quiz"
    quiz.appendChild(startBtn);

    var previousScore = localStorage.getItem('previous-score');
    if (previousScore) {
        prevScoreText.textContent = "Previous Score: " + previousScore;
        quiz.appendChild(prevScoreText);
    }
}

function pullQuestion() {
    timeRemaining = 30;
    quiz.innerHTML = "";

    var questionEl = questionsArr[currentQuestion];
    question.textContent = questionEl.question;
    quiz.appendChild(question);

    var choices = document.createElement('div');
    choices.id = 'choices';
    quiz.appendChild(choices);

    questionEl.options.forEach(function(choice) {
        var answerBtn = document.createElement('button');
        answerBtn.textContent = choice;
        choices.appendChild(answerBtn);
    })
    
timer.id = 'timer';
timer.textContent = timeRemaining;
quiz.appendChild(timer);
startTimer();
    
}

function startTimer() {
    timerText = setInterval(function() {
        timeRemaining--;
        if (timeRemaining > 0) {
            timer.textContent = timeRemaining;
        } else {
            clearInterval(timerText)
            currentQuestion++
            if (currentQuestion < questionsArr.length) {
                pullQuestion();
            } else {
                endQuiz();
            }
        }
    }, 1000)
}

quiz.onclick = function(e) {
    if (e.target.id === 'start-quiz') {
        pullQuestion();
    } else if (e.target.parentElement.id === 'choices' && e.target.tagName === 'BUTTON') {
        if (e.target.textContent === questionsArr[currentQuestion].answer) {
            score++;
        }
        clearInterval(timerText);
        currentQuestion++

        if (currentQuestion < questionsArr.length) {
            pullQuestion();
        } else {
            endQuiz ();
        }
    }
}

function endQuiz() {
    quiz.innerHTML = "";
    var scorePecent = Math.round(score / questionsArr.length * 100) + "%";
    localStorage.setItem('previous-score', scorePecent);
    playQuiz();
}

playQuiz()


