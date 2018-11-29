let vybeChallenge1;

// Element to render all functionality of the question
let PostCard = function() {
	// Create the references for dom elements here.
	this.userHeader = null; 	// Section to display the user header.
	this.description = null;	// Section to display the description.
	this.questions = null; 		// Section to display the questions.
	this.actionBar = null; 		// Section to allow users to select the actions e.g. play, like, etc.

	this.element = null;
}

// Element to show the challenge posting user information in the postCard.
let UserHeader = function(img, displayName) {
	this.userImage = img; 		 // Hold the display picture.
	this.userDisplayName = displayName; // Hold the user display name.

    this.profileImage = null;
    this.element = this.initializeElement();
}

// Element to show the description.
let Description = function(descirption) {
	this.description = descirption;	// Hold the description.

    this.paragraph = null;
    this.element = this.initializeElement();
}

// Elements to show the questios.
let Questions = function(questions, answers) {
	this.questions = questions;
    this.answers = answers;
    
    this.childQuestions = [];
    this.submitButton = null;
	this.selectedAnswers = null;
	this.element = this.initializeElement();
}

// An individual question.
let Question = function(question) {
	this.question = question;
	this.selectedAnswer = null;

    // DOM Elements
    this.questionAsked = null;		        // Div to show the question.
    this.answersForm = null;			    // Form to show the answers.
    this.form = null;
	this.element = this.initializeElement();
    
}

// Elements to show on the action bar.
let ActionBar = function(liked, played) {
	this.liked = liked;			// If the post is liked.
	this.played = played;		// If the post is already played.

    this.likeButton = null;
	this.playButton = null;
	this.optionsButton = null;
	this.element = this.initializeElement();
}













// Initalize the elements in the userHeader div
UserHeader.prototype.initializeElement = function() {
	// TODO: Should return an HTML element.
    let userHeader = document.createElement('div');
    userHeader.setAttribute('class', 'news__header');

    // Define profile Image.
    this.profileImage = document.createElement('img')
    this.profileImage.setAttribute('src',this.userImage)
    this.profileImage.setAttribute('class', 'user-nav__user-photo news__header--img')
    
    // Define user name label.
    this.userNameLabel = document.createElement('label')
    this.userNameLabel.setAttribute('class', 'name-title  news__header--title')
    this.userNameLabel.innerHTML = this.userDisplayName;

    userHeader.appendChild(this.profileImage);
    userHeader.appendChild(this.userNameLabel);

	return userHeader;
}

// Get the div element
UserHeader.prototype.getElement = function() {
	return this.element;
}


Description.prototype.initializeElement = function() {
    let description = document.createElement('div');
    description.setAttribute('class', 'news__userContent');
    this.paragraph = document.createElement('p');
    this.paragraph.innerHTML = this.description;
    // Append other files to it.
    description.appendChild(this.paragraph);

	return description;
}

Description.prototype.getElement = function() {
	return this.element;
}



Questions.prototype.initializeElement = function() {
    // Container for Question(s) (multiple Question Objects)
    let questionsDiv = document.createElement('div');
    this.questions.forEach(question => {
        let questionDiv = new Question(question);
        questionsDiv.appendChild(questionDiv.getElement());
    })
    // Define submit button 
    this.submitButton= document.createElement('button');
    this.submitButton.setAttribute('class', 'postChallengeBtn');
    this.submitButton.innerHTML = "Submit";
    questionsDiv.appendChild(this.submitButton);
	return questionsDiv;
}

Questions.prototype.getElement = function() {
	return this.element;
}

Questions.prototype.getSelectedAnswers = function() {
	let current = this;
	let selectedAnswers = [];
	this.childQuestions.forEach(childQuestion => {
		// Get the index of the selected answers for each.

	});

	return selectedAnswers;
}

Questions.prototype.onSubmit = function(callback){
	this.submitButton.onclick = function() {
		callback(this.getSelectedAnswers);
	}
}











Question.prototype.initializeElement = function() {
    let question = document.createElement('div');
    question.setAttribute('class', 'question');

    // might have to create an array of these later
    this.questionAsked = document.createElement('div'); 
    this.questionAsked.setAttribute('id', this.question.id)
    this.questionAsked.innerHTML = this.question.question;

    // Append the question to the div.
    question.appendChild(this.questionAsked)

    // Render the answers with radio button.
    this.form = document.createElement('form');
    for (let i = 0; i < this.question.answerSet.length; i++){
        this.renderAnswerHTML(this.question.answerSet[i], i);
    }

    question.appendChild(this.form);
	return question;
}

Question.prototype.getElement = function() {
	return this.element;
}

// Depending on the number of answers, this function will create the raido button 
// and relative label and append to a form element.
Question.prototype.renderAnswerHTML = function(possibleAnswer, answerNum) {
    // Div to store all answers.
    let radioDivContainer = document.createElement('div')
    radioDivContainer.setAttribute('class', 'radio')

    // Label to house an asnwer.
    let questionLabel = document.createElement('label')
    let radioInput = document.createElement('input')

    // Radio buttons inside label.
    radioInput.setAttribute('type', 'radio')
    radioInput.setAttribute('name', this.question.id);
    radioInput.setAttribute('value', answerNum);
    questionLabel.innerHTML = possibleAnswer

    // Complete the rendered answer.
    questionLabel.prepend(radioInput)
    radioDivContainer.appendChild(questionLabel)

    // Append the rendered answer to the form
    this.form.appendChild(radioDivContainer)
    
}









ActionBar.prototype.initializeElement = function() {
    let actionBar = document.createElement('div');
    actionBar.setAttribute('class', 'news__activity');
    // Define Vybe (Like button).
    this.likeButton = document.createElement("button");
    this.likeButton.setAttribute('class', 'news__activity__btn vybe-btn');
    // Define Play Button.
    this.playButton = document.createElement("button");
    this.playButton.setAttribute('class', 'news__activity__btn play-btn');
    //Define Options Button.
    this.optionButton = document.createElement("button");
    this.optionButton.setAttribute('class', 'news__activity__btn option-btn');

    var likeSpan = document.createElement('span')
    likeSpan.setAttribute('class', 'news__activity--icon')
    likeImage = document.createElement('img')
    likeImage.setAttribute('src', '../images/vybe.png')
    likeImage.setAttribute('class', 'user-nav__icon')
    likeSpan.appendChild(likeImage)
    this.likeButton.appendChild(likeSpan)

    var playSpan = document.createElement('span')
    playSpan.setAttribute('class', 'news__activity--icon')
    playImage = document.createElement('img')
    playImage.setAttribute('src', '../images/play.png')
    playImage.setAttribute('class', 'user-nav__icon')
    playSpan.appendChild(playImage)
    this.playButton.appendChild(playSpan)

    var optionSpan = document.createElement('span')
    optionSpan.setAttribute('class', 'news__activity--icon')
    optionImage = document.createElement('img')
    optionImage.setAttribute('src', '../images/option.png')
    optionImage.setAttribute('class', 'user-nav__icon');
    optionSpan.appendChild(optionImage);
    this.optionButton.appendChild(optionSpan);

    actionBar.appendChild(this.likeButton);
    actionBar.appendChild(this.playButton);
    actionBar.appendChild(this.optionButton);


    return actionBar;
    
}

ActionBar.prototype.getElement = function() {
	return this.element;
}

ActionBar.prototype.onLike = function(callback) {
	this.likeButton.onclick = function() {
		callback(); // will both like and unlike
	}
}

ActionBar.prototype.onPlay = function(callback) {
	// TODO: change the description and show questions.
	this.playButton.onclick = function() {
		callback();
	}
}








/*
 vybeChallenge {
	description	= ''	// Description
	questions = [question0, question1, ... ] // See question type.
	likes = []			// Uids of users who liked.
	answers: null if not answered otherwise [ans0, ...] // Array of users who answered the question.
	user: {
		img:
		displayName:
	}
	liked: true/false
 }
 question {
	question: 					// The question string
	answerSet: [] 				// array of strings
	correctAnswer: 0 			// An integer
	answerCounts: [0, 0, ...] 	// Array of counts of the answers.
 }
*/
// Create the main div and populate with all the elements.
PostCard.prototype.initialize = function(vybeChallenge) {
	this.userHeader = new UserHeader(vybeChallenge.user.img, vybeChallenge.user.displayName);
	this.description = new Description(vybeChallenge.description);
	this.questions = new Questions(vybeChallenge.questions, vybeChallenge.answers);
	this.actionBar = new ActionBar(vybeChallenge.liked, vybeChallenge.answers !== null);

	// Actions for action Bar
	this.actionBar.onLike(vybeChallenge.likePost);
    this.actionBar.onPlay(this.onPlay);
    
    console.log(this.actionBar.playButton);

	// Action for clicking the submit button.
	this.questions.onSubmit(vybeChallenge.submit);

    // Style all of them together maybe under the main li.
    this.element = document.createElement('div');
    this.element.setAttribute('class', 'news');

    this.element.appendChild(this.userHeader.getElement());
    this.element.appendChild(this.questions.getElement());
    this.element.appendChild(this.actionBar.getElement());

}

PostCard.prototype.getElement = function() {
	return this.element;
}

PostCard.prototype.onPlay = function() {
	console.log('play the game?');
}


window.onload = function(){
    console.log('Window loaded');
    let vybeChallenge = function(){
        this.description = 'This is a description';
        this.questions = [{
            question: 'What is love?',
            answerSet: ['Nothing', 'Really', 'Matters.', 'oooo!'],
            correctAnswer: 0,
            answerCounts: [0, 0, 0, 0]
        }];
        this.likes = []
        this.answerSet = null;
        this.liked = false;
        this.user = {
            img: 'https://firebasestorage.googleapis.com/v0/b/letsvybe-e4796.appspot.com/o/photos%2F6camYcS3oyQYTidszB3qXeuL9TT2%2Fimages.png?alt=media&token=a67b3720-f659-450d-98f4-5bac461a3660',
            displayName: 'Bijesh Subedi'
        }
    }

    vybeChallenge.prototype.likePost = function(){
        console.log('Trying to like?');
    }

    vybeChallenge.prototype.submit = function(selectedAnswers){
        console.log('Answers')
    }

    vybeChallenge1 = new vybeChallenge();

    console.log(vybeChallenge1);
    aPost = new PostCard();
    aPost.initialize(vybeChallenge1);
    let ul = document.getElementById('feed-list');
    var li = document.createElement('li');
    li.appendChild(aPost.element);
    ul.insertBefore(li, ul.firstChild);
}