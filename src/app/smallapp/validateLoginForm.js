import emailValidator from 'email-validator';

const validateLoginForm = (event) => {
  let errorMessage = '';

  const data = new FormData(event.currentTarget);

  // Get the email
  let email = data.get('username'); // Assuming the login uses email as username

  // Validate the email
  let emailCheck = emailValidator.validate(email);

  // Print the status true or false
  console.log("email status " + emailCheck);

  // If it is false, add to the error message
  if (!emailCheck) {
    errorMessage += 'Incorrect email. ';
  }

  // Check for blank password
  let pass = data.get('pass');
  if (!pass) {
    errorMessage += 'Password cannot be blank. ';
  }

  return errorMessage;
};

export default validateLoginForm;
