/* ===================================
   EZEE VISION ERP v6.0
   Admin Login
=================================== */

import { auth } from "./firebase.js";

import {

signInWithEmailAndPassword

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

/* ===========================
   Elements
=========================== */

const emailInput =
document.getElementById("email");

const passwordInput =
document.getElementById("password");

const loginBtn =
document.getElementById("loginBtn");

/* ===========================
   Login Function
=========================== */

async function login(){

const email =
emailInput.value.trim();

const password =
passwordInput.value;

if(email==="" || password===""){

alert("Please enter Email & Password");

return;

}

loginBtn.disabled = true;

loginBtn.textContent = "Logging in...";

try{

await signInWithEmailAndPassword(

auth,

email,

password

);

localStorage.setItem(

"adminLogin",

"true"

);

alert("Login Successful ✅");

location.href="index.html";

}catch(error){

console.error(error);

alert("Invalid Email or Password");

loginBtn.disabled = false;

loginBtn.textContent = "Login";

}

}

/* ===========================
   Events
=========================== */

if(loginBtn){

loginBtn.addEventListener(

"click",

login

);

}

window.login = login;

console.log(

"Login Module Ready ✅"

);

