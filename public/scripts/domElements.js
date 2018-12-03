let domElementsPrototype = function() {
    // Fields to display default value
    this.displayNameField = null;
    this.usernameField = null;
    this.ageField = null;
    this.passwordField = null;
    this.photoField = null;
    this.emailField = null;
    this.phoneField = null;
    this.genderField = null;

    // Buttons elements
    this.updateDisplayNameBtn = null;
    this.updateUsernameBtn = null;
    this.updateAgeBtn = null;
    this.updatePasswordBtnv;
    this.updatePhotoBtn = null;
    this.updateEmailBtn = null;
    this.updatePhoneBtn = null;
    this.updateGenderBtn = null;

    // Input elements
    this.displayNameInput = null;
    this.usernameInput = null;
    this.ageInput = null;
    this.passwordInput = null;
    this.emailInput = null;
    this.phoneInput = null;
    this.genderInput = null;
}

domElementsPrototype.prototype.initialize = function() {
    this.displayNameField = document.querySelector('#displayNameField');
    this.usernameField = document.querySelector('#usernameField');
    this.ageField = document.querySelector('#ageField');
    this.passwordField = document.querySelector('#passwordField');
    this.photoField = document.querySelector('#photoField');
    this.emailField = document.querySelector('#emailField');
    this.phoneField = document.querySelector('#phoneField');
    this.genderField = document.querySelector('#genderField');
    // For Inputs
    this.displayNameInput = document.querySelector('#displayNameInput');
    this.usernameInput = document.querySelector('#usernameInput');
    this.ageInput = document.querySelector('#ageInput');
    this.passwordInput = document.querySelector('#passwordInput');
    this.emailInput = document.querySelector('#emailInput');
    this.phoneInput = document.querySelector('#phoneInput');
    this.genderInput = document.querySelector('#genderInput');
    // For Buttons
    this.updateDisplayNameBtn = document.querySelector('#updateDisplayName-btn');
    this.updateUsernameBtn = document.querySelector('#updateUsername-btn');
    this.updateAgeBtn = document.querySelector('#updateAge-btn');
    this.updatePasswordBtn = document.querySelector('#updatePassword-btn');
    this.updatePhotoBtn = document.querySelector('#updatePhoto-btn');
    this.updateEmailBtn = document.querySelector('#updateEmail-btn');
    this.updatePhoneBtn = document.querySelector('#updatePhone-btn');
    this.updateGenderBtn = document.querySelector('#updateGender-btn');
}

// Populate all the dom elements.
domElementsPrototype.prototype.populateFields = function(user) {
    this.displayNameField.innerHTML = user.displayName;
    this.usernameField.innerHTML = user.username;
    this.ageField.innerHTML = user.age;
    this.passwordField.innerHTML = user.password;
    console.log('Setting the image source now');
    this.photoField.src = user.photoURL;
    this.emailField.innerHTML = user.email;
    this.phoneField.innerHTML = user.phoneNumber;
    this.genderField.innerHTML = user.gender;
}

// Add onClick action for all buttons
domElementsPrototype.prototype.setUpOnClickActions = function(user) {
    // Buttons elements
    let domElement = this;
    this.updateDisplayNameBtn.onclick = function() {
        user.updateDisplayName(domElement.displayNameInput.value);
    }
    this.updateUsernameBtn.onclick = function() {
        user.updateUsername(domElement.usernameInput.value);
    }
    this.updateAgeBtn.onclick = function() {
        console.log('ageInput', domElement.ageInput);
        user.updateAge(domElement.ageInput.value);
    }
    this.updatePasswordBtn.onclick = function() {
        user.updatePassword(domElement.passwordInput.value);
    }
    this.updatePhotoBtn.onclick = function() {
        user.updatePhoto(domElement.photoInput.value);
    }
    this.updateEmailBtn.onclick = function() {
        user.updateEmail(domElement.emailInput.value);
    }
    this.updatePhoneBtn.onclick = function() {
        user.updatePhone(domElement.phoneInput.value);
    }
    this.updateGenderBtn.onclick = function() {
        user.updateGender(domElement.genderInput.value);
    }
}










