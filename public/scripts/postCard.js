let vybeChallenge1;

// Element to render all functionality of the question
function PostCard() {
    this.showDescriptionContainer = true; 

	// Create the references for dom elements here.
	this.UserHeaderContainer = null; 	// Section to display the user header.
	this.description = null;	// Section to display the description.
	this.questions = null; 		// Section to display the questions.
    this.actionBar = null; 		// Section to allow users to select the actions e.g. play, like, etc.

	this.element = null;
}


// Element to show the challenge posting user information in the postCard.
function UserHeaderContainer(img, displayName) {
	this.userImage = img; 		 // Hold the display picture.
	this.userDisplayName = displayName; // Hold the user display name.

    this.profileImage = null;
    this.element = this.initializeElement();
}

// Element to show the description.
function DescriptionContainer(descirption) {
	this.description = descirption;	// Hold the description.

    this.paragraph = null;
    this.element = this.initializeElement();
}

// Elements to show the questios.
function QuestionsContainer(id, questions, answers) {
    this.challengeID = id;
    this.questions = questions;
    this.answers = answers;
    
    this.childQuestionsContainer = [];
    this.submitButton = null;
	this.selectedAnswers = null;
	this.element = this.initializeElement();
}

// An individual question.
function QuestionContainer(question, questionID, answer) {
    this.questionID = questionID;
    this.question = question;
    this.answer = answer;

    // DOM Elements
    this.questionAsked = null;		        // Div to show the question.
    this.answersForm = null;			    // Form to show the answers.
    this.form = null;
	this.element = this.initializeElement();
    
}

// Elements to show on the action bar.
function ActionBarContainer(liked, played) {
	this.liked = liked;			// If the post is liked.
	this.played = played;		// If the post is already played.

    this.likeButton = null;
	this.playButton = null;
	this.optionsButton = null;
	this.element = this.initializeElement();
}













// Initalize the elements in the UserHeaderContainer div
UserHeaderContainer.prototype.initializeElement = function() {
	// TODO: Should return an HTML element.
    let UserHeaderContainer = document.createElement('div');
    UserHeaderContainer.setAttribute('class', 'news__header');

    // Define profile Image.
    this.profileImage = document.createElement('img')
    this.profileImage.setAttribute('src',this.userImage)
    this.profileImage.setAttribute('class', 'user-nav__user-photo news__header--img')
    
    // Define user name label.
    this.userNameLabel = document.createElement('label')
    this.userNameLabel.setAttribute('class', 'name-title  news__header--title')
    this.userNameLabel.innerHTML = this.userDisplayName;

    UserHeaderContainer.appendChild(this.profileImage);
    UserHeaderContainer.appendChild(this.userNameLabel);

	return UserHeaderContainer;
}

// Get the div element
UserHeaderContainer.prototype.getElement = function() {
	return this.element;
}


DescriptionContainer.prototype.initializeElement = function() {
    let description = document.createElement('div');
    description.setAttribute('class', 'news__userContent');
    this.paragraph = document.createElement('p');
    this.paragraph.innerHTML = this.description;
    // Append other files to it.
    description.appendChild(this.paragraph);

	return description;
}

DescriptionContainer.prototype.getElement = function() {
	return this.element;
}



QuestionsContainer.prototype.initializeElement = function() {
    // Container for Question(s) (multiple Question Objects)
    let questionsDiv = document.createElement('div');
    let challengeID = this.challengeID;
    let index = 0;
    let answer = -1;
    this.questions.forEach(question => {
        questionID = challengeID + index;
        if (this.answers !== null) {
            console.log(answer, 'before');
            answer = this.answers[index];
            console.log(answer, 'after');
        }
        let questionDiv = new QuestionContainer(question, questionID, answer);
        this.childQuestionsContainer.push(questionDiv);
        questionsDiv.appendChild(questionDiv.getElement());
        index++;
    })
    // Define submit button 
    this.submitButton= document.createElement('button');
    this.submitButton.setAttribute('class', 'postChallengeBtn');
    this.submitButton.innerHTML = "Submit";
    questionsDiv.appendChild(this.submitButton);
	return questionsDiv;
}

QuestionsContainer.prototype.getElement = function() {
	return this.element;
}

QuestionsContainer.prototype.getSelectedAnswers = function() {
	let current = this;
	let selectedAnswers = [];
	this.childQuestionsContainer.forEach(childQuestion => {
		selectedAnswers.push(childQuestion.getSelectedIndex());
	});

	return selectedAnswers;
}

QuestionsContainer.prototype.onSubmit = function(challengeRef, submitPost){
    let  thisRef = this;
	this.submitButton.onclick = function() {
		submitPost(challengeRef, thisRef.getSelectedAnswers());
	}
}











QuestionContainer.prototype.initializeElement = function() {
    let question = document.createElement('div');
    question.setAttribute('class', 'question');

    // might have to create an array of these later
    this.questionAsked = document.createElement('div'); 
    this.questionAsked.setAttribute('id', this.questionID);
    this.questionAsked.innerHTML = this.question.question;

    // Append the question to the div.
    question.appendChild(this.questionAsked)

    // Render the answers with radio button.
    this.form = document.createElement('form');
    for (let i = 0; i < this.question.answerSet.length; i++){
        // Render one answer at a time.
        if (this.answer === -1) {
            console.log('renderingUnattempted');
            this.renderUnattemptedAnswers(this.question.answerSet[i], i);
        } else {
            this.renderAttemptedAnswers(this.question.answerSet[i], i);
        }
    }

    question.appendChild(this.form);
	return question;
}

QuestionContainer.prototype.getElement = function() {
	return this.element;
}

// Depending on the number of answers, this function will create the raido button 
// and relative label and append to a form element.
QuestionContainer.prototype.renderUnattemptedAnswers = function(possibleAnswer, answerNum) {
    // Div to store all answers.
    let radioDivContainer = document.createElement('div')
    radioDivContainer.setAttribute('class', 'radio')

    // Label to house an asnwer.
    let questionLabel = document.createElement('label')
    let radioInput = document.createElement('input')

    // Radio buttons inside label.
    radioInput.setAttribute('type', 'radio')
    radioInput.setAttribute('name', this.questionID);
    radioInput.setAttribute('value', answerNum);
    questionLabel.innerHTML = possibleAnswer

    // Complete the rendered answer.
    questionLabel.prepend(radioInput)
    radioDivContainer.appendChild(questionLabel)

    // Append the rendered answer to the form
    this.form.appendChild(radioDivContainer)
    
}

QuestionContainer.prototype.renderAttemptedAnswers = function(possbileAnswer, answerNum) {
    let placeholder = document.createElement('p');
    placeholder.innerHTML = 'Answer has been given.';
    this.form.append(placeholder)
}

// Get the selected answer from the current question div
QuestionContainer.prototype.getSelectedIndex = function() {
    // $(`input[type='radio'][name='${questionID}']:checked`).val();
    return parseInt($(`input[type='radio'][name='${this.questionID}']:checked`).val());
}









ActionBarContainer.prototype.initializeElement = function() {
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

ActionBarContainer.prototype.getElement = function() {
	return this.element;
}

ActionBarContainer.prototype.onLike = function(challengeRef, likePost) {
	this.likeButton.onclick = function() {
		likePost(challengeRef); // will both like and unlike
	}
}

ActionBarContainer.prototype.onPlay = function(that) {
	// TODO: change the description and show questions.
	this.playButton.onclick = function() {
		that.onPlay();
	}
}








/*
 vybeChallenge {
    challengeID
	description	= ''	// DescriptionContainer
	questions = [question0, question1, ... ] // See question type.
	likes = []			// Uids of users who liked.
	answers: null if not answered otherwise [ans0, ...] // Array of users who answered the question.
	user: {
        uid:
		img:
		displayName:
	}
	liked: true/false
 }
 question {
	question: 					// The question string
	answerSet: [] 				// array of strings
	correctAnswer: 0 			// An integer
 }
*/
// Create the main div and populate with all the elements.
PostCard.prototype.initialize = function(vybeChallenge) {
    console.log(vybeChallenge, 'challenge');
	this.userHeader = new UserHeaderContainer(vybeChallenge.user.img, vybeChallenge.user.displayName);
    this.description = new DescriptionContainer(vybeChallenge.description);
    // TODO: If the user has already answered the question then render the result instead of question.
	this.questions = new QuestionsContainer(vybeChallenge.challengeID, vybeChallenge.questions, vybeChallenge.answers);
	this.actionBar = new ActionBarContainer(vybeChallenge.liked, vybeChallenge.answers !== null);

	// Actions for action Bar
	this.actionBar.onLike(vybeChallenge, vybeChallenge.likePost);
    this.actionBar.onPlay(this);

	// Action for clicking the submit button.
	this.questions.onSubmit(vybeChallenge, vybeChallenge.submitPost);

    // Style all of them together maybe under the main li.
    this.element = document.createElement('div');
    this.element.setAttribute('class', 'news');

    this.element.appendChild(this.userHeader.getElement());
    this.element.appendChild(this.questions.getElement());
    this.element.appendChild(this.description.getElement());
    this.element.appendChild(this.actionBar.getElement());

    this.toggleAnswers();

}

PostCard.prototype.toggleAnswers = function() {
    if (this.showDescriptionContainer){
        this.description.element.style.display = 'block';
        this.questions.element.style.display = 'none';
    } else {
        this.description.element.style.display = 'none';
        this.questions.element.style.display = 'block';
    }
}

PostCard.prototype.getElement = function() {
	return this.element;
}

PostCard.prototype.onPlay = function() {
    this.showDescriptionContainer = ! this.showDescriptionContainer;
    this.toggleAnswers();
	console.log('play the game?');
}


// window.onload = function(){
//     console.log('Window loaded');
//     let vybeChallenge = function(){
//         this.description = 'This is a description';
//         this.questions = [{
//             id: 0,
//             question: 'What is love?',
//             answerSet: ['Nothing', 'Really', 'Matters.', 'oooo!'],
//             correctAnswer: 0,
//             answerCounts: [0, 0, 0, 0]
//         }, {
//             id: 1, 
//             question: 'What is not love?',
//             answerSet: ['Nothing', 'Really', 'Matters.', 'oooo!'],
//             correctAnswer: 0,
//             answerCounts: [0, 0, 0, 0]
//         }];
//         this.likes = []
//         this.answerSet = null;
//         this.liked = false;
//         this.user = {
//             img: 'https://firebasestorage.googleapis.com/v0/b/letsvybe-e4796.appspot.com/o/photos%2F6camYcS3oyQYTidszB3qXeuL9TT2%2Fimages.png?alt=media&token=a67b3720-f659-450d-98f4-5bac461a3660',
//             displayName: 'Bijesh Subedi'
//         }
//     }

//     vybeChallenge.prototype.likePost = function(){
//         console.log('Trying to like?');
//     }

//     vybeChallenge.prototype.submit = function(selectedAnswers){
//         console.log(selectedAnswers);
//     }

//     vybeChallenge1 = new vybeChallenge();
//     vybeChallenge2 = new vybeChallenge();
//     vybeChallenge2.questions[0].id = 3;
//     vybeChallenge2.questions[1].id = 4;
//     console.log(vybeChallenge1);

//     aPost = new PostCard();

//     aPost.initialize(vybeChallenge1);
//     let ul = document.getElementById('feed-list');
//     var li = document.createElement('li');
//     li.appendChild(aPost.element);
//     ul.insertBefore(li, ul.firstChild);

//     bPost = new PostCard();
    
//     bPost.initialize(vybeChallenge2);
//     var li = document.createElement('li');
//     li.appendChild(bPost.element);
//     ul.insertBefore(li, ul.firstChild);
// }