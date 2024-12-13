import validator from 'email-validator';

const validateLoginForm = (event) => {
  let errorMessage = '';

  const data = new FormData(event.currentTarget);

  // Get the email
  let email = data.get('username'); // Assuming the login uses email as username

  // Validate the email
  let emailCheck = validator.validate(email);

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
  } else if (pass.length < 6) {
    errorMessage += 'Password must be at least 6 characters long. ';
  }

  return errorMessage;
};

export default validateLoginForm;
