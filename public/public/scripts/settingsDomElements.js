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
    this.currCityField = null;
    this.zipCodeField = null;

    // Buttons elements
    this.updateDisplayNameBtn = null;
    this.updateUsernameBtn = null;
    this.updateAgeBtn = null;
    this.updatePasswordBtnv;
    this.updatePhotoBtn = null;
    this.updateEmailBtn = null;
    this.updatePhoneBtn = null;
    this.updateGenderBtn = null;
    this.updateCurrCityBtn = null;
    this.updateZipCodeBtn = null;

    // Input elements
    this.displayNameInput = null;
    this.usernameInput = null;
    this.ageInput = null;
    this.passwordInput = null;
    this.emailInput = null;
    this.phoneInput = null;
    this.genderInput = null;
    this.currCityInput = null;
    this.zipCodeInput = null;
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
    this.currCityField = document.querySelector('#currCityField');
    this.zipCodeField = document.querySelector('#zipCodeField');
    // For Inputs
    this.photoInput = document.querySelector('#photoInput');
    this.displayNameInput = document.querySelector('#displayNameInput');
    this.usernameInput = document.querySelector('#usernameInput');
    this.ageInput = document.querySelector('#ageInput');
    this.passwordInput = document.querySelector('#passwordInput');
    this.emailInput = document.querySelector('#emailInput');
    this.phoneInput = document.querySelector('#phoneInput');
    this.genderInput = document.querySelector('#genderInput');
    this.currCityInput = document.querySelector('#currCityInput');
    this.zipCodeInput = document.querySelector('#zipCodeInput');
    // For Buttons
    this.updateDisplayNameBtn = document.querySelector('#updateDisplayName-btn');
    this.updateUsernameBtn = document.querySelector('#updateUsername-btn');
    this.updateAgeBtn = document.querySelector('#updateAge-btn');
    this.updatePasswordBtn = document.querySelector('#updatePassword-btn');
    this.updatePhotoBtn = document.querySelector('#updatePhoto-btn');
    this.updateEmailBtn = document.querySelector('#updateEmail-btn');
    this.updatePhoneBtn = document.querySelector('#updatePhone-btn');
    this.updateGenderBtn = document.querySelector('#updateGender-btn');
    this.updateCurrCityBtn = document.querySelector('#updateCurrCity-btn');
    this.updateZipCodeBtn = document.querySelector('#updateZipCode-btn');
}

// Populate all the dom elements.
domElementsPrototype.prototype.populateFields = function(user) {
    this.displayNameField.innerHTML = user.displayName;
    this.usernameField.innerHTML = user.username;
    this.ageField.innerHTML = user.age;
    this.passwordField.innerHTML = '***********';
    this.photoField.src = user.photoURL;
    this.emailField.innerHTML = user.email;
    this.phoneField.innerHTML = user.phoneNumber;
    this.genderField.innerHTML = user.gender;
    this.currCityField.innerHTML = user.currCity;
    this.zipCodeField.innerHTML = user.zipCode;
}

// Add onClick action for all buttons
domElementsPrototype.prototype.setUpOnClickActions = function(user) {
    // Buttons elements.
    let domElement = this;
    this.updateDisplayNameBtn.onclick = function() {
        user.updateDisplayName(domElement.displayNameInput.value);
    }
    this.updateUsernameBtn.onclick = function() {
        user.updateUsername(domElement.usernameInput.value);
    }
    this.updateAgeBtn.onclick = function() {
        user.updateAge(domElement.ageInput.value);
    }
    this.updatePasswordBtn.onclick = function() {
        user.updatePassword(domElement.passwordInput.value);
    }
    this.updatePhotoBtn.onclick = function() {
        user.parsePhotoFileAndUpdateURL(domElement.photoInput.files[0]);
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
    this.updateCurrCityBtn.onclick = function() {
        user.updateCurrCity(domElement.currCityInput.value);
    }
    this.updateZipCodeBtn.onclick = function() {
        user.updateZipCode(domElement.zipCodeInput.value);
    }
}










