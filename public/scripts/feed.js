const page = document.querySelector("#feed-container");
let uid;
let answers_ref;
let questionsRef;
let vybeChallengesRef;
let add_vybe_challenge = document.querySelector('.add-vybe-challenge');
let users_ref;
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
function VybeChallenge(){
    this.questions = [];
    this.date = Date.now();
    this.dislikes = 0;
    this.likes = 0;
    this.private = false;
    this.tags = [];
    this.uid = uid;
}

VybeChallenge.prototype.addQuestion = function(questionID, validated){
    if(validated) {
        console.log("Pushing question: ", questionID);
        this.questions.push(questionID);
    } else{
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

VybeChallenge.prototype.uploadChallenge = function(){
    vybeChallengesRef.add({
        questions: this.questions,
        date: this.date,
        dislikes: this.dislikes,
        likes: this.likes,
        private: this.private,
        tags: this.tags,
        uid: this.uid
    }).then(result => {console.log('successfully uploaded challenge')}).catch(error => {console.log(error.message)});
}

/**
 * Question
 * @param question: a user input string
 * @param answerSet: a list of user input strings represent possible answers to a question
 * @param answerCorrect: an integer in {0, 1, 2, 3}
 * @param answerCount = an array representing the integer count of people who answered each question
 * @param answerUsersn = an array of users who answered answern where n is in {0, 1, 2, 3}
 * @param uid: the id of the user who created the question object
 * @constructor
 *   - input: question, answer0, answer1, answer2, answer3, answerCorrect, uid from forms on feed.html
 *   - output: Question object
 *@uploadQuestion
 *   - inputs a vybeChallenge object and an upload indicator
 */
function Question(question, answer0, answer1, answer2, answer3, answerCorrect, uid){
    this.question = question;
    this.answerSet = [answer0, answer1, answer2, answer3];
    this.answerCorrect = answerCorrect;
    this.answerCount = [0, 0, 0, 0];
    this.answerUsers0 = [];
    this.answerUsers1 = [];
    this.answerUsers2 = [];
    this.answerUsers3 = [];
}

Question.prototype.uploadQuestion = function(vybeChallenge, upload){
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
        if (upload){
            vybeChallenge.uploadChallenge();
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


window.onload = function(){

    // get firestore
    //    We want this inside because firebase takes time to load
    database_ref = firebase.firestore();

    // this is so because firebase recommends doing this
    database_ref.settings({/* your settings... */ timestampsInSnapshots: true});

    // more database refs
    vybeChallengesRef = database_ref.collection('vybeChallenges');
    questionsRef = database_ref.collection('questions');

    // If a user is logged in, load their information
    // Else redirect them to the login/register page, which is the landing page, index.html.
    firebase.auth().onAuthStateChanged(user => {
        if (user){
            uid = user.uid;  // This is taking up unnecessary space.  We always have user and can always reference user.uid in constant time (k).
        } else {
            document.location.href = "index.html";
        }
    });


    // Create a Vybe Challenge
    // This currently only lets the vyber create one question per vybe challenge
    var createVybeChallengeDiv = document.getElementById('create-vybe-challenge');
    createVybeChallengeDiv.addEventListener('click', function(){

        // Create a new VybeChallenge object
        let vybeChallenge = new VybeChallenge(
            //document.querySelector('#add-tags').value,
        );

        // Need to validate question input here
        validated = false;
        // do validation and inside conditional change validation to true
        validated = true;

        // Create a new Question object
        //     - grab user input form data and place into a Question object
        let question = new Question(
            document.querySelector('#upload').value,
            document.querySelector('#add-answer0').value,
            document.querySelector('#add-answer1').value,
            document.querySelector('#add-answer2').value,
            document.querySelector('#add-answer3').value,
            document.querySelector('#add-answer-correct').selectedIndex,
            uid
        );

        // Add question to vybeChallenge
        question.uploadQuestion(vybeChallenge, true); // when we are done adding multiple questions this will be true to
                                                  // ensure the question has uploaded and that we've gotten the qids
                                                  // for all questions

        // Validate tag input here
        // validated = false;
        // // do validation and inside conditional change validation to true
        // validated = true;

        // // Create Tag objects
        // let tag = new Tag(
        //     document.querySelector('#add-tags').value,
        // );
        // console.log(tag.tag);
        //
        // // Add tag to vybeChallenge
        // tag.uploadTag(vybeChallenge, validated);


    });

    // Create Global Feed
    //    1. Grab All Vybe Challenges
    //    2. For each Vybe Challenge:
    //         a. Create a Vybe Challenge div
    //         b. Get all questions associated with the Vybe Challenge and place in question_set
    //         c. For each question in the question_set:
    //                   i. Create/Fill a question div (child of Vybe Challenge)
    //                  ii. Create answer_set div (child of Vybe Challenge)
    //                 iii. Grab all answers associated with the question and place in answer_set
    //                 iii. For each answer in answer_set do the following:
    //                            a. Create/Fill answer div
    //

    // 1. Grab All Vybe Challenges
    console.log("START:  grab all vybe challenges");

    // To grab all global vybe challenges, we can go to our vybe challenges collection (vybeChallengesRef) and
    // find the set of vybe challenges where for each vybe challenge, the privacy is set to global.
    // querySnapshot is then used to...


    let allGlobalVybeChallenges = getGlobalVybeChallenges(vybeChallengesRef);
    console.log("END:  grab all vybe challenges");

    // REST OF CODE NOT GONE OVER YET; hence, commented out
    // questions_ref = firestore.collection('questions');
    // console.log(questions_ref);
    // users_ref = firestore.collection('users');
    //
    // // Change listener.  Anytime something changes in the db we get that change back.
    // //
    // questions_ref.onSnapshot(snapshot => {
    //     let changes = snapshot.docChanges();
    //     changes.forEach(change => {
    //         if(change.type === 'added'){
    //             get_answer_and_make_post(change.doc);
    //         }
    //     });
    // });

}

function getGlobalVybeChallenges(vybeChallengesRef){
    let allGlobalVybeChallenges = vybeChallengesRef.where("private", "==", false)
        .get()
        .then(function(querySnapshot){
            console.log("... grabbing global challenges ...");
            // if (doc.exists) {
            //     console.log("Document data:", doc.data());
            // } else {
            //     // doc.data() will be undefined in this case
            //     console.log("No global challenges in database or an error");
            // }

            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshot
                console.log(doc.id, '=>', doc.data());
            });
            console.log("... done grabbing global challenges ...")
        })
        .catch(function(error){
            console.log("Error getting global vybe challenge: ", error);
        });
    for (vybeChallenge in allGlobalVybeChallenges){
        console.log(vybeChallenge.id);
    }
    return allGlobalVybeChallenges

}

function setChallengeVyberInfo(uid){
    let challenge_vyber_div = document.createElement('div');
    challenge_vyber_div.setAttribute('class', 'challenge-vyber');
    let challenge_vyber_img = document.createElement('img');
    challenge_vyber_img.setAttribute('class', 'challenge-vyber-img');
    let challenge_vyber_name = document.createElement('p');
    challenge_vyber_name.setAttribute('class', 'challenge-vyber-name')
    challenge_vyber_div.appendChild(challenge_vyber_img);
    challenge_vyber_div.appendChild(challenge_vyber_name);
    users_ref.doc(uid).get()
        .then(result => {
            challenge_vyber_img.src = result.data().photoURL;
            challenge_vyber_name.innerHTML = result.data().name;
        }).catch(error => {
        console.log(error.message);
    })
    return challenge_vyber_div
}

function createChallengeDiv(question, answer){
    console.log(question.data());

    // Create a div to house the challenge
    let challenge_div = document.createElement('div');
    challenge_div.setAttribute('class', 'challenge');

    // Create a div to house the image and name of the vyber whose challenge it is
    let challenge_vyber_div = set_challenge_vyber_info(question.uid);
    challenge_div.appendChild(challenge_vyber_div);

    // Create a div to house the question
    let question_div = set_challenge_question(question.uid);

    // Create a div to house the answer set and create answers within
    //    Note:  answer_set_div has answer_div children
    let answer_set_div = set_challenge_answer_set(question.uid);

    // Add a listener
    option.addEventListener('click', function(){
        let curr_num = this.getAttribute('id').slice(-1);
        let curr_post_id = this.parentElement.parentElement.getAttribute('id');
        for (let j = 0; j < 4; j++){
            document.getElementById(curr_post_id +j).classList.remove('selected');
            document.getElementById(curr_post_id +j).classList.add('not_selected');
        }
        option.classList.add('selected');
        answers_ref.doc(post_id).set({answer: curr_num}, {merge: true});
    })



}
function set_challenge_question(question){
    question_div = document.createElement('div');
    question_div.setAttribute('class', 'question');
    question_div.innerHTML = question.question;
    return question_div
}

function set_challenge_answer_set(question){
    let answer_set_div = document.createElement('div');
    answer_set_div.setAttribute('class', 'answers');
    for( let i = 0; i < question.answers.length; i++){
        let answer_div = document.createElement('p');
        if(post_answer == i){
            answer_div.setAttribute('class', 'option selected');

        } else{
            answer_div.setAttribute('class', 'option not_selected');
        }
        answer_div.innerHTML = question.answers[i];
        answer_set_div.appendChild(answer_div);
    }
}
function create_feed(question_obj, post_answer){



    option.addEventListener('click', function(){
        let curr_num = this.getAttribute('id').slice(-1);
        let curr_post_id = this.parentElement.parentElement.getAttribute('id');
        for (let j = 0; j < 4; j++){
            document.getElementById(curr_post_id +j).classList.remove('selected');
            document.getElementById(curr_post_id +j).classList.add('not_selected');
        }
        option.classList.add('selected');
        answers_ref.doc(post_id).set({answer: curr_num}, {merge: true});
    })


    feed_div.appendChild(question_div);
    feed_div.appendChild(answer_div);

    page.appendChild(feed_div);
}
//function makeVybeChallenge(){};
// //answers_ref = firestore.collection('users').doc(uid).collection('answers');

//
function get_answer_and_make_post(question_obj){


    answers_ref.doc(question_obj.id).get()
        .then(result=>{
            if (result.exists){
                create_feed(question_obj, result.data().answer)

            } else {
                create_feed(question_obj, null)
            }
        }).catch(error=>{
        console.log(error.message);
        create_feed(question_obj, null)
    })
}

// BIJESH: Fill out what this does please. (k).
function validateQuestion(que, ans, idx){
    return true;
}

// });

