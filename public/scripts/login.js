/**
 *  This document has functions to login with the following auths:
 *      1. Google
 *      2. Facebook
 *      3. Linked In
 *      4. LetsVybe
 */

/**
 *  GOOGLE LOGIN
 */
function toggleLoginWithGoogle(){
    if( firebase.auth().currentUser){
        // logout the vyber
        firebase.auth().signOut();
        // end logout
    }
    else{
        // login the vyber using Google account
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(user => {
                document.location.href = "profile.html";
            }).catch(error => {
            console.log(error);
        });
        // end login
    }

}

/**
 *  FACEBOOK LOGIN
 *
 *  after a user signs in for the first time to LetsVybe using a Facebook account,
 *  the user name, password, phone number, and/or auth provider information are
 *  stored in a new user account within LetsVybe.
 *
 */
function loginWithFacebook(){                    // CHANGE TO TOGGLE AFTER SEEING IT WORKS
    // console.log("We here")
    // window.fbAsyncInit = function() {
    //     FB.init({
    //         appId      : '244309806262108',
    //         cookie     : true,
    //         xfbml      : true,
    //         version    : 'v3.1'
    //     });
    //
    //     FB.AppEvents.logPageView();
    if( firebase.auth().currentUser ){
        //logout the vyber
        firebase.auth().signOut();
        // end logout

    }
    else{
        // login the vyber using Facebook account
        let provider = new firebase.auth.FacebookAuthProvider()
        provider.addScope('user_location') // could do this for other info
        // to localize the provider's OAuth flow to the user's preferred language
        firebase.auth().languageCode = 'fr_FR';
        // signInWithPopup
        firebase.auth().signInWithPopup(provider).then(function(result){
            // this gives a Facebook access token.
            // it can be used to access the Facebook API
            var token = result.credential.accessToken;
            // the signed-in user info
            var user = result.user;

        }).catch(function(error){
            // handle errors here
            var errorCode = error.code;
            var errorMessage = error.message;
            // the email of the user's account used
            var email = error.email;
            // the firebase.auth.AuthCredential type that was used
            var credential = error.credential;
        });
    }
}



/**
 *  LETS VYBE LOGIN
 */

/**
 * Handles the sign in button press to login using a LetsVybe account
 */
function toggleLoginWithLetsVybe() {

    if (firebase.auth().currentUser) {
        // logout the vyber
        firebase.auth().signOut();
        // end logout

    } else {

        // start login field validation
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        // end login field validation


        // login the vyber using LetsVybe account
        // --- start auth with email and password
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            document.getElementById('quickstart-sign-in').disabled = false;
            // [END_EXCLUDE]
        });
        // --- end auth with email and password
        // end login
    }
    document.getElementById('quickstart-sign-in').disabled = true;
}
/**
 * Handles the sign up button press.
 */
function registerWithLetsVybe() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    // start register field validation
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    // end register field validation


    // Sign in with email and pass.
    // start createwithemail            NEED TO SEE IF THIS LOGS A USER IN AS WELL
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
    // [END createwithemail]
}
/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
    // start sendemailverification
    firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // start exclude
        alert('Email Verification Sent!');
        // end exclude
    });
    // end sendemailverification
}
function sendPasswordReset() {
    var email = document.getElementById('email').value;
    // start sendpasswordemail
    firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        // start exclude
        alert('Password Reset Email Sent!');
        // end exclude
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // start exclude
        if (errorCode == 'auth/invalid-email') {
            alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
            alert(errorMessage);
        }
        console.log(error);
        // end exclude
    });
    // end sendpasswordemail
}
/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
    // Listening for auth state changes.
    // start authstatelistener
    firebase.auth().onAuthStateChanged(function(user) {
        // start exclude silent
        document.getElementById('quickstart-verify-email').disabled = true;
        // end exclude
        if (user) {
            // then user is signed in so do the following:
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // start exclude
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            if (!emailVerified) {
                document.getElementById('quickstart-verify-email').disabled = false;
            }
            // end exclude
        } else {
            // then user is signed out so do the following:
            // start exclude
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            document.getElementById('quickstart-sign-in').textContent = 'Sign in';
            document.getElementById('quickstart-account-details').textContent = 'null';
            // end exclude
        }
        // start exclude silent
        document.getElementById('quickstart-sign-in').disabled = false;
        // end exclude
    });
    // end authstatelistener
    document.getElementById('quickstart-sign-in').addEventListener('click', toggleLoginWithLetsVybe, false);
    document.getElementById('quickstart-sign-up').addEventListener('click', registerWithLetsVybe, false);
    document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
    document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
}
window.onload = function() {
    initApp();
};
