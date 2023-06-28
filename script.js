	const questions = [
	{
		question: "Optimal location to construct the power plant",
		answers: [
				{text: "In the city", correct: false},
				{text: "Outside the city" , correct: false},
				{text: "10 miles far away from the city", correct: false},
				{text: "50 miles far away from the city", correct: true},
			]
	},
	{
		question: "Type of environment should be established for a Nuclear Power Plant",
		answers: [ 
				{text: "Located some body of water", correct: true},
				{text: "On the mountain" , correct: false},
				{text: "On the dessert", correct: false},
				{text: "Inside the hinderland", correct: false},
			]
	},
	{
		question: "Ideal Location in Myanmar",
		answers: [
				{text: "Yangon", correct: false},
				{text: "Mandalay" , correct: false},
				{text: "Tanuggyi", correct: false},
				{text: "Mogoke", correct: true},
			]
	},
	{
		question: "Land area requirement",
		answers: [
				{text: "less than 1 square mile", correct: false},
				{text: "1 square mile" , correct: false},
				{text: "A little more than 1 square mile", correct: true},
				{text: "2 square mile", correct: false},
			]
	},
	{
		question: "Estimated financial investment required for construction",
		answers: [
				{text: "Under 4 billions dollars", correct: false},
				{text: "Between 6 billions and 9 billions dollars" , correct: true},
				{text: "Over 10 billions dollars", correct: false},
				{text: "Totally Free", correct: false},
			]
	}
	];

	const questionElement = document.getElementById('question');
	const answersheet = document.getElementById('answersheet')
	const answerButtons = document.getElementById("answer-buttons");
	const nextButton = document.getElementById('next-btn');

	let currentQuestionIndex = 0;
	let score = 0;

	function startQuiz(){
		currentQuestionIndex = 0;
		score = 0;
		nextButton.innerHTML = "Next";
		showQuestion();
	}

	function showQuestion(){
		resetState();
		let currentQuestion =  questions[currentQuestionIndex];
		let questionNo = currentQuestionIndex + 1;
		questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

		currentQuestion.answers.forEach(answer => {
			const button = document.createElement("button"); 
			button.innerHTML= answer.text;
			button.classList.add("btn");
			answerButtons.appendChild(button);
			if(answer.correct){
				button.dataset.correct = answer.correct;
			}
			button.addEventListener("click", selectAnswer);
		});

	}



	function resetState(){
		nextButton.style.display="none";
		while(answerButtons.firstChild){
			answerButtons.removeChild(answerButtons.firstChild);
		}
	}

	function selectAnswer(e){
		const selectedBtn = e.target;
		const isCorrect =  selectedBtn.dataset.correct === "true";
		if(isCorrect){
			selectedBtn.classList.add('correct');
			score++;
		}else{
			selectedBtn.classList.add('incorrect');
		}
		Array.from(answerButtons.children).forEach(button => {
			if(button.dataset.correct === "true"){
				button.classList.add("correct");
			}
			button.disabled = true;
		});
		nextButton.style.display = "block";
	}

	function showScore(){
		resetState();
		if (score<5) {
			questionElement.innerHTML = `You scored ${score} out of ${questions.length}! You can't build Nuclear Plant in Myanmar as your parameters did not meet with the desired outcome.`;

		} else{
			questionElement.innerHTML = `Congratulation!! You can build a Nuclear Power Plant in this place <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235209.25236681502!2d96.28660224055365!3d22.908037957918975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x373360f8693e81fb%3A0x985888ad677fd9b3!2sMogoke!5e0!3m2!1smy!2smm!4v1687967465080!5m2!1smy!2smm" width="80%" height="60%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`

		}
		nextButton.innerHTML="Play Again";
		nextButton.style.display="block";
			};

	function handleNextButton(){

		currentQuestionIndex++;
		if(currentQuestionIndex < questions.length){
			showQuestion();
		}else{
			showScore();
		}

	}

	nextButton.addEventListener("click" ,() => {
		if(currentQuestionIndex < questions.length){
			handleNextButton();
		} else{
			startQuiz();
		}
	});

	startQuiz();
