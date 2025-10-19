const questions = [
    {
        question : "What is the capital of France?",
        answer : [
            {text : "Berlin", correct: false},
            {text : "Madrid", correct: false},
            {text : "Paris", correct: true},
            {text : "Rome", correct: false}
        ]
    },
    {
        question : "Which planet is known as the Red Planet?",
        answer : [
            {text : "Earth", correct: false},
            {text : "Mars", correct: true},
            {text : "Jupiter", correct: false},
            {text : "Saturn", correct: false}
        ]
    },
    {
        question : "What is the largest ocean on Earth?",
        answer : [
            {text : "Atlantic Ocean", correct: false},
            {text : "Indian Ocean", correct: false},
            {text : "Pacific Ocean", correct: true},
            {text : "Arctic Ocean", correct: false}
        ]
    }
];
const questionElement = document.getElementById("question");
const ansbtn = document.getElementById("ansbtn");
const nextbtn = document.getElementById("next-btn");

let currQuestionIndex = 0;
let score  =0;


function startquiz() {
    currQuestionIndex = 0;
    score = 0;
    nextbtn.innerHTML ="Next";
    showquestion();
}

function showquestion() {
    resetstate();
    let currQuestion = questions[currQuestionIndex];
    let qNo = currQuestionIndex + 1; 
    questionElement.innerHTML = qNo + ". "+ currQuestion.question;
    currQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansbtn.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",  selectans);
    })

}
function resetstate() {
    nextbtn.style.display = "none";
    while(ansbtn.firstChild) {
        ansbtn.removeChild(ansbtn.firstChild);
    }
}
function selectans(e) {
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct ;
    if(iscorrect) {
        selectedbtn.classList.add("correct");
        score++;
    }
    else {
        selectedbtn.classList.add("incorrect");

    }
    
    Array.from(ansbtn.children).forEach(button => {
        if(button.dataset.correct) {
            button.classList.add("correct");
        }
        button.disabled = true;
        
    });
    nextbtn.style.display = "block";
}

nextbtn.addEventListener("click", () => {
    if(currQuestionIndex < questions.length - 1) {
        currQuestionIndex++;
        showquestion();
    }
    else {
        showscore();
    }
})
function showscore() {
    resetstate();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextbtn.innerHTML = "Play Again";
    nextbtn.style.display = "block";
    nextbtn.addEventListener("click", startquiz);
}
showquestion();
