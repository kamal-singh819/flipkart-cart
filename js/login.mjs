const registerHere = document.querySelector(".register-here");
const loginHere = document.querySelector(".login-here");
const loginContainer = document.querySelector(".login-container");
const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");
const loginBtn = document.querySelector("#login-btn");
const signupContainer = document.querySelector(".signup-container");
const generateOTPBtn = document.querySelector(".generate-otp-btn");
const fullName = document.querySelector("#full-name");
const emailId = document.querySelector("#email");
const passWord = document.querySelector("#password");
const enterOTP = document.querySelector("#enter-otp");
const otpVerifyBtn = document.querySelector("#otp-verify");
const registerBtn = document.querySelector("#register-btn");
let generatedOtp = "";

function emailValidate(email) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return validRegex.test(email);
}

registerHere.addEventListener("click", () => {
    loginContainer.style.display = "none";
    signupContainer.style.display = "flex";
});

loginHere.addEventListener('click', () => {
    loginContainer.style.display = "flex";
    signupContainer.style.display = "none";
});

generateOTPBtn.addEventListener("click", () => {
    if (!emailValidate(emailId.value)) {
        alert("Email Id is not valid.!!!");
        emailId.value = '';
        return;
    }
    const digits = "0123456789";
    generatedOtp = "";
    for (let i = 0; i < 4; i++)
        generatedOtp += digits[Math.floor(Math.random() * 10)];
    const params = {
        email: emailId.value,
        name: fullName.value,
        otp: generatedOtp,
    };
    emailjs
        .send("service_3bfc5u8", "template_x481qkf", params)
        .then(alert("OTP Sent to your email Id!"));
});

otpVerifyBtn.addEventListener("click", () => {
    if (generatedOtp === enterOTP.value) {
        otpVerifyBtn.innerText = "Verified";
        otpVerifyBtn.style.backgroundColor = "#65B741";
        otpVerifyBtn.style.color = "#ffffff";
        registerBtn.disabled = false;
    } else {
        alert("Invalid OTP, Enter correct OTP");
        otpVerifyBtn.innerText = "Not Verified";
        otpVerifyBtn.style.backgroundColor = "#c1121f";
        registerBtn.disabled = true;
    }
});

registerBtn.addEventListener("click", () => {
    let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const index = registeredUsers.findIndex(ele => ele.email === emailId.value);
    if (index >= 0) {
        alert("Email already exists, Login Yourself!!!");
        loginContainer.style.display = "flex";
        signupContainer.style.display = "none";
        return;
    }
    const obj = {
        name: fullName.value,
        email: emailId.value,
        password: passWord.value,
    };
    registeredUsers.push(obj);
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    alert("Registration Successful!");
    signupContainer.style.display = "none";
    loginContainer.style.display = "flex";
});

loginBtn.addEventListener("click", () => {
    const emailId = loginEmail.value;
    const pass = loginPassword.value;
    let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const index = registeredUsers.findIndex(element => element.email === emailId && element.password === pass);

    if (index >= 0) {
        localStorage.setItem("currentUser", JSON.stringify([
            {
                userEmail: emailId,
                userName: registeredUsers[index].name
            }
        ]));
        location.href = "../index.html";
    } else alert("Email or Password is wrong...");
    loginPassword.value = '';
});

