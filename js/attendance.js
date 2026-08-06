/* ===================================
   EZEE VISION ERP v5.3
   Attendance Module
=================================== */

import { db } from "./firebase.js";

import {

collection,
getDocs,
doc,
updateDoc

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ===========================
   Global Variables
=========================== */

let students = [];

const attendanceDate =
document.getElementById("attendanceDate");

const classFilter =
document.getElementById("classFilter");

const attendanceList =
document.getElementById("attendanceList");

const today =
new Date().toISOString().split("T")[0];

if(attendanceDate){

attendanceDate.value = today;

}
/* ===========================
   Load Students From Firebase
=========================== */

async function loadStudents(){

students = [];

try{

const snapshot = await getDocs(

collection(db,"students")

);

snapshot.forEach((docItem)=>{

students.push({

id:docItem.id,

...docItem.data()

});

});

loadAttendance();

}catch(error){

console.error(error);

attendanceList.innerHTML=

'<p class="empty">Unable to load students.</p>';

}

}

/* ===========================
   Event Listeners
=========================== */

if(classFilter){

classFilter.addEventListener(

"change",

loadAttendance

);

}

if(attendanceDate){

attendanceDate.addEventListener(

"change",

loadAttendance

);

}
/* ===========================
   Load Attendance
=========================== */

function loadAttendance(){

if(!attendanceList) return;

attendanceList.innerHTML = "";

let filteredStudents = students;

if(classFilter && classFilter.value !== "All"){

filteredStudents = students.filter(student=>

student.className === classFilter.value

);

}

if(filteredStudents.length===0){

attendanceList.innerHTML =

'<p class="empty">No Students Found</p>';

return;

}

filteredStudents.forEach(student=>{

let status = "P";

if(student.attendance){

status =

student.attendance[attendanceDate.value] || "P";

}

attendanceList.innerHTML += `

<div class="student">

<h3>${student.name}</h3>

<p>

${student.className}

&nbsp;|&nbsp;

Roll : ${student.roll}

</p>

<div class="actions">

<label>

<input

type="radio"

name="student_${student.id}"

value="P"

${status==="P"?"checked":""}

>

Present

</label>

<label>

<input

type="radio"

name="student_${student.id}"

value="A"

${status==="A"?"checked":""}

>

Absent

</label>

</div>

</div>

`;

});

}
/* ===========================
   Mark All Present
=========================== */

window.markAllPresent = function(){

document.querySelectorAll(

'input[value="P"]'

).forEach(radio=>{

radio.checked = true;

});

};

/* ===========================
   Mark All Absent
=========================== */

window.markAllAbsent = function(){

document.querySelectorAll(

'input[value="A"]'

).forEach(radio=>{

radio.checked = true;

});

};

/* ===========================
   Save Attendance
=========================== */

window.saveAttendance = async function(){

try{

for(const student of students){

const selected = document.querySelector(

`input[name="student_${student.id}"]:checked`

);

if(!selected) continue;

const attendance =

student.attendance || {};

attendance[attendanceDate.value] =

selected.value;

await updateDoc(

doc(db,"students",student.id),

{

attendance:attendance

}

);

}

alert("Attendance Saved Successfully ✅");

await loadStudents();

}catch(error){

console.error(error);

alert("Failed to save attendance ❌");

}

};
/* ===========================
   Student Search
=========================== */

const searchInput =
document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("input",()=>{

const keyword =
searchInput.value.toLowerCase().trim();

const cards =
document.querySelectorAll(".student");

cards.forEach(card=>{

const name =
card.querySelector("h3")
.textContent
.toLowerCase();

if(name.includes(keyword)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}

/* ===========================
   Auto Refresh
=========================== */

if(attendanceDate){

attendanceDate.addEventListener("change",()=>{

loadAttendance();

});

}

if(classFilter){

classFilter.addEventListener("change",()=>{

loadAttendance();

});

}

/* ===========================
   Initialize Attendance
=========================== */

window.addEventListener("DOMContentLoaded",()=>{

loadStudents();

});
/* ===========================
   Attendance Statistics
=========================== */

function updateAttendanceSummary(){

const total = students.length;

let present = 0;

let absent = 0;

students.forEach(student=>{

if(student.attendance){

const status =

student.attendance[attendanceDate.value];

if(status==="P"){

present++;

}else if(status==="A"){

absent++;

}

}

});

const totalBox =
document.getElementById("totalStudents");

const presentBox =
document.getElementById("presentStudents");

const absentBox =
document.getElementById("absentStudents");

if(totalBox){

totalBox.textContent = total;

}

if(presentBox){

presentBox.textContent = present;

}

if(absentBox){

absentBox.textContent = absent;

}

}

/* ===========================
   Refresh Dashboard
=========================== */

const oldLoadAttendance = loadAttendance;

loadAttendance = function(){

oldLoadAttendance();

updateAttendanceSummary();

};

/* ===========================
   Utility
=========================== */

window.refreshAttendance = function(){

loadStudents();

};

console.log("Attendance Module v5.3 Ready ✅");
