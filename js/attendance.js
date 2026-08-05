let students = getStudents();

const list = document.getElementById("attendanceList");

const dateInput = document.getElementById("attendanceDate");

dateInput.value = new Date().toISOString().split("T")[0];

renderAttendance();

function renderAttendance(){

list.innerHTML="";

students.forEach(student=>{

const status =
student.attendance?.[dateInput.value] || "P";

list.innerHTML += `

<div class="student">

<h3>${student.name}</h3>

<p>Class : ${student.className}</p>

<label>

<input
type="radio"
name="${student.id}"
value="P"
${status=="P"?"checked":""}>

Present

</label>

<label>

<input
type="radio"
name="${student.id}"
value="A"
${status=="A"?"checked":""}>

Absent

</label>

</div>

`;

});

}

dateInput.addEventListener("change",renderAttendance);

function saveAttendance(){

students.forEach(student=>{

const status=document.querySelector(

`input[name="${student.id}"]:checked`

).value;

if(!student.attendance)

student.attendance={};

student.attendance[dateInput.value]=status;

});

saveStudents(students);

alert("Attendance Saved Successfully");

}
