// =====================================
// EZEE VISION CHAMPUA
// Dashboard Script v3.0
// =====================================

let students = JSON.parse(localStorage.getItem("students")) || [];

const studentContainer = document.getElementById("studentContainer");
const searchInput = document.getElementById("searchInput");

// ----------------------
// Dashboard
// ----------------------

function updateDashboard(){

    const total = students.length;

    document.getElementById("totalStudents").innerText = total;

    let present = 0;
    let absent = 0;

    const today = new Date().toISOString().split("T")[0];

    students.forEach(student=>{

        if(student.attendance){

            if(student.attendance[today]=="P")
                present++;

            if(student.attendance[today]=="A")
                absent++;

        }

    });

    document.getElementById("presentToday").innerText = present;

    document.getElementById("absentToday").innerText = absent;

    let percentage = 0;

    if(present + absent > 0){

        percentage =
        ((present/(present+absent))*100).toFixed(1);

    }

    document.getElementById("attendancePercent").innerText =
    percentage + "%";

}

// ----------------------
// Student List
// ----------------------

function renderStudents(search=""){

    studentContainer.innerHTML="";

    const list = students.filter(student=>

        student.name
        .toLowerCase()
        .includes(search.toLowerCase())

    );

    if(list.length===0){

        studentContainer.innerHTML=
        `<p class="empty">
        No Students Found
        </p>`;

        updateDashboard();

        return;

    }

    list.forEach(student=>{

        studentContainer.innerHTML += `

<div class="student">

<div class="student-top">

<div class="avatar">

👨‍🎓

</div>

<div>

<h3>${student.name}</h3>

<p><b>Roll :</b> ${student.roll}</p>

<p><b>Class :</b> ${student.className}</p>

</div>

</div>

<p><b>Parent :</b> ${student.parent}</p>

<p><b>Mobile :</b> ${student.mobile}</p>

</div>

`;

    });

    updateDashboard();

}

// ----------------------
// Search
// ----------------------

searchInput.addEventListener("input",function(){

    renderStudents(this.value);

});

// ----------------------
// Add Student
// ----------------------

function addStudent(){

    window.location.href="students.html";

}

// ----------------------

renderStudents();
