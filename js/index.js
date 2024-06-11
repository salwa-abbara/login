
let signupName = document.getElementById('signupName');
let signupEmail = document.getElementById('signupEmail');
let signupPassword = document.getElementById('signupPassword');
let signinEmail = document.getElementById('signinEmail');
let checkEmailValidation = document.querySelector('.validEmail');
let checkPssValidation = document.querySelector('.validPass');
let emailMessage = document.querySelector('.valid');


let signUpArray = [];
if (localStorage.getItem('users') == null) {
    signUpArray = []
} else {
    signUpArray = JSON.parse(localStorage.getItem('users'))
}


//------------------------------login-----------------------------------

function login() {
    if (isLoginInputEmpty() == true) {
        document.getElementById('alert').innerHTML = '<span class="text-danger p-2">All inputs is required</span>';
    }
    else{
        
        var password = signinPassword.value
        var email = signinEmail.value
        for (var i = 0; i < signUpArray.length; i++) {
            if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) {
                localStorage.setItem('userName',signUpArray[i].name);
                open('./home.html')
                return true;
            }   
        }
        document.getElementById('alert').innerHTML = '<span class="text-danger p-2">incorrect email or password</span>'
    

    }
    
}


function isLoginInputEmpty() {

    if (signinEmail.value == "" || signinPassword.value == "") {
        return true
    } else {
        return false
    }
}
let username = localStorage.getItem('userName')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}

//------------------------------SignUp-----------------------------------


checkEmailValidation.addEventListener('input',function(){
    validation(checkEmailValidation);
})
checkPssValidation.addEventListener('input',function(){
    validation(checkPssValidation);
})

function validation(inputfelid){
    let regex = {
        signupEmail :/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        signupPassword :/^([A-Z])[\w]{7,}/g
    }
    if(regex[inputfelid.id].test(inputfelid.value)){
        inputfelid.classList.add('is-valid');
        inputfelid.classList.remove('is-invalid');
        if(inputfelid.id=='signupEmail'){
        emailMessage.classList.replace('d-block','d-none');
        }     
    }
    else{
        inputfelid.classList.add('is-invalid');
        if(inputfelid.id=='signupEmail'){
        emailMessage.classList.replace('d-none','d-block');
        }
    }

}

function signUp() {
    if (isSignupInputEmpty() == true) {
        document.getElementById('alert2').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
    }
    else{
        var signUp = {
            name: signupName.value,
            email: signupEmail.value,
            password: signupPassword.value,
        }
        if (signUpArray.length == 0) {
            signUpArray.push(signUp)
            localStorage.setItem('users', JSON.stringify(signUpArray))
            document.getElementById('alert2').innerHTML = '<span class="text-success m-3">Success</span>'
            open('./index.html')
            

            
        }
        else{
            if (isEmailExist() == true) {
                document.getElementById('alert2').innerHTML = '<span class="text-danger m-3">email already exists</span>'
        
            } else {
                signUpArray.push(signUp)
                localStorage.setItem('users', JSON.stringify(signUpArray))
                document.getElementById('alert2').innerHTML = '<span class="text-success m-3">Success</span>'
                open('./index.html')
        
            }
        }
    }


}



function isSignupInputEmpty() {

    if (signupName.value == "" || signupPassword.value == "" || signupEmail.value == "" ) {
        return true
    } else {
        return false
    }
}

function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return true
        }
    }
}

