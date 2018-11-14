

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
