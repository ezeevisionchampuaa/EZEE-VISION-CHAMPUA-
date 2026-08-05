/* ===================================
   EZEE VISION ERP v4.0
   Fees Management
=================================== */

let students = JSON.parse(localStorage.getItem("students")) || [];

const studentSelect = document.getElementById("studentSelect");
const paymentDate = document.getElementById("paymentDate");
const feeHistory = document.getElementById("feeHistory");

paymentDate.value = new Date().toISOString().split("T")[0];

students.forEach(student=>{

studentSelect.innerHTML +=
`<option value="${student.id}">
${student.name} (${student.className})
</option>`;

});

function saveFee(){

const id = Number(studentSelect.value);
const amount = Number(document.getElementById("feeAmount").value);
const date = paymentDate.value;

if(!id || !amount){

alert("Select student and enter fee amount.");

return;

}

const student = students.find(s=>s.id===id);

if(!student.feesHistory){

student.feesHistory=[];

}

student.feesHistory.push({

amount,

date

});

localStorage.setItem(
"students",
JSON.stringify(students)
);

alert("Fee Saved Successfully ✅");

document.getElementById("feeAmount").value="";

loadHistory();

}

function loadHistory(){

feeHistory.innerHTML="";

let found=false;

students.forEach(student=>{

(student.feesHistory || []).forEach(fee=>{

found=true;

feeHistory.innerHTML += `

<div class="student">

<h3>${student.name}</h3>

<p><b>Class:</b> ${student.className}</p>

<p><b>Amount:</b> ₹${fee.amount}</p>

<p><b>Date:</b> ${fee.date}</p>

</div>

`;

});

});

if(!found){

feeHistory.innerHTML =
'<p class="empty">No Payments Found</p>';

}

}

loadHistory();
