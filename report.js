let students =
JSON.parse(localStorage.getItem("students"))||[];

const tbody =
document.getElementById("reportTable");

students.forEach(student=>{

tbody.innerHTML += `

<tr>

<td>${student.roll}</td>

<td>${student.name}</td>

<td>${attendancePercentage(student)}%</td>

</tr>

`;

});

function attendancePercentage(student){

const now=new Date();

let present=0;

let total=0;

for(let d in student.attendance){

let date=new Date(d);

if(date.getMonth()==now.getMonth()
&&
date.getFullYear()==now.getFullYear()){

total++;

if(student.attendance[d]=="P")
present++;

}

}

if(total==0)return 0;

return ((present/total)*100).toFixed(1);

}
