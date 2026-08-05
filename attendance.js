let students = JSON.parse(localStorage.getItem("students")) || [];

const tbody = document.querySelector("tbody");

const today = new Date().toISOString().split("T")[0];

document.getElementById("todayDate").innerHTML = today;

function loadStudents(){

tbody.innerHTML="";

students.forEach((student,index)=>{

tbody.innerHTML += `

<tr>

<td>${student.roll}</td>

<td>${student.name}</td>

<td>

<input

type="radio"

name="a${index}"

value="P"

checked>

</td>

<td>

<input

type="radio"

name="a${index}"

value="A">

</td>

</tr>

`;

});

}

loadStudents();

function saveAttendance(){

students.forEach((student,index)=>{

let status=document.querySelector(

'input[name="a'+index+'"]:checked'

).value;

if(!student.attendance)

student.attendance={};

student.attendance[today]=status;

});

localStorage.setItem(

"students",

JSON.stringify(students)

);

alert("Attendance Saved");

}
