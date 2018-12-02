const page = document.querySelector("#feed-container");
let uid;
let answers_ref;
let questionsRef;
let vybeChallengesRef;
let userRef;
let add_vybe_challenge = document.querySelector('.add-vybe-challenge');
let users_ref;
let user;
let firestore;



// LetsVybe Prototypes
/**
 * VybeChallenge
 * @param questions: an empty array to be filled with question objects
 * @param date: the real-time date grabbed as the object is created
 * @param dislikes: integer of people who selected dislike
 * @param likes: integer of people who selected like
 * @param private: a boolean to determine if vybechallenge is private or not
 * @param tags: an empty array to be filled with tag objects
 * @param uid: the user id who created the VybeChallenge object.
 * @constructor
 *   - assumes uid is already grabbed from firestore
 * @addQuestion
 *   - pushes a question to the VybeChallenge questions array
 * @addTag
 *   - pushes a tag to the VybeChallenge tags array
 * @uploadChallenge
 *   - uploads the VybeChallenge object to firestore
 */
function VybeChallenge() {
    this.questions = [];
    this.date = Date.now();
    this.dislikes = 0;
    this.likes = 0;
    this.private = false;
    this.tags = [];
    this.uid = uid;
}

VybeChallenge.prototype.addQuestion = function (questionID, validated) {
    if (validated) {
        console.log("Pushing question: ", questionID);
        this.questions.push(questionID);
    } else {
        console.log("Question not pushed to Vybe Challenge.")
    }
}

// VybeChallenge.protoype.addTag = function(tagID, validated){
//     if(validated){
//         console.log("Pushing tags: ", tagID);
//         this.tags.push(tagID);
//     } else{
//         console.log("Tag not pushed to Vybe Challenge")
//     }
// }

VybeChallenge.prototype.uploadChallenge = function () {
    vybeChallengesRef.add({
        questions: this.questions,
        date: this.date,
        dislikes: this.dislikes,
        likes: this.likes,
        private: this.private,
        tags: this.tags,
        uid: this.uid
    }).then(result => { console.log('successfully uploaded challenge') }).catch(error => { console.log(error.message) });
}

/**
 * Question
 * @param question: a user input string
 * @param answerSet: a list of user input strings represent possible answers to a question
 * @param answerCorrect: an integer in {0, 1, 2, 3}
 * @param answerCount = an array representing the integer count of people who answered each question
 * @param answerUsersn = an array of users who answered answern where n is in {0, 1, 2, 3}
 * @constructor
 *   - input: question, answer0, answer1, answer2, answer3, answerCorrect, uid from forms on feed.html
 *   - output: Question object
 *@uploadQuestion
 *   - inputs a vybeChallenge object and an upload indicator
 */
function Question(question, answer0, answer1, answer2, answer3, answerCorrect) {
    this.question = question;
    this.answerSet = [answer0, answer1, answer2, answer3];
    this.answerCorrect = answerCorrect;
    this.answerCount = [0, 0, 0, 0];
    this.answerUsers0 = [];
    this.answerUsers1 = [];
    this.answerUsers2 = [];
    this.answerUsers3 = [];
}

Question.prototype.uploadQuestion = function (vybeChallenge, upload) {
    questionsRef.add({
        question: this.question,
        answerSet: this.answerSet,
        answerCount: this.answerCount,
        answerUsers0: this.answerUsers0,
        answerUsers1: this.answerUsers1,
        answerUsers2: this.answerUsers2,
        answerUsers3: this.answerUsers3,
    }).then(result => {
        console.log('question added successfully');
        console.log(result);
        // get the id of the question object from result and call the function to update the question id in the challenge
        console.log(result.id);
        vybeChallenge.addQuestion(result.id, true);
        if (upload) {
            vybeChallenge.uploadChallenge();
            var modal = document.getElementById('myModal')
            modal.setAttribute
        }
    }).catch(error => {
        console.log(error.message);
    });
}
// Question.prototype.validate = function(){
//
// }

// function Tag(tag){
//     this.tag = tag
// }
//
// Tag.prototype.uploadTag = function(challenge, uploadChallenge){
//     tagsRef.add({
//         tag: this.tag,
//     }).then(result => {
//         console.log('tag added successfully');
//         console.log(result);
//         console.log(result.id);
//         challenge.addTag(result.id);
//         if (upload){
//             challenge.uploadChallenge();
//         }
//     }).catch(error => {
//         console.log(error.message);
//     });
// }



function createVybeChallengePrototype() {
    console.log("oy")
    var question = document.getElementById('vybeQuestion').value;
    console.log(question)
    var answers0, answer1, answer2, answer3;
    answer0 = document.getElementById('answerOne').value
    answer1 = document.getElementById('answerTwo').value
    answer2 = document.getElementById('answerThree').value
    answer3 = document.getElementById('answerFour').value
    var correctAnswer = parseInt($("input[type='radio'][name='optradio']:checked ").val()) - 1;

    var vybeChallenge = new VybeChallenge();
    var question = new Question(question, answer0, answer1, answer2, answer3, correctAnswer);
    question.uploadQuestion(vybeChallenge, true);
    //    var modalID = '#myModal'
    //    console.log(modalId)
    closeOneModal()
    //function to clear data here

    //reload pages but need a better solution 


}

function closeOneModal() {
    $('#myModal').modal('hide');
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
        this.answers = null;
        this.liked = false;
        this.user = {
            img: ''
        }
    }

    vybeChallenge.prototype.likePost = function(){
        console.log('Trying to like?');
    }

    vybeChallenge.prototype.submit = function(selectedAnswers){
        console.log('Answers')
    }

    // // get firestore
    // //    We want this inside because firebase takes time to load
    // database_ref = firebase.firestore();

    // // this is so because firebase recommends doing this
    // database_ref.settings({/* your settings... */ timestampsInSnapshots: true});

    // // more database refs
    // vybeChallengesRef = database_ref.collection('vybeChallenges');
    // console.log(vybeChallengesRef)
    // userRef = database_ref.collection('users');
    // questionsRef = database_ref.collection('questions');

    // // Create a listner for vybeChallenges
    // vybeChallengesRef
    //     .onSnapshot(
    //         function(querySnapshot){
    //             parseChallenge(querySnapshot)
    //         });
    

    // // If a user is logged in, load their information
    // // Else redirect them to the login/register page, which is the landing page, index.html.
    // firebase.auth().onAuthStateChanged(user => {
    //     if (user){
    //         var navPhoto = document.getElementById("navPhoto")
    //         var navName = document.getElementById("nav-name")
    //         var postAreaPhoto = document.getElementById("postarea-photo")
    //         navPhoto.setAttribute('src', user.photoURL);
    //         postAreaPhoto.setAttribute('src', user.photoURL)

    //         navName.innerHTML = user.displayName
    //         navName.setAttribute('style', 'color: #fff;')
    //         console.log(navPhoto)


            
    //         uid = user.uid;  // This is taking up unnecessary space.  We always have user and can always reference user.uid in constant time (k).
    //     } else {
    //         document.location.href = "index.html";
    //     }
    // });


 
    // // Create Global Feed
    // //    1. Grab All Vybe Challenges
    // //    2. For each Vybe Challenge:
    // //         a. Create a Vybe Challenge div
    // //         b. Get all questions associated with the Vybe Challenge and place in question_set
    // //         c. For each question in the question_set:
    // //                   i. Create/Fill a question div (child of Vybe Challenge)
    // //                  ii. Create answer_set div (child of Vybe Challenge)
    // //                 iii. Grab all answers associated with the question and place in answer_set
    // //                 iii. For each answer in answer_set do the following:
    // //                            a. Create/Fill answer div
    // //

    // // 1. Grab All Vybe Challenges
    // // console.log("START:  grab all vybe challenges");

    // // To grab all global vybe challenges, we can go to our vybe challenges collection (vybeChallengesRef) and
    // // find the set of vybe challenges where for each vybe challenge, the privacy is set to global.
    // // querySnapshot is then used to...


    // // TODO: let allGlobalVybeChallenges = getGlobalVybeChallenges(vybeChallengesRef);

    // // let allGlobalVybeChallenges = getGlobalVybeChallenges(userRef);
    // // console.log(userRef)
    // // console.log("END:  grab all vybe challenges");

    // // REST OF CODE NOT GONE OVER YET; hence, commented out
    // // questions_ref = firestore.collection('questions');
    // // console.log(questions_ref);
    // // users_ref = firestore.collection('users');
    // //
    // // // Change listener.  Anytime something changes in the db we get that change back.
    // // //
    // // questions_ref.onSnapshot(snapshot => {
    // //     let changes = snapshot.docChanges();
    // //     changes.forEach(change => {
    // //         if(change.type === 'added'){
    // //             get_answer_and_make_post(change.doc);
    // //         }
    // //     });
    // // });
    // // window.alert("everything loaded")

    // // TODO: Jorde Integrate this into the front end.
    // // An example of getting the location data.
    // tempUser = { zipCode: '95134' }; // User object should be constructed with the zipCode.
    // getWeatherInformation(tempUser)
    //     .then(weather => {
    //         // When the weather information is extracted this function is called
    //         // with the information about weather in the variable 'weather'.

    //         console.log('Weather json', weather);

    //     })
}

function parseChallenge(querySnapshot) {
    querySnapshot.forEach(function (doc) {
        createFeedPost(doc.data())
    })
}

function getQuestion(questionsRef, qid) {
    let question = questionsRef.doc(qid).get();
    return question
}

/*
Create Feed Post to populate feed (vybeView is container for the feed)
takes a user Object as parameter and extracts properties 
*/
async function createFeedPost(vybechallenge) {
    // Get the required attributes from the vybechallenge.
    let userID = vybechallenge.uid;
    var questionsList = vybechallenge.questions;
    let questions = [];
    let currentUser;

    // Get the question object.
    await questionsList.forEach(question => {
        questionsRef.doc(question).get().then(querySnapshot => {
            questions.push(querySnapshot.data())
        })
    })

    // Get the user to populate name and the photo
    await userRef.doc(userID).get()
        .then(doc => {
            currentUser = doc.data()
        }).catch(error => {
            console.log(error.message);
    });
    renderFeed(currentUser, questions, questionsList);
}

function renderFeed(user, questions, questionsList) {
    // var userAnsweredSet =  firestore.collection.doc(user)
    // console.log(questionsList)
    var questionID = questionsList[0]; // might have to create loop for multiple questions
    // console.log('in  create object is : ')
    // console.log(user.displayName)
    var ul = document.getElementById('feed-list')
    var li = document.createElement('li');

    // var label = document.createElement('label')
    // label.setAttribute('class', 'name-title  news__header--title')
    // label.innerHTML = user.displayName;


    var containerDiv = document.createElement('div')
    containerDiv.setAttribute('class', 'news')

    // var feed = document.createElement('div')
    // feed.setAttribute('class', 'news__header')
    // var profileImage = document.createElement('img')
    // profileImage.setAttribute('src', user.photoURL)
    // profileImage.setAttribute('class', 'user-nav__user-photo news__header--img')

    // var userContent = document.createElement('div');
    // userContent.setAttribute('class', 'news__userContent')
    // userContent.innerHTML = '<p> ' + questions[0].question + '</p>'
    // var vybeButton = document.createElement("button")
    // vybeButton.setAttribute('class', 'news__activity__btn vybe-btn')
    // var span = document.createElement('span')
    // span.setAttribute('class', 'news__activity--icon')
    // var playButton = document.createElement("button")
    // playButton.setAttribute('class', 'news__activity__btn play-btn')
    // var optionButton = document.createElement("button")
    // optionButton.setAttribute('class', 'news__activity__btn option-btn')
    // var newsActivity = document.createElement('div')
    // newsActivity.setAttribute('class', 'news__activity');

    // var vybeSpan = document.createElement('span')
    // vybeSpan.setAttribute('class', 'news__activity--icon')
    // vybeImage = document.createElement('img')
    // vybeImage.setAttribute('src', '../images/vybe.png')
    // vybeImage.setAttribute('class', 'user-nav__icon')
    // vybeSpan.appendChild(vybeImage)
    // vybeButton.appendChild(vybeSpan)

    // var playSpan = document.createElement('span')
    // playSpan.setAttribute('class', 'news__activity--icon')
    // playImage = document.createElement('img')
    // playImage.setAttribute('src', '../images/play.png')
    // playImage.setAttribute('class', 'user-nav__icon')
    // playSpan.appendChild(playImage)
    // playButton.appendChild(playSpan)


    //prevents playSpan HTML Element from firing events from Parent playButton
    playSpan.onclick = function (event) {
        event.stopPropagation();
    }

    //replaces DOM with question and possible answers when the playButton is clicked
    playButton.onclick = function (event) {
        console.log(event)
        var currentElement = event.target;
        var parentElement = currentElement.parentElement;

        var postContainer = parentElement.parentElement;
        var postContainerList = postContainer.children;
        var oldElement = postContainerList[1];

        var newElement = renderQuestions(questions, questionID);
        postContainer.replaceChild(newElement, oldElement);
    }

    var optionSpan = document.createElement('span')
    optionSpan.setAttribute('class', 'news__activity--icon')
    optionImage = document.createElement('img')
    optionImage.setAttribute('src', '../images/option.png')
    optionImage.setAttribute('class', 'user-nav__icon')
    optionSpan.appendChild(optionImage)
    optionButton.appendChild(optionSpan)

    // newsActivity.appendChild(vybeButton)
    // newsActivity.appendChild(playButton)
    // newsActivity.appendChild(optionButton)
    containerDiv.appendChild(feed)
    containerDiv.appendChild(userContent)
    containerDiv.appendChild(newsActivity)
    feed.appendChild(profileImage)
    feed.appendChild(label)

    li.appendChild(containerDiv)
    ul.insertBefore(li, ul.firstChild)
}

// function toggleQuestion(questionObj) {

//     var questionDiv = document.createElement('div')
//     questionDiv.setAttribute('style', 'text-align:center;')
//     var questionAsked = document.createElement('div')
//     questionAsked.innerHTML = questionObj.question

//     var form = document.createElement('form')
//     var radio = document.createElement('div')
//     radio.setAttribute('class', 'radio')

//     questionDiv.appendChild(questionAsked)
//     questionDiv.appendChild(form)
//     form.appendChild(radio)

//     return questionDiv

// }


/* Adds an eventListenter to every play-btn and manipulates DOM when it pressed */
var isVybeClick = false;
var isPlayClick = false;
var isQuestionAnswered = false;

function toggle() {
    document.querySelectorAll(".play-btn").forEach(function (element) {
        element.addEventListener("click", function () {
            if (isVybeClick === false) {
                var re = element.parentNode.parentNode
                var newE = document.createElement('div');
                var submitBtn = document.createElement('button');
                submitBtn.innerHTML = " Submit me "
                newE.innerHTML = renderQuestions()
                console.log(re)
                var userContent = document.getElementById('userContent');
                console.log(userContent)
                re.replaceChild(newE, userContent)
                newE.appendChild(submitBtn)
                // submitBtn.addEventListener('click',function(){
                //     var results = document.createElement('div')
                //     results.innerHTML = "results"
                //     re.replaceChild(results,newE)
                // })
            }
            if (isVybeClick === true)
                window.alert("you already clicked dawg")
            isVybeClick = true

        });
    });

}

//creates HTML to display Questions, takes only one question for now 
function renderQuestions(questions, questionID) {
    console.log(questions)
    //for at least one question
    // var question = questions[0];
    // var mainQuestion = question.question;
    // var possibleAnswer = question.answerSet;

    console.log(question)
    // var questionContainer = document.createElement('div')
    // questionContainer.setAttribute('class', 'question')
    // // might have to create an array of these later
    // var questionAsked = document.createElement('div')
    // questionAsked.setAttribute('id', 'question')
    // questionAsked.innerHTML = mainQuestion
    // questionContainer.appendChild(questionAsked)

    var form = document.createElement('form')
    // form.setAttribute('id',questionID)  


    // for (let i = 0; i < 4; i++) { // for each answer set, create HTML
    //     var radioContainer = document.createElement('div')
    //     radioContainer.setAttribute('class', 'radio')
    //     var questionLabel = document.createElement('label')
    //     var questionInput = document.createElement('input')
    //     questionInput.setAttribute('type', 'radio')
    //     questionInput.setAttribute('name', questionID);
    //     questionInput.setAttribute('value', i);
    //     questionLabel.innerHTML = possibleAnswer[i]
    //     questionLabel.prepend(questionInput)

    //     radioContainer.appendChild(questionLabel)
    //     form.appendChild(radioContainer)
    // }

    // var submitButton = document.createElement('button')
    // submitButton.setAttribute('class', 'postChallengeBtn')
    // submitButton.innerHTML = "Submit"

    submitButton.onclick = function (event) {
        userAnswerInput = $(`input[type='radio'][name='${questionID}']:checked`).val();
        console.log(userAnswerInput)
        var verifyUserAnswer = verifyUserInput(userAnswerInput);
        console.log(verifyUserAnswer)
        if(verifyUserAnswer != null)
        {
        var userAnswer = parseInt(verifyUserAnswer );
        // postAnswerFireBase(questionID,userAnswer);
        }
        else
        {
            window.alert("You must select Valid Input.")
        }

       

        



    }

    // questionContainer.appendChild(form)
    // questionContainer.appendChild(submitButton)

    return questionContainer

}

function postAnswerFireBase(questionID,userAnswer){
    // console.log(questionID , userAnswer)
    // return nothing
}

function verifyUserInput(userAnswerInput){
    if(typeof userAnswerInput != 'undefined' )
        return userAnswerInput
    else
        return null;
}


// Creates the Containers for the weather API

function renderWeatherElement(){
    var weatherContainer = document.createElement('div');
    weatherContainer.setAttribute('class','weatherContainer');
    var weatherContainerImgContainer =  document.createElement('div');
    weatherContainerImgContainer.setAttribute('class','weatherContainer__imgContainer');
    var weatherContainerImgContainerPhoto = document.createElement('img');
    weatherContainerImgContainerPhoto.setAttribute('class','weatherContainer__imgContainer__photo ');
    var weatherContainerWeatherData =  document.createElement('div');
    weatherContainerWeatherData.setAttribute('class','weatherContainer__weatherData');

    // TODO: Create <P> and <Span> elements for day degrees and city


}