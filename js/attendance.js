// =====================================
// EZEE VISION CHAMPUA
// Attendance System v3.0
// =====================================

let students = JSON.parse(localStorage.getItem("students")) || [];

const attendanceList = document.getElementById("attendanceList");
const attendanceDate = document.getElementById("attendanceDate");
const saveBtn = document.getElementById("saveAttendanceBtn");

// Today's Date
const today = new Date().toISOString().split("T")[0];
attendanceDate.value = today;

// ------------------------------
// Render Students
// ------------------------------

function loadStudents(){

    attendanceList.innerHTML = "";

    if(students.length === 0){

        attendanceList.innerHTML = `
        <p class="empty">
        No Students Added
        </p>
        `;

        return;

    }

    students.forEach(student=>{

        const status =
        student.attendance?.[attendanceDate.value] || "P";

        attendanceList.innerHTML += `

        <div class="student">

            <h3>${student.name}</h3>

            <p>
            Roll : ${student.roll}
            </p>

            <p>
            Class : ${student.className}
            </p>

            <br>

            <label>

            <input
            type="radio"
            name="student${student.id}"
            value="P"
            ${status==="P" ? "checked" : ""}>

            Present

            </label>

            <label>

            <input
            type="radio"
            name="student${student.id}"
            value="A"
            ${status==="A" ? "checked" : ""}>

            Absent

            </label>

        </div>

        `;

    });

}

// ------------------------------
// Change Date
// ------------------------------

attendanceDate.addEventListener("change",loadStudents);

// ------------------------------
// Save Attendance
// ------------------------------

saveBtn.addEventListener("click",()=>{

    students.forEach(student=>{

        const selected = document.querySelector(

        `input[name="student${student.id}"]:checked`

        );

        if(!student.attendance){

            student.attendance = {};

        }

        student.attendance[attendanceDate.value] =
        selected.value;

    });

    localStorage.setItem(

        "students",

        JSON.stringify(students)

    );

    alert("Attendance Saved Successfully ✅");

});

// ------------------------------

loadStudents();
