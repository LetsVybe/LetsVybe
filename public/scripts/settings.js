let databaseRef;
let user;
let domElements;
let userRef;
let storageRef;

let debug = true;

// When the window loads.
window.onload = function () {
    // Grab a reference to the firestore.
    databaseRef = firebase.firestore();

    // Grab a reference to the cloud storage.
    storageRef = firebase.storage().ref();

    // Firebase recommended settings for the firestore.
    databaseRef.settings({timestampsInSnapshots: true});

    // Listen for the initialization of the currentUser in firebase.
    firebase.auth().onAuthStateChanged(user => {
        // If user exists continue with the rest of the retrieval.
        if (user){

            var navPhoto = document.getElementById("navPhoto")
            var navName = document.getElementById("nav-name")
            navPhoto.setAttribute('src', user.photoURL);

            navName.innerHTML = user.displayName
            navName.setAttribute('style', 'color: #fff;')
            console.log(navPhoto)
            if (debug) console.log('User: ', user);


            // Get the user from the database.
            let uid = firebase.auth().currentUser.uid;
            userRef = databaseRef.collection('users').doc(uid);

            domElements = new domElementsPrototype();
            domElements.initialize(); // Sets all the id and connections.

            // Create a user prototype to store information locally and update it's field.
            user = new userPrototype();
            user.retrieveUser(domElements, userRef);  // Also populates all the field in the document.


            domElements.setUpOnClickActions(user);


            
            uid = user.uid;  // This is taking up unnecessary space.  We always have user and can always reference user.uid in constant time (k).


        } 
        // Otherwise redirect to the login page.
        else {
            // TODO: Find how to redirect the page. 
        }
    });

    
}

function updateUser(){
$(".userName").click(function () {
        $(".updateUserName").toggle()
        });
}


function updateDisplayName(){
$(".displayName").click(function () {
        $(".updateDisplayName").toggle()
        });
}


function updatePassword(){
$(".password").click(function () {
        $(".updatePassword").toggle()
        });
}


function updateAge(){
    $(".age").click(function () {
        $(".updateAge").toggle()
        });
}

function updatePhoneNumber(){
    $(".phoneNumber").click(function () {
        $(".updatePhoneNumber").toggle()
        });

}

function updateEmail() {
    $(".email").click(function () {
        $(".updateEmail").toggle()
        });
}

function updateGender(){
    $(".gender").click(function () {
        $(".updateGender").toggle()
        });
}

function updateAreaCode(){
    $(".areaCode").click(function () {
        $(".updateAreaCode").toggle()
        });
}