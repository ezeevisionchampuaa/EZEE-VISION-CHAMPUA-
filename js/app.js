// ===============================
// EZEE VISION Dashboard
// ===============================

let students = getStudents();

const container = document.getElementById("studentContainer");
const searchInput = document.getElementById("searchInput");

function dashboard(){

const today=new Date().toISOString().split("T")[0];

let present=0;

let absent=0;

students.forEach(student=>{

if(student.attendance){

if(student.attendance[today]=="P") present++;

if(student.attendance[today]=="A") absent++;

}

});

document.getElementById("totalStudents").innerText=students.length;

document.getElementById("presentToday").innerText=present;

document.getElementById("absentToday").innerText=absent;

const total=present+absent;

document.getElementById("attendancePercent").innerText=

total==0

?"0%"

:((present/total)*100).toFixed(1)+"%";

}

}
function render(search = "") {

container.innerHTML = "";

let filtered = students.filter(student =>
student.name.toLowerCase().includes(search.toLowerCase())
);

dashboard();

if(filtered.length==0){

container.innerHTML=`
<p class="empty">
No students found.
</p>
`;

return;

}

filtered.forEach(student=>{

container.innerHTML+=`

<div class="student">

<div class="student-top">

<div class="avatar">

👨‍🎓

</div>

<div>

<h3>${student.name}</h3>

<p>ID : ${student.id}</p>

<p>Roll : ${student.roll}</p>

</div>

</div>

<hr>

<p><b>Class :</b> ${student.className}</p>

<p><b>Parent :</b> ${student.parent}</p>

<p><b>Mobile :</b> ${student.mobile}</p>

<div class="actions">

<button onclick="editStudent(${student.id})">

✏ Edit

</button>

<button onclick="deleteStudent(${student.id})">

🗑 Delete

</button>

</div>

</div>

`;

});

}

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
function deleteStudent(id){

if(!confirm("Delete Student?")) return;

students=students.filter(s=>s.id!==id);

saveStudents(students);

render(searchInput.value);

}

function editStudent(id){

let student=students.find(s=>s.id===id);

if(!student) return;

localStorage.setItem(
"editStudent",
JSON.stringify(student)
);

location.href="students.html?id="+id;

}
