let students = getStudents();

const reportContainer =
document.getElementById("reportContainer");

const monthInput =
document.getElementById("reportMonth");

const now = new Date();

monthInput.value =
`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}`;

loadReport();

function loadReport(){

reportContainer.innerHTML="";

const [year,month]=
monthInput.value.split("-").map(Number);

let html=`

<table>

<tr>

<th>Name</th>

<th>Present</th>

<th>Absent</th>

<th>%</th>

</tr>

`;

students.forEach(student=>{

let present=0;

let absent=0;

for(let date in student.attendance){

const d=new Date(date);

if(

d.getFullYear()==year &&

d.getMonth()+1==month

){

if(student.attendance[date]=="P")

present++;

else

absent++;

}

}

const total=present+absent;

const percent=

total==0

?0

:((present/total)*100).toFixed(1);

let color="#dc2626";

if(percent>=90)

color="#16a34a";

else if(percent>=75)

color="#ca8a04";

html+=`

<tr>

<td>${student.name}</td>

<td>${present}</td>

<td>${absent}</td>

<td style="color:${color};font-weight:bold">

${percent}%

</td>

</tr>

`;

});

html+="</table>";

reportContainer.innerHTML=html;

}
function exportCSV(){

let csv="Name,Present,Absent,Percentage\n";

const [year,month]=
monthInput.value.split("-").map(Number);

students.forEach(student=>{

let p=0;

let a=0;

for(let date in student.attendance){

const d=new Date(date);

if(

d.getFullYear()==year &&

d.getMonth()+1==month

){

if(student.attendance[date]=="P")

p++;

else

a++;

}

}

let t=p+a;

let per=t==0?0:((p/t)*100).toFixed(1);

csv+=`${student.name},${p},${a},${per}%\n`;

});

const blob=new Blob([csv],{type:"text/csv"});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="Attendance_Report.csv";

a.click();

URL.revokeObjectURL(url);

}
