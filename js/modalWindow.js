let modalCollection = document.getElementsByClassName("button");
let modal = document.getElementById("myModal");
let closeIcon = document.getElementById("closeModal");
let successMessage = document.getElementById("successMessage");

let name = document.getElementById("name");
let date = document.getElementById("date");
let phone = document.getElementById("phone");
let email = document.getElementById("email");
let message = document.getElementById("message");


//----------------------------------open / close modal window---------------------------------------
for (let item of modalCollection) {
    item.onclick = function () {
        modal.style.display = "block";
    }
}
closeIcon.onclick = function () {
    clearInputValue();
    modal.style.display = "none";
};


window.onclick = function (event) {
    if (event.target === modal) {
        clearInputValue();
        modal.style.display = "none";
    }
};

//----------------------onSubmit------------------------------
let form = document.getElementById("form");
form.addEventListener('submit', e => {
    e.preventDefault();
    checkInputs();

});


function checkInputs() {
    if (name.value === '') {
        setErrorFor(name, 'Name cannot be blank');
    } else {
        setSuccessFor(name);
    }
    if (date.value === '') {
        setErrorFor(date, 'Date cannot be blank');
    } else {
        setSuccessFor(date);
    }

    if (message.value === '') {
        setErrorFor(message, 'Message cannot be blank');
    } else {
        setSuccessFor(message);
    }

    if (email.value === '') {
        setErrorFor(email, 'Email cannot be blank');
    }
    if (!emailIsValid(email.value)) {
        setErrorFor(email, 'Not a valid email');
    }
    else {
        setSuccessFor(email);
    }

    if (isNaN(phone.value)) {
        setErrorFor(phone, 'Phone cannot be letters')
    } else if (phone.value.length != 10 || phone.value === '') {
        setErrorFor(phone, 'Phone cannot be blank');
    } else {
        setSuccessFor(phone);
    }

    checkIfSuccess();
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector('p');
    formControl.className = 'modal-input-wrapper error';
    errorMessage.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'modal-input-wrapper success';
}

function checkIfSuccess() {
    let allInputsCollection = document.querySelectorAll('.modal-input-wrapper');
    let count = 0;
    for (let item of allInputsCollection) {

        if (item.classList.contains("success")) {
            count++;
            if (count === 5) {
                successMessage.style.display = "block";
                modal.style.display = "none";
                setTimeout(() => successMessage.style.display = "none", 2000);
                clearInputValue();
            }
        }
    }
}

function clearInputValue() {
    let allInputsCollection = document.querySelectorAll('.modal-input');
    for (let item of allInputsCollection) {
        item.value = "";
    }
    let allInputsWrapperCollection = document.querySelectorAll('.modal-input-wrapper');
    for (let item of allInputsWrapperCollection) {
        item.classList.remove('success');
        item.classList.remove('error');
    }
}

function emailIsValid (email) {
   const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return !!validation
}

