var firestore;
var modal = document.getElementById('modal');
var user_ref;
var uid;

window.onload = function(){
    firestore = firebase.firestore();
    firestore.settings({/* your settings... */ timestampsInSnapshots: true});
    user_ref = firestore.collection('users');
    firebase.auth().onAuthStateChanged(user => {
        console.log(user);
        uid = user.uid;
        console.log(uid);
        doesUserExists(user);
    });
};

function doesUserExists(user){
    // Create the user if the user doesn't exists
    let curr_user = user_ref.doc(uid);

    curr_user.get()
        .then(function(result) {
            if (!result.exists){
                curr_user.set({
                    name: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email,
                    phone: null,
                    age: null,
                    sex: null,
                    profileComplete: false,
                    question: {}
                });
                completeProfileInfo(uid);
            } else {
                if (!result.data().profileComplete){
                    completeProfileInfo(uid);
                }
            }

        }).catch(function(error) {
            console.log(error);
    });
}

function setProfilePicture(photoURL){
    document.getElementById('profile-img').src = photoURL;
}

function getFriendsList(friends){
    
}

function completeProfileInfo(uid){
    document.getElementById('modal').style.display='block';
    document.getElementById('modal-question').style.display='block';
    document.getElementById('modal-info').style.display='none';

    // Wait for the press of submit button
    document.getElementById('submit-modal-question').addEventListener('click', function(){
        let nonEmptyInputs = document.querySelector('#option0').value &&
            document.querySelector('#option1').value &&
            document.querySelector('#option2').value &&
            document.querySelector('#option3').value
        let radioSelected = document.querySelector('input[name="option"]:checked');

        if (nonEmptyInputs && radioSelected){
            let correctAnswer = radioSelected.value;
            console.log(user_ref.doc(uid));
            user_ref.doc(uid).update(
                {
                    question: {
                        question: 'Who is your favorite singer?',
                        0: document.querySelector('#option0').value,
                        1: document.querySelector('#option1').value,
                        2: document.querySelector('#option2').value,
                        3: document.querySelector('#option3').value,
                        answer: correctAnswer
                    }
                }
            ).then(
                function(){
                    console.log('d');
                }
            ).catch(
                function(error){
                    console.log(error)
                }
            )
            // Upload the informations
            document.getElementById('modal-question').style.display='none';
            document.getElementById('modal-info').style.display='block';

            document.querySelector('#submit-modal-info').addEventListener('click', function(){

                let name = document.querySelector('#name');
                let age = document.querySelector('#age');

                if (name.value && age.value){
                    user_ref.doc(uid).update(
                        {
                            name: name.value,
                            age: age.value,
                            profileComplete: true
                        }
                    ).then(
                        () => {
                            document.getElementById('modal').style.display='none';
                        }
                    ).catch(
                        error => {
                            console.log(error.message);
                        }
                    )
                } else {
                    window.alert('one or more values are empty');
                }
            })


        } else {
            window.alert('one or more required fields are empty');
        }

    });
}

modal.style.display = 'none';
