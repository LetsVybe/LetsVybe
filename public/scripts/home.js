const page = document.querySelector("#feed-container");
let uid;
let answers_ref;
let questions_ref;
let submit_question = document.querySelector('#submit-question');
let users_ref;


window.onload = function(){
    let firestore = firebase.firestore();
    firestore.settings({/* your settings... */ timestampsInSnapshots: true});

    firebase.auth().onAuthStateChanged(user => {
        if (user){
            uid = user.uid;
            answers_ref = firestore.collection('users').doc(uid).collection('answers');
        } else {
           document.location.href = "index.html";
        }
    });


    questions_ref = firestore.collection('questions');
    users_ref = firestore.collection('users');

    questions_ref.onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if(change.type === 'added'){
                get_answer_and_make_post(change.doc);
            }
        });
    });

}

function set_challenge_vyber_info(uid){
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

function feed(question, answer){
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


function get_answer_and_make_post(question_obj){
    let answer = -1;
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

function validate_question(que, ans, idx){
    return que && ans[0] && ans[1] && ans[2] && ans[3] && idx !== 0;
}


submit_question.addEventListener('click', function(){
    let question = document.querySelector('#upload');
    let option0 = document.querySelector('#option0');
    let option1 = document.querySelector('#option1');
    let option2 = document.querySelector('#option2');
    let option3 = document.querySelector('#option3');
    let correct = document.querySelector('#answer');
    let answers = [option0.value, option1.value, option2.value, option3.value];


    if (validate_question(question.value, answers, correct.selectedIndex)){
        questions_ref.add({
            question: question.value,
            answers: answers,
            correct: (correct.selectedIndex + 1).toString(),
            uid: uid
        })

        // Reset all the fields
        question.value = '';
        option0.value = '';
        option1.value = '';
        option2.value = '';
        option3.value = '';
        correct.selectedIndex = 0;
    } else {
        window.alert('One or more fields are invalid');
    }

});

