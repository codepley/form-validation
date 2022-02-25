const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const email = document.getElementById('email');
const password2 = document.getElementById('password2');


const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
};

const validateEmail = (input) => {
    
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input);
    } else {
        showError(input, 'Enter Valid Email!')
    }
  };

const checkValid = (inputArr) => {
    inputArr.forEach(input => {
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is Required!`);
        } else {
            showSuccess(input);
        }
    });
};

const checkLength = (input, min, max) => {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be atleast ${min} characters.`)
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters.`)
    }
};

const checkPasswordMatch = (input1, input2) => {
    if(input1.value !== input2.value){
        showError(input2, 'Password do not match!');
    } else {
        showSuccess(input2);
    }
};

const getFieldName = input => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkValid([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    validateEmail(email);
    checkPasswordMatch(password, password2);
});