//  User prototype to store all the user information.
let userPrototype = function(){
    this.uid = null;
    this.displayName = null;
    this.username = null;
    this.age = null;
    this.password = null;
    this.photoURL = null;
    this.email = null;
    this.phoneNumber = null;
    this.gender = null;
    this.currCity = null;
    this.zipCode = null;
}

// Retrieve the user.
userPrototype.prototype.retrieveUser = function (domElements, userRef) {
    this.uid = userRef.id;
    userRef.get()
        .then(querySnapshot => {
            if (debug) console.log('UserRef: ', querySnapshot.data());
            this.initializeUser(querySnapshot.data());
            domElements.populateFields(querySnapshot.data());

        }).catch(error => {
            console.log(error.message);
        });
}

// Populate all the attributes of the prototype.
userPrototype.prototype.initializeUser = function(userDoc) {
    this.password = "**********";
    this.displayName = userDoc.displayName;
    this.username = userDoc.username;
    this.age = userDoc.age;
    this.photoURL = userDoc.photoURL;
    this.email = userDoc.email;
    this.phoneNumber = userDoc.phoneNumber;
    this.gender = userDoc.gender;
    this.currCity = userDoc.city;
    this.zipCode = userDoc.zipCode;
}

// Update the displayName in the user state and the collection.
userPrototype.prototype.updateDisplayName = function (newDisplayName) {
    userRef.set({displayName: newDisplayName}, {merge: true});
    firebase.auth().currentUser.updateProfile({displayName: this.displayName})
        .then(() => {
            if (debug) console.log('Successfully updated displayName');
            this.displayName = newDisplayName;
        })
        .catch(error => {
            console.log(error.message);
        }
    );
}

// Update the username.
userPrototype.prototype.updateUsername = function (newUsername) {
    userRef.set({username: newUsername}, {merge: true})
        .then(() => {
            if (debug) console.log('Successfully updated username');
            this.username = newUsername;
        })
        .catch(
    );
}

// Update the age.
userPrototype.prototype.updateAge = function (newAge) {
    userRef.set({age: newAge}, {merge: true})
        .then(() => {
            if (debug) console.log('Age successfully updated');
            this.age = newAge;
        })
        .catch( error => {
            console.log(error.message);
        }
    );
}

// Update the password.
userPrototype.prototype.updatePassword = function (newPassword) {
    firebase.auth().currentUser.updatePassword(newPassword)
        .then(() => {
            if (debug) console.log('Password successfully updated.');
            // TODO: Close the div
        })
        .catch(error => {
            console.log(error.message);
            // TODO: Notify the user about the error message.
        }
    );
}

// Update the photoURL.
userPrototype.prototype.parsePhotoFileAndUpdateURL = function (newPhotoFile) {
    // Create a reference for the uploading file
    let photoRef = storageRef.child('photos/' + this.uid + '/' + newPhotoFile.name);

    // Upload the file.
    photoRef.put(newPhotoFile)
        .then(snapshot => {
            if (debug) console.log('Successfully updated image', snapshot);
            photoRef.getDownloadURL()
                .then(url => {
                    if (debug) console.log('The new url for the photo', url);
                    this.updatePhotoURL(url);

                }).catch(error => {
                    console.log(error.message);
                }
            );
        }).catch(error => {
            console.log(error.message);
        }
    );
}

// Update the photoURL
userPrototype.prototype.updatePhotoURL = function (newPhotoURL){
    userRef.set({photoURL: newPhotoURL}, {merge: true});
    firebase.auth().currentUser.updateProfile({photoURL: newPhotoURL})
        .then(() => {
            if (debug) console.log('Successfully updated the photoURL');
            this.photoURL = newPhotoURL;
        }).catch( error => {
            console.log(error.message);
        }
    );
}

// Update the gender.
userPrototype.prototype.updateGender = function (newGender) {
    userRef.set({gender: newGender}, {merge: true})
        .then(() => {
            if (debug) console.log('Successfully updated gender.');
            this.gender = newGender;
        })
        .catch(error => {
            console.log(error.message);
        }
    );
}

// Update the email.
userPrototype.prototype.updateEmail = function (newEmail) {
    userRef.set({email: newEmail}, {merge: true});
    firebase.auth().currentUser.updaetEmail(newEmail)
        .then(() => {
            if (debug) console.log('Successfully updated email address.');
            this.email = newEmail;
        })
        .catch(error => {
            console.log(error.message);
        }
    );
}

// Update the phone number.
userPrototype.prototype.updatePhone = function (newPhone) {
    userRef.set({phoneNumber: newPhone}, {merge: true})
        .then(() => {
            if (debug) console.log("Phone number updated.");
            this.phoneNumber = newPhone;
        })
        .catch(error => {
            console.log(error.message);
        });
}

// Update the current city
userPrototype.prototype.updateCurrCity = function(newCity) {
    userRef.set({currCity: newCity}, {merge: true})
        .then(() => {
            if (debug) console.log('Successfully updated the currCity.');
            this.currCity = newCity;
        })
        .catch(error => {
            console.log(error.message);
        }
    );
}

// Update the zipCode
userPrototype.prototype.updateZipCode = function(newZipCode) {
    userRef.set({zipCode: newZipCode}, {merge: true})
        .then(() => {
            if (debug) console.log('Successfully updated the zipCode.');
            this.zipCode = newZipCode;
        })
        .catch(error => {
            console.log(error.message);
        }
    );
}