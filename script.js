let userName = '';
let startTime = null;
let correctAnswers = 0;
let incorrectAnswers = 0; // متغير جديد لتتبع الإجابات الخاطئة
let incorrectQuestions = []; // مصفوفة جديدة لتخزين الأسئلة التي أجاب عليها المستخدم بشكل خاطئ
let currentQuestion = 0;
let timerInterval = null;



function askName() {
    userName = prompt('الرجاء إدخال اسمك');
    document.getElementById('welcome').innerText = 'حياك الله ' + userName + '  , اختبر معلوماتك في يوم التأسيس' ;
}

function showQuestion() {
    const question = questions[currentQuestion];
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = '';
    const questionText = document.createElement('h3');
    questionText.innerText = question.question;
    quizDiv.appendChild(questionText);
    question.options.forEach(function(option, index) {
        const button = document.createElement('button');
        button.innerText = option;
        button.style.borderColor = 'black';
        button.addEventListener('click', function() {
            if (index === question.answer) {
                correctAnswers++;
                this.style.borderColor = 'green';
            } else {
                incorrectAnswers++; // زيادة عدد الإجابات الخاطئة
                incorrectQuestions.push(question); // إضافة السؤال إلى الأسئلة التي أجاب عليها المستخدم بشكل خاطئ
                this.style.borderColor = 'red';
            }
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                endQuiz();
            }
        });
        quizDiv.appendChild(button);
    });
}


function updateTimer() {
    const timeElapsed = Date.now() - startTime;
    document.getElementById('timer').innerText = 'الوقت المنقضي: ' + Math.floor(timeElapsed / 1000) + ' ثواني';
}




function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('result').innerText = userName + '، لقد أجبت على ' + correctAnswers + '  أسئلة بشكل صحيح من ' + questions.length + ' سؤال في ' + Math.floor((Date.now() - startTime) / 1000) + ' ثانية!';
    const showIncorrectButton = document.createElement('button');
    showIncorrectButton.id = 'show-incorrect-button'; // إضافة الأنماط إلى الزر
    showIncorrectButton.innerText = 'إظهار الإجابات الخاطئة';
    showIncorrectButton.addEventListener('click', function() {
        const incorrectDiv = document.createElement('div');
        incorrectDiv.id = 'incorrect-answers'; // إضافة الأنماط إلى الإجابات
        incorrectQuestions.forEach(function(question) {
            const questionDiv = document.createElement('div');
            questionDiv.innerText = 'السؤال: ' + question.question + ', الإجابة الصحيحة: ' + question.options[question.answer];
            incorrectDiv.appendChild(questionDiv);
        });
        document.body.appendChild(incorrectDiv);
    });
    document.body.appendChild(showIncorrectButton);
}




document.getElementById('start').addEventListener('click', function() {
    document.getElementById('start').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);  // Update the timer every second
    showQuestion();
});
