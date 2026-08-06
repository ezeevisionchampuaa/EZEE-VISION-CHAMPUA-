/* ===================================
   EZEE VISION ERP v5.4
   Report Module
=================================== */

import { db } from "./firebase.js";

import {

collection,
getDocs

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ===========================
   Global Variables
=========================== */

let students = [];

const reportContainer =
document.getElementById("reportContainer");

const monthFilter =
document.getElementById("monthFilter");

const searchInput =
document.getElementById("searchInput");

/* ===========================
   Current Month
=========================== */

const today = new Date();

const currentYear =
today.getFullYear();

const currentMonth =
today.getMonth();

console.log("Report Module v5.4 Started ✅");
/* ===========================
   Load Students From Firebase
=========================== */

async function loadStudents(){

students = [];

try{

const snapshot = await getDocs(

collection(db,"students")

);

snapshot.forEach((docItem)=>{

students.push({

id:docItem.id,

...docItem.data()

});

});

generateReport();

}catch(error){

console.error(error);

if(reportContainer){

reportContainer.innerHTML=

'<p class="empty">Unable to load report.</p>';

}

}

}

/* ===========================
   Event Listeners
=========================== */

if(monthFilter){

monthFilter.addEventListener(

"change",

generateReport

);

}

if(searchInput){

searchInput.addEventListener(

"input",

generateReport

);

}
/* ===========================
   Generate Monthly Report
=========================== */

function generateReport(){

if(!reportContainer) return;

reportContainer.innerHTML = "";

const keyword =

searchInput

? searchInput.value.toLowerCase().trim()

: "";

const selectedMonth =

monthFilter && monthFilter.value !== ""

? parseInt(monthFilter.value)

: currentMonth;

const filteredStudents = students.filter(student=>{

return student.name

.toLowerCase()

.includes(keyword);

});

if(filteredStudents.length===0){

reportContainer.innerHTML =

'<p class="empty">No Students Found</p>';

return;

}

filteredStudents.forEach(student=>{

let present = 0;

let absent = 0;

if(student.attendance){

for(const date in student.attendance){

const d = new Date(date);

if(

d.getFullYear()===currentYear &&

d.getMonth()===selectedMonth

){

if(student.attendance[date]==="P"){

present++;

}else if(student.attendance[date]==="A"){

absent++;

}

}

}

}

const total = present + absent;

const percentage =

total===0

? 0

: ((present/total)*100).toFixed(1);

let color = "#ef4444";

if(percentage>=90){

color="#16a34a";

}else if(percentage>=75){

color="#f59e0b";

}

reportContainer.innerHTML += `

<div class="student">

<h3>${student.name}</h3>

<p>

Class : ${student.className}

&nbsp;|&nbsp;

Roll : ${student.roll}

</p>

<p>Present : ${present}</p>

<p>Absent : ${absent}</p>

<p>

Attendance :

<span style="color:${color};font-weight:bold;">

${percentage}%

</span>

</p>

</div>

`;

});

}
/* ===========================
   Report Summary
=========================== */

function updateReportSummary(){

const totalStudents = students.length;

let totalPresent = 0;

let totalAbsent = 0;

let bestStudent = "-";

let bestPercentage = 0;

students.forEach(student=>{

let present = 0;

let absent = 0;

if(student.attendance){

for(const date in student.attendance){

const d = new Date(date);

if(

d.getFullYear()===currentYear &&

d.getMonth()===(

monthFilter && monthFilter.value!=="" ?

parseInt(monthFilter.value)

:currentMonth

)

){

if(student.attendance[date]==="P"){

present++;

}else if(student.attendance[date]==="A"){

absent++;

}

}

}

}

totalPresent += present;

totalAbsent += absent;

const total = present + absent;

const percentage =

total===0

?0

:(present/total)*100;

if(percentage>bestPercentage){

bestPercentage = percentage;

bestStudent = student.name;

}

});

const averageAttendance =

(totalPresent+totalAbsent)===0

?0

:((totalPresent/(totalPresent+totalAbsent))*100).toFixed(1);

const totalBox =
document.getElementById("summaryTotal");

const averageBox =
document.getElementById("summaryAverage");

const bestBox =
document.getElementById("summaryBest");

if(totalBox){

totalBox.textContent = totalStudents;

}

if(averageBox){

averageBox.textContent = averageAttendance+"%";

}

if(bestBox){

bestBox.textContent =

bestStudent+" ("+

bestPercentage.toFixed(1)+"%)";

}

}

/* ===========================
   Refresh Summary
=========================== */

const oldGenerateReport = generateReport;

generateReport = function(){

oldGenerateReport();

updateReportSummary();

};
/* ===========================
   Advanced Report Filters
=========================== */

function getFilteredStudents(){

let filtered = [...students];

/* ---------- Search ---------- */

if(searchInput){

const keyword =

searchInput.value

.toLowerCase()

.trim();

if(keyword!==""){

filtered = filtered.filter(student=>

student.name

.toLowerCase()

.includes(keyword)

||

student.roll

.toString()

.includes(keyword)

);

}

}

/* ---------- Class Filter ---------- */

const classSelect =

document.getElementById("classFilter");

if(

classSelect &&

classSelect.value!=="All"

){

filtered = filtered.filter(student=>

student.className===

classSelect.value

);

}

/* ---------- Sort By Attendance ---------- */

filtered.sort((a,b)=>{

const pa = calculatePercentage(a);

const pb = calculatePercentage(b);

return pb-pa;

});

return filtered;

}

/* ===========================
   Attendance Percentage
=========================== */

function calculatePercentage(student){

let present=0;

let absent=0;

if(student.attendance){

for(const date in student.attendance){

const d=new Date(date);

const selectedMonth=

monthFilter &&

monthFilter.value!=="" ?

parseInt(monthFilter.value)

:currentMonth;

if(

d.getFullYear()===currentYear &&

d.getMonth()===selectedMonth

){

if(student.attendance[date]==="P"){

present++;

}else if(student.attendance[date]==="A"){

absent++;

}

}

}

}

const total=present+absent;

if(total===0){

return 0;

}

return (present/total)*100;

}

/* ===========================
   Report Utilities
=========================== */

window.printReport = function(){

window.print();

};

window.refreshReport = function(){

loadStudents();

};

/* ===========================
   Export CSV
=========================== */

window.exportCSV = function(){

let csv =
"Name,Class,Roll,Attendance(%)\n";

const reportStudents =
getFilteredStudents();

reportStudents.forEach(student=>{

const percentage =
calculatePercentage(student).toFixed(1);

csv +=

`${student.name},${student.className},${student.roll},${percentage}%\n`;

});

const blob = new Blob(

[csv],

{type:"text/csv"}

);

const link =
document.createElement("a");

link.href =
URL.createObjectURL(blob);

link.download =
"Attendance_Report.csv";

link.click();

URL.revokeObjectURL(link.href);

};

/* ===========================
   Auto Initialize
=========================== */

document.addEventListener(

"DOMContentLoaded",

()=>{

loadStudents();

}

);

console.log(

"EZEE VISION ERP v5.4 Ready ✅"

);
