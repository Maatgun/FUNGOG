const registerForm = document.getElementById("register-form");
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("last-name");



// VALIDACIÓN DE INPUTS ----

const isEmpty = (input) => {
    return !input.value.trim().length;
};

const betweenCharacters = (input, min, max) => {
    return input.value.length >= min && input.value.length <= max;
};

const showErrorToUser = (input, message) => {
const inputContainer= input.parentElement;
inputContainer.classList.remove("success");
inputContainer.classList.add("error");
const error = inputContainer.querySelector("small");
error.style.display = "block";
error.textContent = message;

}

const showSuccessToUser = (input) => {
    const inputContainer= input.parentElement;
    inputContainer.classList.remove("error");
    inputContainer.classList.add("success");
    const error = inputContainer.querySelector("small");
    error.style.display = "block";
    error.textContent = "";
};


const checkTextInput = (input) => {
    let valid = false;
    const minCharacters = 4;
    const maxCharacters = 20;

if (isEmpty(input)) {
    showErrorToUser(input, "Please complete this field");
    return;
};



if(!betweenCharacters(input, minCharacters, maxCharacters)){
    showErrorToUser(input, 
        `Must write ${minCharacters}' and ${maxCharacters} characters`);
        return;

}

showSuccessToUser(input);
valid = true
return valid;

};



// VALIDACIÓN Y REGISTRO DE DATOS ----



const init = () => {
registerForm.addEventListener("submit", validateForm);
nameInput.addEventListener("input", () => checkTextInput(nameInput));
};

init();