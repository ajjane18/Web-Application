import emailValidator from 'email-validator';

// Function to validate the form
const validateForm = (event) => {
  let errorMessage = '';
  const data = new FormData(event.currentTarget);
  const email = data.get('email');
  
  // Validate email
  if (!emailValidator.validate(email)) {
    errorMessage += 'Invalid email address. Please input another. ';
  }

  // Validate password
  const password = data.get('pass');
  if (!password) {
    errorMessage += 'Password cannot be blank. ';
  } else if (password.length < 6) {
    errorMessage += 'Password must have more than 6 characters. ';
  }

  return errorMessage;
};

export default validateForm;
