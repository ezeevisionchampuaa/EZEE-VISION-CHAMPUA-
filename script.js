/* ===================================
   EZEE VISION ERP v4.0
=================================== */
import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";



let students = [];

const studentContainer = document.getElementById("studentContainer");
const searchInput = document.getElementById("searchInput");

/* ---------------- Dashboard ---------------- */

function updateDashboard(){

    const total = students.length;

    let present = 0;
    let absent = 0;

    const today = new Date().toISOString().split("T")[0];

    students.forEach(student=>{

        if(student.attendance){

            if(student.attendance[today]=="P") present++;

            if(student.attendance[today]=="A") absent++;

        }

    });

    document.getElementById("totalStudents").textContent = total;

    document.getElementById("presentToday").textContent = present;

    document.getElementById("absentToday").textContent = absent;

    let percentage = 0;

    if((present+absent)>0){

        percentage = ((present/(present+absent))*100).toFixed(1);

    }

    document.getElementById("attendancePercent").textContent =
    percentage + "%";

}

/* ---------------- Student Card ---------------- */

function createStudentCard(student){

let present=0;

let absent=0;

const today=new Date();

const year=today.getFullYear();

const month=today.getMonth();

if(student.attendance){

for(let date in student.attendance){

const d=new Date(date);

if(

d.getFullYear()==year &&

d.getMonth()==month

){

if(student.attendance[date]=="P")

present++;

else

absent++;

}

}

}

const total=present+absent;

const percentage=

total==0

?0

:((present/total)*100).toFixed(1);

let color="#ef4444";

if(percentage>=90){

color="#16a34a";

}else if(percentage>=75){

color="#f59e0b";

}

return `

<div class="student">

<div class="student-top">

<div class="avatar">

👨‍🎓

</div>

<div>

<h3>${student.name}</h3>

<p><b>Roll :</b> ${student.roll}</p>

<p><b>${student.className}</b></p>

</div>

</div>

<p><b>Parent :</b> ${student.parent || "-"}</p>

<p><b>Mobile :</b> ${student.mobile || "-"}</p>

<p>

<b>Monthly Attendance :</b>

<span style="color:${color};font-weight:bold;">

${percentage}%

</span>

</p>

<div class="actions">

<button onclick="editStudent(${student.id})">

✏️ Edit

</button>

<button onclick="deleteStudent(${student.id})">

🗑 Delete

</button>

</div>

</div>

`;

}

/* ---------------- Student List ---------------- */

function renderStudents(keyword=""){

studentContainer.innerHTML="";

const list = students.filter(student=>{

return student.name.toLowerCase()

.includes(keyword.toLowerCase());

});

if(list.length===0){

studentContainer.innerHTML=

'<p class="empty">No Students Found</p>';

updateDashboard();

return;

}

list.forEach(student=>{

studentContainer.innerHTML += createStudentCard(student);

});

updateDashboard();

}

/* ---------------- Search ---------------- */

if(searchInput){

searchInput.addEventListener("input",function(){

renderStudents(this.value);

});

}

/* ---------------- Navigation ---------------- */

function openAttendance(){

location.href="attendance.html";

}

function openReport(){

location.href="report.html";

}

function openStudents(){

location.href="students.html";

}

function openFees(){

location.href="fees.html";

}

/* ---------------- Start ---------------- */

// renderStudents();

/* ===========================
   Edit Student
=========================== */

window.editStudent = function(id){

localStorage.setItem(
"editStudentId",
id
);

location.href="students.html";

}

/* ===========================
   Delete Student
=========================== */
window.deleteStudent = function(id){

if(localStorage.getItem("adminLogin")!=="true"){

alert("Admin Login Required");

location.href="login.html";

return;

}

if(!confirm("Delete this student?")) return;

students = students.filter(student=>student.id!==id);

localStorage.setItem("students",JSON.stringify(students));

// renderStudents();

}
async function loadStudents(){

students = [];

const querySnapshot = await getDocs(collection(db,"students"));

querySnapshot.forEach((document)=>{

students.push({

id:document.id,

...document.data()

});

});


/* ===========================
   Add Student
=========================== */

window.addStudent = function () {

    if (localStorage.getItem("adminLogin") !== "true") {

        alert("Admin Login Required");

        location.href = "login.html";

        return;

    }

    location.href = "students.html";

};
render();

updateDashboard();

}

loadStudents();

/* ===========================
   Load Students From Firebase
=========================== */

async function loadStudents(){

students = [];

const snapshot = await getDocs(collection(db,"students"));

snapshot.forEach((docItem)=>{

students.push({

id: docItem.id,

...docItem.data()

});

});

   // renderStudents();

}

loadStudents();
