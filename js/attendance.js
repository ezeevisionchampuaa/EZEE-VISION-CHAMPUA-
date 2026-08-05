/* ===================================
   EZEE VISION ERP v4.0
   Attendance Module
=================================== */

let students = JSON.parse(localStorage.getItem("students")) || [];

const attendanceDate = document.getElementById("attendanceDate");
const classFilter = document.getElementById("classFilter");
const attendanceList = document.getElementById("attendanceList");

attendanceDate.value = new Date().toISOString().split("T")[0];

classFilter.addEventListener("change", loadAttendance);
attendanceDate.addEventListener("change", loadAttendance);

function loadAttendance(){

attendanceList.innerHTML="";

let filtered = students;

if(classFilter.value!="All"){

filtered = students.filter(student=>student.className==classFilter.value);

}

if(filtered.length===0){

attendanceList.innerHTML='<p class="empty">No Students Found</p>';

return;

}

filtered.forEach(student=>{

let status="P";

if(student.attendance){

status=student.attendance[attendanceDate.value] || "P";

}

attendanceList.innerHTML += `

<div class="student">

<h3>${student.name}</h3>

<p>${student.className} | Roll : ${student.roll}</p>

<label>

<input
type="radio"
name="student${student.id}"
value="P"
${status=="P"?"checked":""}>

Present

</label>

<label>

<input
type="radio"
name="student${student.id}"
value="A"
${status=="A"?"checked":""}>

Absent

</label>

</div>

`;

});

}

function markAllPresent(){

document.querySelectorAll('input[value="P"]').forEach(r=>{

r.checked=true;

});

}

function markAllAbsent(){

document.querySelectorAll('input[value="A"]').forEach(r=>{

r.checked=true;

});

}

function saveAttendance(){

students.forEach(student=>{

const radio=document.querySelector(

`input[name="student${student.id}"]:checked`

);

if(radio){

if(!student.attendance){

student.attendance={};

}

student.attendance[attendanceDate.value]=radio.value;

}

});

localStorage.setItem(

"students",

JSON.stringify(students)

);

alert("Attendance Saved Successfully ✅");

}

loadAttendance();
