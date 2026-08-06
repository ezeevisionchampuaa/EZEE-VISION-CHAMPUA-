/* ===================================
   EZEE VISION ERP v4.0
   Student Module
=================================== */

import { db } from "./firebase.js";

import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

let students = JSON.parse(localStorage.getItem("students")) || [];

function saveStudent(){

const name = document.getElementById("studentName").value.trim();
const roll = document.getElementById("rollNumber").value.trim();
const className = document.getElementById("className").value;
const parent = document.getElementById("parentName").value.trim();
const mobile = document.getElementById("mobileNumber").value.trim();

if(name=="" || roll=="" || className==""){

alert("Please fill all required fields.");

return;

}

const student={

id:Date.now(),

name:name,

roll:roll,

className:className,

parent:parent,

mobile:mobile,

attendance:{},

tests:[],

fees:{

paid:0,

due:0

},

homework:[]

};

await addDoc(collection(db,"students"), student);

alert("Student Added Successfully ✅");

window.location.href="index.html";

}
/* ===========================
   Edit Student
=========================== */

const editId = localStorage.getItem("editStudentId");

if(editId){

const student = students.find(s=>s.id==editId);

if(student){

document.getElementById("studentName").value = student.name;

document.getElementById("rollNumber").value = student.roll;

document.getElementById("className").value = student.className;

document.getElementById("parentName").value = student.parent;

document.getElementById("mobileNumber").value = student.mobile;

document.querySelector("button").style.display="none";

document.getElementById("updateBtn").style.display="block";

}

}

function updateStudent(){

const index = students.findIndex(s=>s.id==editId);

students[index].name =
document.getElementById("studentName").value.trim();

students[index].roll =
document.getElementById("rollNumber").value.trim();

students[index].className =
document.getElementById("className").value;

students[index].parent =
document.getElementById("parentName").value.trim();

students[index].mobile =
document.getElementById("mobileNumber").value.trim();

localStorage.setItem(
"students",
JSON.stringify(students)
);

localStorage.removeItem("editStudentId");

alert("Student Updated Successfully ✅");

location.href="index.html";

}
