/* ===================================
   EZEE VISION ERP v5.2
   Student Module
=================================== */

import { db } from "./firebase.js";

import {

collection,
addDoc,
doc,
getDoc,
updateDoc

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ===========================
   Global Variables
=========================== */

const studentName =
document.getElementById("studentName");

const rollNumber =
document.getElementById("rollNumber");

const className =
document.getElementById("className");

const parentName =
document.getElementById("parentName");

const mobileNumber =
document.getElementById("mobileNumber");

const saveBtn =
document.getElementById("saveBtn");

const updateBtn =
document.getElementById("updateBtn");

const editId =
localStorage.getItem("editStudentId");

/* ===========================
   Save Student
=========================== */

async function saveStudent(){

const name = studentName.value.trim();

const roll = rollNumber.value.trim();

const studentClass = className.value;

const parent = parentName.value.trim();

const mobile = mobileNumber.value.trim();

if(name==="" || roll==="" || studentClass===""){

alert("Please fill all required fields.");

return;

}

const student={

name:name,

roll:roll,

className:studentClass,

parent:parent,

mobile:mobile,

attendance:{},

tests:[],

fees:{

paid:0,

due:0

},

homework:[],

createdAt:new Date().toISOString()

};

try{

await addDoc(

collection(db,"students"),

student

);

alert("Student Added Successfully ✅");

clearForm();

location.href="index.html";

}catch(error){

console.error(error);

alert("Failed to save student ❌");

}

}
/* ===========================
   Clear Form
=========================== */

function clearForm(){

studentName.value="";

rollNumber.value="";

className.value="";

parentName.value="";

mobileNumber.value="";

}


/* ===========================
   Load Student For Edit
=========================== */

async function loadStudent(){

if(!editId){

return;

}

try{

const studentRef = doc(db,"students",editId);

const studentSnap = await getDoc(studentRef);

if(!studentSnap.exists()){

alert("Student not found.");

location.href="index.html";

return;

}

const student = studentSnap.data();

studentName.value = student.name || "";

rollNumber.value = student.roll || "";

className.value = student.className || "";

parentName.value = student.parent || "";

mobileNumber.value = student.mobile || "";

if(saveBtn){

saveBtn.style.display="none";

}

if(updateBtn){

updateBtn.style.display="block";

}

}catch(error){

console.error(error);

alert("Unable to load student.");

}

}
/* ===========================
   Update Student
=========================== */

async function updateStudent(){

if(!editId){

return;

}

const name = studentName.value.trim();

const roll = rollNumber.value.trim();

const studentClass = className.value;

const parent = parentName.value.trim();

const mobile = mobileNumber.value.trim();

if(name==="" || roll==="" || studentClass===""){

alert("Please fill all required fields.");

return;

}

try{

await updateDoc(

doc(db,"students",editId),

{

name:name,

roll:roll,

className:studentClass,

parent:parent,

mobile:mobile

}

);

alert("Student Updated Successfully ✅");

localStorage.removeItem("editStudentId");

location.href="index.html";

}catch(error){

console.error(error);

alert("Failed to update student ❌");

}

}
/* ===========================
   Button Events
=========================== */

if(saveBtn){

saveBtn.addEventListener("click",saveStudent);

}

if(updateBtn){

updateBtn.addEventListener("click",updateStudent);

updateBtn.style.display="none";

}

/* ===========================
   Page Initialize
=========================== */

document.addEventListener("DOMContentLoaded",()=>{

loadStudent();

});

/* ===========================
   Global Functions
=========================== */

window.saveStudent = saveStudent;

window.updateStudent = updateStudent;

/* ===========================
   Form Validation
=========================== */

function validateForm(){

const name = studentName.value.trim();

const roll = rollNumber.value.trim();

const studentClass = className.value;

if(name.length < 3){

alert("Student name must contain at least 3 characters.");

studentName.focus();

return false;

}

if(roll===""){

alert("Please enter Roll Number.");

rollNumber.focus();

return false;

}

if(studentClass===""){

alert("Please select Class.");

className.focus();

return false;

}

const mobile = mobileNumber.value.trim();

if(mobile!=="" && !/^[0-9]{10}$/.test(mobile)){

alert("Please enter a valid 10-digit mobile number.");

mobileNumber.focus();

return false;

}

return true;

}

/* ===========================
   Loading State
=========================== */

function setButtonLoading(button,status){

if(!button) return;

if(status){

button.disabled = true;

button.textContent = "Saving...";

}else{

button.disabled = false;

button.textContent =

button.id==="updateBtn"

? "Update Student"

: "Save Student";

}

}

/* ===========================
   Final Initialization
=========================== */

window.addEventListener("load",()=>{

if(saveBtn){

saveBtn.disabled=false;

}

if(updateBtn){

updateBtn.disabled=false;

}

console.log("EZEE VISION ERP v5.2 Ready ✅");

});
