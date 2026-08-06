/* ===================================
   EZEE VISION ERP v5.5
   Fees Management Module
=================================== */

import { db } from "./firebase.js";

import {

collection,
getDocs,
doc,
updateDoc,
arrayUnion

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ===========================
   Global Variables
=========================== */

let students = [];

const studentSelect =
document.getElementById("studentSelect");

const amountInput =
document.getElementById("feeAmount");

const dateInput =
document.getElementById("feeDate");

const paymentMode =
document.getElementById("paymentMode");

const historyContainer =
document.getElementById("feeHistory");

const totalCollection =
document.getElementById("totalCollection");

const totalPending =
document.getElementById("totalPending");

/* ===========================
   Default Date
=========================== */

const today =
new Date().toISOString().split("T")[0];

if(dateInput){

dateInput.value = today;

}

console.log("Fees Module v5.5 Started ✅");

/* ===========================
   Load Students From Firebase
=========================== */

async function loadStudents(){

students = [];

try{

const snapshot = await getDocs(

collection(db,"students")

);

if(studentSelect){

studentSelect.innerHTML =

'<option value="">Select Student</option>';

}

snapshot.forEach((docItem)=>{

const student={

id:docItem.id,

...docItem.data()

};

students.push(student);

if(studentSelect){

studentSelect.innerHTML += `

<option value="${student.id}">

${student.name} (${student.className})

</option>

`;

}

});

updateFeeDashboard();

}catch(error){

console.error(error);

alert("Unable to load students.");

}

}

/* ===========================
   Dashboard
=========================== */

function updateFeeDashboard(){

if(totalCollection){

totalCollection.textContent="₹0";

}

if(totalPending){

totalPending.textContent="₹0";

}

}

/* ===========================
   Page Initialize
=========================== */

document.addEventListener(

"DOMContentLoaded",

()=>{

loadStudents();

}

);

/* ===========================
   Collect Fee
=========================== */

async function collectFee(){

const studentId = studentSelect.value;

const amount = Number(amountInput.value);

const feeDate = dateInput.value;

const mode = paymentMode.value;

if(studentId===""){

alert("Please select a student.");

return;

}

if(!amount || amount<=0){

alert("Please enter a valid amount.");

return;

}

const feeRecord={

amount:amount,

date:feeDate,

mode:mode,

timestamp:new Date().toISOString()

};

try{

await updateDoc(

doc(db,"students",studentId),

{

fees:arrayUnion(feeRecord)

}

);

alert("Fee Collected Successfully ✅");

amountInput.value="";

loadStudents();

}catch(error){

console.error(error);

alert("Failed to collect fee ❌");

}

}

/* ===========================
   Button Event
=========================== */

const collectBtn =
document.getElementById("collectFeeBtn");

if(collectBtn){

collectBtn.addEventListener(

"click",

collectFee

);

}

/* ===========================
   Fee History
=========================== */

function loadFeeHistory(){

if(!historyContainer) return;

historyContainer.innerHTML = "";

let totalCollected = 0;

students.forEach(student=>{

const fees = student.fees || [];

fees.forEach(fee=>{

totalCollected += Number(fee.amount || 0);

historyContainer.innerHTML += `

<div class="student">

<h3>${student.name}</h3>

<p><b>Class :</b> ${student.className}</p>

<p><b>Amount :</b> ₹${fee.amount}</p>

<p><b>Date :</b> ${fee.date}</p>

<p><b>Mode :</b> ${fee.mode}</p>

</div>

`;

});

});

if(historyContainer.innerHTML===""){

historyContainer.innerHTML=

'<p class="empty">No Fee Records Found</p>';

}

if(totalCollection){

totalCollection.textContent="₹"+totalCollected;

}

}

/* ===========================
   Pending Fees
=========================== */

function updatePendingFees(){

let pending = 0;

students.forEach(student=>{

const totalPaid =

(student.fees || [])

.reduce((sum,fee)=>

sum + Number(fee.amount || 0)

,0);

/* Default Monthly Fee */

const monthlyFee = 1000;

if(totalPaid < monthlyFee){

pending +=

(monthlyFee-totalPaid);

}

});

if(totalPending){

totalPending.textContent=

"₹"+pending;

}

}

/* ===========================
   Dashboard Refresh
=========================== */

function refreshFees(){

loadFeeHistory();

updatePendingFees();

}

const oldLoadStudents = loadStudents;

loadStudents = async function(){

await oldLoadStudents();

refreshFees();

};

/* ===========================
   Search Student
=========================== */

const searchInput =
document.getElementById("searchInput");

const monthFilter =
document.getElementById("monthFilter");

function filterFeeHistory(){

if(!historyContainer) return;

const keyword =

searchInput

? searchInput.value.toLowerCase().trim()

: "";

const selectedMonth =

monthFilter

? monthFilter.value

: "";

const cards =

historyContainer.querySelectorAll(".student");

cards.forEach(card=>{

const text =

card.textContent.toLowerCase();

let visible = true;

/* ---------- Search ---------- */

if(

keyword!=="" &&

!text.includes(keyword)

){

visible = false;

}

/* ---------- Month Filter ---------- */

if(

selectedMonth!=="" &&

selectedMonth!=="All"

){

const dateText =

card.innerHTML.match(

/Date :<\/b>\s*([0-9-]+)/

);

if(dateText){

const month =

new Date(dateText[1])

.getMonth()+1;

if(

month != Number(selectedMonth)

){

visible = false;

}

}

}

card.style.display =

visible ? "block" : "none";

});

}

/* ===========================
   Events
=========================== */

if(searchInput){

searchInput.addEventListener(

"input",

filterFeeHistory

);

}

if(monthFilter){

monthFilter.addEventListener(

"change",

filterFeeHistory

);

}

/* ===========================
   Print Receipt
=========================== */

window.printReceipt = function(){

window.print();

};

/* ===========================
   Export CSV
=========================== */

window.exportFeesCSV = function(){

let csv =
"Student,Class,Amount,Date,Payment Mode\n";

students.forEach(student=>{

const fees = student.fees || [];

fees.forEach(fee=>{

csv +=

`${student.name},${student.className},${fee.amount},${fee.date},${fee.mode}\n`;

});

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
"EZEE_VISION_Fee_Report.csv";

link.click();

URL.revokeObjectURL(link.href);

};

/* ===========================
   Monthly Collection
=========================== */

function updateMonthlyCollection(){

const month =

new Date().getMonth();

const year =

new Date().getFullYear();

let total = 0;

students.forEach(student=>{

(student.fees || []).forEach(fee=>{

const d = new Date(fee.date);

if(

d.getMonth()===month &&

d.getFullYear()===year

){

total += Number(fee.amount || 0);

}

});

});

const monthlyBox =

document.getElementById("monthlyCollection");

if(monthlyBox){

monthlyBox.textContent =

"₹"+total;

}

}

/* ===========================
   Dashboard Refresh
=========================== */

const oldRefreshFees = refreshFees;

refreshFees = function(){

oldRefreshFees();

updateMonthlyCollection();

};

/* ===========================
   Auto Initialize
=========================== */

document.addEventListener(

"DOMContentLoaded",

()=>{

loadStudents();

});

console.log(

"EZEE VISION ERP v5.5 Ready ✅"

);
