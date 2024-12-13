import validator from 'email-validator';

<<<<<<< Updated upstream
const validateLoginForm = (event) => {
=======
const validateForm = (event) => {
>>>>>>> Stashed changes
  let errorMessage = '';

  const data = new FormData(event.currentTarget);

  // Get the email
<<<<<<< Updated upstream
  let email = data.get('username'); // Assuming the login uses email as username
=======
  let email = data.get('email');
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
export default validateLoginForm;
=======
export default validateForm;
>>>>>>> Stashed changes
