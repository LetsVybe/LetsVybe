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

	this.element = this.initializeElement();
}

// Element to show the description.
let Description = function() {
	this.description = null;	// Hold the description.

	this.element = this.initializeElement();
}

// Elements to show the questios.
let Questions = function(questions, answers) {
	this.questions = questions;
	this.answers = answers;
	this.childQuestions = [];
	this.element = this.initializeElement();
	this.submitButton = null;

	this.selectedAnswers = null;
}

// An individual question.
let Question = function(question) {
	this.question = question;
	this.selectedAnswer = null;

	// DOM Elements
	this.element = this.initializeElement();
	this.question = null;		// Div to show the question.
	this.answers = [];			// Div to show the answers.
}

// Elements to show on the action bar.
let ActionBar = function(liked, played) {
	this.liked = liked;			// If the post is liked.
	this.played = played;		// If the post is already played.

	this.element = this.initializeElement();
	this.likeButton = null;
	this.playButton = null;
	this.optionsButton = null;
}













// Initalize the elements in the userHeader div
UserHeader.prototype.initializeElement = function() {
	// TODO: Should return an HTML element
	let userHeader = document.createElement('div');
	// Append files and style it.

	return userHeader;
}

// Get the div element
UserHeader.prototype.getElement = function() {
	return this.element;
}












Description.prototype.initializeElement = function() {
	let description = document.createElement('div');
	// Append other files to it.

	return descirption;
}

Description.prototype.getElement = function() {
	return this.element;
}













Questions.prototype.initializeElement = function() {
	let questions = document.createElement('div');
	// Append other elements and style it.

	return questions;
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
	return question;
}

Question.prototype.getElement = function() {
	return this.submit;
}












ActionBar.prototype.initializeElement = function() {
	let actionBar = document.createElement('div');
	return actionBar;
}

ActionBar.prototype.getElement = function() {
	return this.element;
}

ActionBar.prototype.onLike = function(callback, challengeID) {
	this.likeButton.onclick = function() {
		callback(challengeID); // will both like and unlike
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
	answers: [] 				// array of strings
	correctAnswer: 0 			// An integer
	answerCounts: [0, 0, ...] 	// Array of counts of the answers.
 }
*/
// Create the main div and populate with all the elements.
PostCard.prototype.initialize = function(vybeChallenge) {
	this.userHeader = new UserHeader(vybeChallenge.user.img, vybeChallenge.user.displayName);
	this.description = new Description(vybeChallenge.description);
	this.questions = new Questions(vybeChallenge.questions, vybeChallenge.answers);
	this.actionBar = new ActionBar(liked, answers !== null);

	// Actions for action Bar
	this.actionBar.onLike(vybeChallenge.likePost);
	this.actionBar.onPlay(this.onPlay);

	// Action for clicking the submit button.
	this.questions.onSubmit(vybeChallenge.submit);

	// Style all of them together maybe under the main li.
}

PostCard.prototype.getElement = function() {
	return this.element;
}

PostCard.prototype.onPlay = function() {
	// TODO: vFigure out which one is showing and hide or show.
}