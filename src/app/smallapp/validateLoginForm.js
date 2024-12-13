import emailValidator from 'email-validator';

// Function to validate the login form
const validateLoginForm = (event) => {
  let errorMessage = '';
  const data = new FormData(event.currentTarget);
  const email = data.get('username'); // Assuming the login uses email

  if (!emailValidator.validate(email)) {
    errorMessage += 'Invalid email address. ';
  }
  
  const password = data.get('pass');
  if (!password) {
    errorMessage += 'Password cannot be blank.';
  }

  return errorMessage;
};

export default validateLoginForm;
