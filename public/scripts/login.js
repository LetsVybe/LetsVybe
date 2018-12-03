let usersRef;

document.addEventListener("DOMContentLoaded", event => {
	firestore = firebase.firestore();
	const settings = {/* your settings... */ timestampsInSnapshots: true};
    firestore.settings(settings);
	usersRef = firestore.collection('users');

});


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
							console.log(user);
              	routeUser(user);
            }).catch(error => {
            console.log(error);
        });
        // end login
    }

}

/**
 *  FACEBOOK LOGIN
 */
function loginWithFacebook(){                    // CHANGE TO TOGGLE AFTER SEEING IT WORKS
    console.log("We here")
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '244309806262108',
            cookie     : true,
            xfbml      : true,
            version    : 'v3.1'
        });

        FB.AppEvents.logPageView();

    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}



/**
 *  LETS VYBE LOGIN
 */

/**
 * Handles the sign in button press to login using a LetsVybe account
 */
function toggleLoginWithLetsVybe() {
		console.log('in email');
    if (firebase.auth().currentUser) {
        // logout the vyber
        firebase.auth().signOut();
        // end logout

    } else {

        // start login field validation
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
				console.log('email, password', email, password);
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
        firebase.auth().signInWithEmailAndPassword(email, password)
					.then(user => {
						console.log(user);
						routeUser(user.user);
					})
					.catch(function(error) {
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
	console.log('Im at registerWithLetsVybe');
    var email = document.getElementById('newEmail').value;
    var password = document.getElementById('newPassword').value;
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
    firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(user => {
				window.location.href = 'settings.html';
			})
			.catch(function(error) {
        // Handle Errors here.
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
        // start exclude silen
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
    // document.getElementById('quickstart-sign-in').addEventListener('click', toggleLoginWithLetsVybe, false);
    // document.getElementById('quickstart-sign-up').addEventListener('click', registerWithLetsVybe, false);
    // document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
    // document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
}
window.onload = function() {
    initApp();


    $("#signUpForm").hide();
    $("#quickstart-sign-up").click(function(){
        $('#signInForm').hide()
        $('#signUpForm').show()
    })
    $('.signInBtn').click(function(){
        $('#signInForm').show()
        $('#signUpForm').hide()
    })
};


// Checks whether the user is logging in for the first time.
function routeUser(user){
	// Get the reference of the users object from the firestore.
	currUserRef = usersRef.doc(user.uid);

	// Extract the reference from the database.
	currUserRef.get()
		.then(snapshot => {
			if (snapshot.exists && snapshot.data().profileComplete) {
				window.location.href = 'home.html';
			} else {
				window.location.href = 'settings.html';
			}
		})
		.catch(error => {
			console.log(error.message);
		});
}
