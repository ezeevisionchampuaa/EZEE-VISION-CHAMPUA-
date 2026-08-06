/* ===================================
   EZEE VISION ERP v5.1
   Dashboard Module
=================================== */

import { db } from "./firebase.js";

import {
collection,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ===========================
   Global Variables
=========================== */

let students = [];

const studentContainer =
document.getElementById("studentContainer");

const searchInput =
document.getElementById("searchInput");

/* ===========================
   Dashboard
=========================== */

function updateDashboard(){

const total = students.length;

let present = 0;

let absent = 0;

const today =
new Date().toISOString().split("T")[0];

students.forEach(student=>{

if(student.attendance){

if(student.attendance[today]=="P")
present++;

if(student.attendance[today]=="A")
absent++;

}

});

document.getElementById("totalStudents").textContent=total;

document.getElementById("presentToday").textContent=present;

document.getElementById("absentToday").textContent=absent;

const totalMarked = present + absent;

const percent =

totalMarked===0

?0

:((present/totalMarked)*100).toFixed(1);

const attendanceBox =
document.getElementById("attendancePercent");

if(attendanceBox){

attendanceBox.textContent =
percent+"%";

}

}
/* ===========================
   Student Card
=========================== */

function createStudentCard(student){

let present = 0;
let absent = 0;

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

if(student.attendance){

for(const date in student.attendance){

const d = new Date(date);

if(d.getFullYear()===year && d.getMonth()===month){

if(student.attendance[date]==="P"){

present++;

}else{

absent++;

}

}

}

}

const total = present + absent;

const percentage =

total===0 ? 0 :

((present/total)*100).toFixed(1);

let color="#ef4444";

if(percentage>=90){

color="#16a34a";

}else if(percentage>=75){

color="#f59e0b";

}

return `

<div class="student">

<div class="student-top">

<div class="avatar">👨‍🎓</div>

<div>

<h3>${student.name}</h3>

<p><b>Roll :</b> ${student.roll}</p>

<p><b>${student.className}</b></p>

</div>

</div>

<p><b>Parent :</b> ${student.parent || "-"}</p>

<p><b>Mobile :</b> ${student.mobile || "-"}</p>

<p>

<b>Attendance :</b>

<span style="color:${color};font-weight:bold;">

${percentage}%

</span>

</p>

<div class="actions">

<button onclick="editStudent('${student.id}')">

✏️ Edit

</button>

<button onclick="deleteStudent('${student.id}')">

🗑 Delete

</button>

</div>

</div>

`;

}

/* ===========================
   Render Students
=========================== */

function renderStudents(keyword=""){

if(!studentContainer) return;

studentContainer.innerHTML="";

const filtered = students.filter(student=>

student.name.toLowerCase()

.includes(keyword.toLowerCase())

);

if(filtered.length===0){

studentContainer.innerHTML=

'<p class="empty">No Students Found</p>';

updateDashboard();

return;

}

filtered.forEach(student=>{

studentContainer.innerHTML +=

createStudentCard(student);

});

updateDashboard();

}

/* ===========================
   Search
=========================== */

if(searchInput){

searchInput.addEventListener("input",()=>{

renderStudents(searchInput.value);

});

}
/* ===========================
   Firebase Functions
=========================== */

async function loadStudents(){

students = [];

const snapshot = await getDocs(
collection(db,"students")
);

snapshot.forEach((docItem)=>{

students.push({

id: docItem.id,

...docItem.data()

});

});

renderStudents();

}

window.editStudent = function(id){

localStorage.setItem(
"editStudentId",
id
);

location.href="students.html";

};

window.deleteStudent = async function(id){

if(localStorage.getItem("adminLogin")!=="true"){

alert("Admin Login Required");

location.href="login.html";

return;

}

if(!confirm("Delete this student?")){

return;

}

await deleteDoc(doc(db,"students",id));

alert("Student Deleted Successfully ✅");

await loadStudents();

};

window.addStudent = function(){

if(localStorage.getItem("adminLogin")!=="true"){

alert("Admin Login Required");

location.href="login.html";

return;

}

location.href="students.html";

};
/* ===========================
   Navigation
=========================== */

window.openAttendance = function(){

location.href = "attendance.html";

};

window.openReport = function(){

location.href = "report.html";

};

window.openStudents = function(){

location.href = "students.html";

};

window.openFees = function(){

location.href = "fees.html";

};

/* ===========================
   App Start
=========================== */

document.addEventListener("DOMContentLoaded",()=>{

loadStudents();

});
