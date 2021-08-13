
//use document.querySelector() method to select the input fields and the form:

const titleEl = document.querySelector('#title');
const nameEl = document.querySelector('#name');
const emailEl = document.querySelector('#email');
const notesEl = document.querySelector('#notes');
const urlEl = document.querySelector('#url');
const submitEl = document.querySelector('#submit');
const form = document.querySelector('#idea');



// **************** VALIDATION FUNCTIONS ****************

// PROCESS THE SAME FOR EACH FIELD THEREFORE NOTES ONLY ADDED TO CHECKTITLE METHOD

// TITLE
const checkTitle = () =>
{
  let valid = false;

  // define character range
  const min = 3,
    max = 100;

  // save the user inputted data and trim whitespce
  const title = titleEl.value.trim();

  // if the field is empty show an error
  if (!isRequired(title)) {
    showError(titleEl, 'Title cannot be blank.');
    //if the data length is outside the defined range show an error
  } else if (!isBetween(title.length, min, max)) {
    showError(titleEl, `Title must be between ${min} and ${max} characters.`)
    //otherwise data is valid so show success and change valid to true
  } else {
    showSuccess(titleEl);
    valid = true;
  }

  //return valid for on submit form validation
  return valid;
};

// NAME
const checkName = () =>
{
  let valid = false;

  const min = 3,
    max = 25;

  const name = nameEl.value.trim();

  if (!isRequired(name)) {
    showError(nameEl, 'Name cannot be blank.');
  } else if (!isBetween(name.length, min, max)) {
    showError(nameEl, `Name must be between ${min} and ${max} characters.`)
  } else {
    showSuccess(nameEl);
    valid = true;
  }

  return valid;
};

//EMAIL
const checkEmail = () =>
{
  let valid = false;

  const email = emailEl.value.trim();

  if (!isRequired(email)) {
    showError(emailEl, 'Email cannot be blank.');
  } else if (!isEmailValid(email)) {
    showError(emailEl, 'Email is not valid.')
  } else {
    showSuccess(emailEl);
    valid = true;
  }

  return valid;
};

// NOTES
const checkNotes = () =>
{
  let valid = false;

  const min = 3,
    max = 1000;

  const notes = notesEl.value.trim();

  if (!isRequired(notes)) {
    showError(notesEl, 'Notes cannot be blank.');
  } else if (!isBetween(notes.length, min, max)) {
    showError(notesEl, `Notes must be between ${min} and ${max} characters.`)
  } else {
    showSuccess(notesEl);
    valid = true;
  }

  return valid;
};

// URL
const checkUrl = () =>
{
  let valid = false;

  const url = urlEl.value.trim();

  if (!isRequired(url)) {
    showError(urlEl, 'URL cannot be blank.');
  } else if (!isUrlValid(url)) {
    showError(urlEl, 'URL is not valid.')
  } else {
    showSuccess(urlEl);
    valid = true;
  }

  return valid;
};




// **************** UTILITY FUNCTIONS ****************


// To check the email is valid, test the string against a regular expression and return a boolean
const isEmailValid = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

// To check the url is valid, try and create a url using the user entered field and return a boolean
const isUrlValid = (url) => {
  try
  {new URL(url);}
  catch (e)
  {return false;}
  return true;
};

// function returns true if the input argument is empty:
const isRequired = value => value === '' ? false : true;

// function returns false if the length argument is not between the min and max argument:
const isBetween = (length, min, max) => length < min || length > max ? false : true;

// function highlights the border of the input field and displays an error message if the input field is invalid:
const showError = (input, message) => {

  // get the form-field parent element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove('success');
  formField.classList.add('error');

  // select the small element and add the error message
  const error = formField.querySelector('small');
  error.textContent = message;
};

// function highlights the border of the input field and adds a success class (green border):
const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove('error');
  formField.classList.add('success');

  // hide the error message
  const error = formField.querySelector('small');
  error.textContent = '';
}



// **************** VALIDATE ON SUBMIT METHOD ****************

//attach the submit event listener to the form by using the addEventListener() method:
form.addEventListener('submit', function (e) {


  // validate fields
  let isNameValid = checkName(),
    isEmailValid = checkEmail(),
    isTitleValid = checkTitle(),
    isNotesValid = checkNotes(),
    isUrlValid = checkUrl();


  // chain the boolean variables - isFormValid is only true if all chained variables are true
  let isFormValid = isNameValid &&
    isEmailValid &&
    isTitleValid &&
    isNotesValid &&
    isUrlValid;


  // prevent the form from submitting and show an error message if any of the form fields are not valid
  if (!isFormValid) {
    e.preventDefault();
    showError(submitEl, 'form is not valid')
  }

});



//  **************** INLINE VALIDATION METHODS WITH DEBOUNCE FEEDBACK DELAY ****************

// DEBOUNCE IMPROVES PERFORMANCE BY DELAYING THE FEEDBACK,
// GIVING THE USER THE CHANCE TO INPUT DATA BEFORE THEY GET AN ERROR MESSAGE

const debounce = (fn, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args)
    }, delay);
  };
};


// ADD REAL TIME FEEDBACK TO FIELDS
// ATTACHES AN EVENT LISTENER TO INPUT OF EACH FORM FIELD USING EVENT DELEGATION
// USES THE DEBOUNCE METHOD AS SECOND EVENTLISTENER ARGUMENT, ROUTING THE SWITCH CASES THROUGH THE TIMER

form.addEventListener('input', debounce(function (e) {
  switch (e.target.id) {
    case 'name':
      checkName();
      break;
    case 'email':
      checkEmail();
      break;
    case 'title':
      checkTitle();
      break;
    case 'notes':
      checkNotes();
      case 'url':
      checkUrl();
      break;
  }
}));






