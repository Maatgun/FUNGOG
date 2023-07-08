const emailField = document.querySelector("[name=email]");
const passwordField = document.querySelector("[name=password]");


// LOCAL STORAGE ----
const savedEmail = localStorage.getItem("email");
const savedPassword = localStorage.getItem("password");

emailField.value = savedEmail ? savedEmail : "";
passwordField.value = savedPassword ? savedPassword : "";

emailField.addEventListener("input", () => {
    localStorage.setItem("email", emailField.value);
  });

  passwordField.addEventListener("input", () => {
    localStorage.setItem("password", passwordField.value);
  });

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault(); 


    window.location.href = "../index.html";
  });

// VALIDACIÓN DE INPUTS ----

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


  const init = () => {

   
    emailField.addEventListener("blur", (e) => validateEmptyField("Please provide an email", e));
    passwordField.addEventListener("blur", (e) => validateEmptyField("Write your password", e));
    emailField.addEventListener("input", validateEmailFormat);
};

init();