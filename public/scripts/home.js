let databaseRef;
let vybeChallengesRef;
let usersRef;
let userInfo;
let debug = true;
let challengesRendered = [];

function VybeQuestion(question, answers, correctAnswer) {
    this.question = question;
    this.answerSet = answers;
    this.correctAnswer = correctAnswer;
}

VybeQuestion.prototype.getObject = function(){
    return {
        question: this.question,
        answerSet: this.answerSet,
        correctAnswer: this.correctAnswer
    }
}

function VybeChallenge() {
    this.challengeID = null;
    this.user = null;               // The dispaly name and picture.

    this.description = null;        // The description of the challenge.
    
    this.questions = [];            // Array of questions.

    this.likes = [];                 // Likes for the vybeChallenge/
    this.private = false;           // Privacy.
    this.answers = null;

    this.tags = [];                 // Related tags.
}

VybeChallenge.prototype.initializeFromDOM = function(question) {
    this.user = userInfo;
    this.description = question.question;
    this.questions = [question];
    this.likes = 0;
}

VybeChallenge.prototype.retrieveChallenge = function(challengeID) {
    // Retrieve tha challenge first.
    vybeChallengesRef.doc(challengeID).get()
        .then(snapshot => {
            this.parseChallenge(snapshot.data());
        })
        .catch(error => {
            console.log(error.message);
        }
    );

    // Retrive the user and questions at the same time.
}

VybeChallenge.prototype.parseChallenge = async function(challenge) {
    this.user = challenge.user;
    this.description = challenge.description;
    this.questions = challenge.questions;
    this.likes = challenge.likes;
    this.private = challenge.private;
    this.tags = challenge.tags;
    await this.getAnswers();
}

VybeChallenge.prototype.getAnswers = async function() {
    await vybeChallengesRef.doc(this.challengeID).collection('answers').doc(userInfo.uid)
        .get()
        .then(result => {
            if (result.exists) {
                this.answers = result.data().answers;
            } else {
                this.answers = null;
            }
        })
}

VybeChallenge.prototype.uploadChallenge = function() {
    // First check the validity of the questions.
    thisChallenge = this;
    uploadDoc = {
        user: this.user,
        description: this.description,
        questions: this.questions,
        likes: this.likes,
        private: this.private,
        tags: this.tags
    };
    console.log(uploadDoc);
    vybeChallengesRef.add(uploadDoc)
        .then((result) => {
            if (debug) console.log('Challenge successfully uploaded.');
        })
        .catch(error => {
            console.log(error.message);
        });
}

// This function is called from other function so we cannot use this keyword.
VybeChallenge.prototype.likePost = function(challengeRef) {
    // TODONOW: Add the users to the likes array.
    if (challengeRef.likes.includes(userInfo.uid)) {
        // The user has already liked the post. Now remove him.
        vybeChallengesRef.doc(challengeRef.challengeID).update({
            likes: firebase.firestore.FieldValue.arrayRemove(userInfo.uid)
        });
        console.log('liked');
        // TODONOW: Remove the user from the array in the ofline object.
    } else {
        // Add the user to the list of liked uids.
        vybeChallengesRef.doc(challengeRef.challengeID).update({
            likes: firebase.firestore.FieldValue.arrayUnion(userInfo.uid)
        });
        console.log('disliked');
        // TODONOW: Add the user to the array in the ofline object.
    }
}

// Function to submit the answers for the vybe challenge.
// This function will be called by a callback function do now use 'this'.
VybeChallenge.prototype.submitPost = function(challengeRef, userAnswers) {
    // Upload answers under the subcollectino answer of the original challenge.
    vybeChallengesRef.doc(challengeRef.challengeID).collection('answers').doc(userInfo.uid)
        .set({
            answers: userAnswers
        })
        .then(() => {
            console.log('Successfully uploaded the answer');
        })
        .catch(error => {
            console.log(error.message);
        })
    
}


window.onload = function() {

    // While firebase finished loading.
    databaseRef = firebase.firestore();
    databaseRef.settings({timestampsInSnapshots: true});

    // Get the reference for vybeChallenge.
    vybeChallengesRef = databaseRef.collection('dummyChallenges');
    usersRef = databaseRef.collection('users');

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
        // When the user is already logged in.
            userInfo = {
                uid: user.uid,
                img: user.photoURL,
                displayName: user.displayName
            }
        } else {
        // Otherwise direct user to the login page.

        }
    });

    // Create a listener to the vybeChallenges: Get it from firebase functions later.
    vybeChallengesRef.onSnapshot(snapshot => {
        snapshot.forEach(challenge => {
            if (! challengesRendered.includes(challenge.id)){
                createPostCard(challenge);
                challengesRendered.push(challenge.id);
            }
        });
    })
}

// Create and render the post in the DOM.
function createPostCard(challenge){
    // Create a challenge first and initialize it.
    let currChallenge = new VybeChallenge();
    currChallenge.challengeID = challenge.id;
    currChallenge.parseChallenge(challenge.data())
        .then(() => {
            // Create a postCard element to push to the dom.
            let currPost = new PostCard();
            currPost.initialize(currChallenge);
            
            // Upload the postCard to the DOM.
            var ul = document.getElementById('feed-list')
            var li = document.createElement('li');
            li.appendChild(currPost.element);
            ul.insertBefore(li, ul.firstChild);
        })
        .catch(error => {
            console.log(error.message);
        });
}

// Create a vybeChallenge object from the user input.
// TODO: Make it able to accepet multiple questions.
function createVybeChallengePrototype() {
    let question = document.getElementById('vybeQuestion').value;
    let answers0, answer1, answer2, answer3;
    answer0 = document.getElementById('answerOne').value;
    answer1 = document.getElementById('answerTwo').value;
    answer2 = document.getElementById('answerThree').value;
    answer3 = document.getElementById('answerFour').value;
    let answers = [answer0, answer1, answer2, answer3];
    let correctAnswer = 0;

    let vybeChallenge = new VybeChallenge();
    let vybeQuestion = new VybeQuestion(question, answers, correctAnswer);
    vybeChallenge.initializeFromDOM(vybeQuestion.getObject());
    vybeChallenge.uploadChallenge();
    
    closeOneModal();
}

function closeOneModal() {
    $('#myModal').modal('hide');
}