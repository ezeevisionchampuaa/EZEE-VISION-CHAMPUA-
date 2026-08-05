/* ===================================
   EZEE VISION ERP v4.0
=================================== */

let students = JSON.parse(localStorage.getItem("students")) || [];

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

return `

<div class="student">

<div class="student-top">

<div class="avatar">

👨‍🎓

</div>

<div>

<h3>${student.name}</h3>

<p>Roll : ${student.roll}</p>

<p>Class : ${student.className}</p>

</div>

</div>

<p><b>Parent :</b> ${student.parent || "-"}</p>

<p><b>Mobile :</b> ${student.mobile || "-"}</p>

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

renderStudents();
