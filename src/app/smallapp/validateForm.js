import emailValidator from 'email-validator';

// Function to validate the form
const validateForm = (event) => {
  let errorMessage = '';
  const data = new FormData(event.currentTarget);
  const email = data.get('email'); // Assuming the form uses email

  if (!emailValidator.validate(email)) {
    errorMessage += 'Invalid email address. ';
  }
  
  const password = data.get('pass');
  if (!password) {
    errorMessage += 'Password cannot be blank.';
  }

  return errorMessage;
};

export default validateForm;
