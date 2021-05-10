const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText= document.querySelector('#progressText');
const scoreText= document.querySelector('#score');
const progressBarFull= document.querySelector('#progressBarfull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions=[]

let questions = [
    {
        question: 'what does HTML stand for?',
        choice1: 'Home Tool Markup Language',
        choice2: 'Hyper Text Markup Language',
        choice3: 'Hyperlinks Text Markup Language',
        choice4: 'Hyperlinks and Text Markup Language',
        answer: 2,
    },
    {
        question: 'what does CSS stands for?',
        choice1: 'Creative Style Sheet',
        choice2: 'compact Style Sheets',
        choice3: 'Cascading Style Sheets',
        choice4: 'Creative Simple Sheets',
        answer: 3,
    },
    {
        question: 'what does CMS stand for?',
        choice1: 'Content Mastery System',
        choice2: 'Cascading Management System',
        choice3: 'Core Management System',
        choice4: 'Content Management System',
        answer: 4,
    },
    {
        question: 'What is one of the most popular Javascript librarys?',
        choice1: 'JQuery',
        choice2: 'JavaComm',
        choice3: 'Java',
        choice4: 'JSDB',
        answer: 1,
    },
    {
        question: 'TITLE tag must be within------?',
        choice1: 'Title',
        choice2: 'Form',
        choice3: 'Header',
        choice4: 'body',
        answer: 3,
    }
]
const SCORE_POINTS = 100
const MAX_QUESTIONS=5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length ===0 || questionCounter >MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore',score)
        return window.location.assign('/end.html')
    }
    
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`

    const questionsIndex =Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice'+ number]

    })

    availableQuestions.splice(questionsIndex,1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectdChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
       
       let classToApply=selectedAnswer ==currentQuestion.answer ? 'correct':'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})
incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()