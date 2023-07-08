const userNameField = document.querySelector("[name=username]");
const passwordField = document.querySelector("[name=password]");
const emailField = document.querySelector("[name=email]");

const setErrors = (message, field, isError = true) => {
  if (isError) {
    field.classList.add("invalid");
    field.nextElementSibling.classList.add("error");
    field.nextElementSibling.innerText = message;
  } else {
    field.classList.remove("invalid");
    field.nextElementSibling.classList.remove("error");
    field.nextElementSibling.innerText = "";
  }
}

const validateEmptyField = (message, e) => {
  const field = e.target;
  const fieldValue = e.target.value;
  if (fieldValue.trim().length === 0) {
    setErrors(message, field);
  } else {
    setErrors("", field, false);
  }
}

const validateEmailFormat = e => {
  const field = e.target;
  const fieldValue = e.target.value;
  const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  if (fieldValue.trim().length > 5 && !regex.test(fieldValue)) {
    setErrors("Please enter a valid email", field);
  } else {
    setErrors("", field, false);
  }
}

const submitButton = document.querySelector("#submit-button");

const saveDataToLocalStorage = () => {
  const userName = userNameField.value;
  const password = passwordField.value;
  const email = emailField.value;

  
  validateEmptyField("Add your Full Name", { target: userNameField });
  validateEmptyField("Write your password", { target: passwordField });
  validateEmptyField("Please provide an email", { target: emailField });
  validateEmailFormat({ target: emailField });

  
  const isValid =
    !userNameField.classList.contains("invalid") &&
    !passwordField.classList.contains("invalid") &&
    !emailField.classList.contains("invalid");

  if (isValid) {
    // Guardar los datos en el localStorage
    localStorage.setItem("userName", userName);
    localStorage.setItem("password", password);
    localStorage.setItem("email", email);

    window.location.href = "/pages/login.html";
  }
};

const init = () => {
  userNameField.addEventListener("blur", (e) => validateEmptyField("Add your Full Name", e));
  passwordField.addEventListener("blur", (e) => validateEmptyField("Write your password", e));
  emailField.addEventListener("blur", (e) => validateEmptyField("Please provide an email", e));
  emailField.addEventListener("input", validateEmailFormat);
  submitButton.addEventListener("click", saveDataToLocalStorage);
};

init();

