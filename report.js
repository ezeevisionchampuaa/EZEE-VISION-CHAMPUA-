// =====================================
// EZEE VISION CHAMPUA
// Monthly Report v3.0
// =====================================

let students = JSON.parse(localStorage.getItem("students")) || [];

const reportMonth = document.getElementById("reportMonth");
const reportContainer = document.getElementById("reportContainer");
const generateBtn = document.getElementById("generateReportBtn");
const downloadBtn = document.getElementById("downloadCSVBtn");

// Current Month
const now = new Date();

reportMonth.value =
`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}`;

// Generate Report
generateBtn.addEventListener("click", generateReport);

generateReport();

function generateReport(){

const value = reportMonth.value;

if(!value){

alert("Select Month");

return;

}

const [year,month]=value.split("-").map(Number);

let html=`

<table>

<tr>

<th>Name</th>

<th>Roll</th>

<th>Present</th>

<th>Absent</th>

<th>%</th>

</tr>

`;

students.forEach(student=>{

let present=0;

let absent=0;

if(student.attendance){

for(let date in student.attendance){

const d=new Date(date);

if(

d.getFullYear()==year &&

(d.getMonth()+1)==month

){

if(student.attendance[date]=="P")

present++;

else

absent++;

}

}

}

const total=present+absent;

const percentage=

total===0

?0

:((present/total)*100).toFixed(1);

let color="#dc2626";

if(percentage>=90)

color="#16a34a";

else if(percentage>=75)

color="#eab308";

html+=`

<tr>

<td>${student.name}</td>

<td>${student.roll}</td>

<td>${present}</td>

<td>${absent}</td>

<td style="color:${color};font-weight:bold;">

${percentage}%

</td>

</tr>

`;

});

html+="</table>";

reportContainer.innerHTML=html;

}

// CSV Export

downloadBtn.addEventListener("click",()=>{

const value=reportMonth.value;

const [year,month]=value.split("-").map(Number);

let csv="Name,Roll,Present,Absent,Percentage\n";

students.forEach(student=>{

let present=0;

let absent=0;

if(student.attendance){

for(let date in student.attendance){

const d=new Date(date);

if(

d.getFullYear()==year &&

(d.getMonth()+1)==month

){

if(student.attendance[date]=="P")

present++;

else

absent++;

}

}

}

const total=present+absent;

const percentage=

total===0

?0

:((present/total)*100).toFixed(1);

csv+=`${student.name},${student.roll},${present},${absent},${percentage}%\n`;

});

const blob=new Blob([csv],{type:"text/csv"});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="Monthly_Attendance_Report.csv";

a.click();

URL.revokeObjectURL(url);

});
