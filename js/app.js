// ===============================
// EZEE VISION Dashboard
// ===============================

let students = getStudents();

const container = document.getElementById("studentContainer");
const searchInput = document.getElementById("searchInput");

function dashboard() {

    document.getElementById("totalStudents").innerText =
        students.length;

    document.getElementById("presentToday").innerText = 0;

    document.getElementById("absentToday").innerText = 0;

    document.getElementById("attendancePercent").innerText = "0%";

}

function render(search = "") {

    container.innerHTML = "";

    let filtered = students.filter(student =>

        student.name
        .toLowerCase()
        .includes(search.toLowerCase())

    );

    if (filtered.length == 0) {

        container.innerHTML =

        `<p class="empty">
        No students found.
        </p>`;

        dashboard();

        return;

    }

    filtered.forEach(student => {

        container.innerHTML += `

<div class="student">

<h3>${student.name}</h3>

<p><b>Roll :</b> ${student.roll}</p>

<p><b>Class :</b> ${student.className}</p>

<p><b>Parent :</b> ${student.parent}</p>

<p><b>Mobile :</b> ${student.mobile}</p>

</div>

`;

    });

    dashboard();

}

searchInput.addEventListener(

"input",

function(){

render(this.value);

}

);

document
.getElementById("addStudentBtn")
.addEventListener(

"click",

function(){

location.href="students.html";

}

);

render();
