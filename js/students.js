/* ===================================
   EZEE VISION ERP v4.0
   Student Module
=================================== */

let students = JSON.parse(localStorage.getItem("students")) || [];

function saveStudent(){

const name = document.getElementById("studentName").value.trim();
const roll = document.getElementById("rollNumber").value.trim();
const className = document.getElementById("className").value;
const parent = document.getElementById("parentName").value.trim();
const mobile = document.getElementById("mobileNumber").value.trim();

if(name=="" || roll=="" || className==""){

alert("Please fill all required fields.");

return;

}

const student={

id:Date.now(),

name:name,

roll:roll,

className:className,

parent:parent,

mobile:mobile,

attendance:{},

tests:[],

fees:{

paid:0,

due:0

},

homework:[]

};

students.push(student);

localStorage.setItem(

"students",

JSON.stringify(students)

);

alert("Student Added Successfully ✅");

window.location.href="index.html";

}
