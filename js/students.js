const editData=
JSON.parse(localStorage.getItem("editStudent"));

if(editData){

document.getElementById("name").value=editData.name;

document.getElementById("roll").value=editData.roll;

document.getElementById("className").value=editData.className;

document.getElementById("parent").value=editData.parent;

document.getElementById("mobile").value=editData.mobile;

}


let students = getStudents();

function saveStudent(){

const name=document.getElementById("name").value.trim();

const roll=document.getElementById("roll").value.trim();

const className=document.getElementById("className").value.trim();

const parent=document.getElementById("parent").value.trim();

const mobile=document.getElementById("mobile").value.trim();

if(name=="" || roll=="" || className==""){

alert("Please fill all required fields");

return;

}

students.push({

id:Date.now(),

name,

roll,

className,

parent,

mobile,

attendance:{}

});

saveStudents(students);

alert("Student Added Successfully");

location.href="index.html";

}
