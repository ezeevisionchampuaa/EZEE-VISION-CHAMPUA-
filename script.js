let students=[];

function render(){

document.getElementById("students").innerText=students.length;

let html="";

students.forEach(student=>{

html+=`
<div class="student">

<b>${student.name}</b>

</div>
`;

});

document.getElementById("studentList").innerHTML=html;

}

function addStudent(){

let name=prompt("Student Name");

if(!name)return;

students.push({

name:name

});

render();

}

render();
