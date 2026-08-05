let students = JSON.parse(localStorage.getItem("students")) || [];

function saveData() {
    localStorage.setItem("students", JSON.stringify(students));
}

function render() {

    document.getElementById("students").innerText = students.length;

    let html = "";

    students.forEach((student, index) => {

        html += `
<div class="student">

<h3>${student.name}</h3>

<p><b>Roll:</b> ${student.roll}</p>
<p><b>Class:</b> ${student.className}</p>

<button onclick="markAttendance(${index},'P')">✅ Present</button>

<button onclick="markAttendance(${index},'A')">❌ Absent</button>

<p><b>This Month:</b> ${attendancePercentage(student)}%</p>

<button onclick="editStudent(${index})">Edit</button>

<button onclick="deleteStudent(${index})">Delete</button>

</div>
`;
    });

    document.getElementById("studentList").innerHTML = html;

}

function addStudent() {

    let name = prompt("Student Name");
    if (!name) return;

    let roll = prompt("Roll Number");
    let className = prompt("Class");
    let parent = prompt("Parent Name");
    let mobile = prompt("Mobile Number");

    students.push({

    name,
    roll,
    className,
    parent,
    mobile,

    attendance:{}

});

    saveData();
    render();

}

function editStudent(index) {

    students[index].name = prompt("Student Name", students[index].name);
    students[index].roll = prompt("Roll Number", students[index].roll);
    students[index].className = prompt("Class", students[index].className);
    students[index].parent = prompt("Parent Name", students[index].parent);
    students[index].mobile = prompt("Mobile Number", students[index].mobile);

    saveData();
    render();

}

function deleteStudent(index) {

    if (confirm("Delete this student?")) {

        students.splice(index, 1);

        saveData();

        render();

    }

}

render();
function today(){

return new Date().toISOString().split("T")[0];

}

function markAttendance(index,status){

students[index].attendance[today()] = status;

saveData();

render();

}

function attendancePercentage(student){

const now = new Date();

const month = now.getMonth();

const year = now.getFullYear();

let present = 0;

let total = 0;

for(let date in student.attendance){

let d = new Date(date);

if(d.getMonth()==month && d.getFullYear()==year){

total++;

if(student.attendance[date]=="P") present++;

}

}

if(total==0) return 0;

return ((present/total)*100).toFixed(1);

}
