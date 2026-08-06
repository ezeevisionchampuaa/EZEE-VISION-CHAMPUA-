/* ==========================================================
   EZEE VISION CHAMPUA
   Premium Coaching Management System
   Phase 1C-1
==========================================================*/

"use strict";

/* ---------- DOM ---------- */

const liveTime = document.getElementById("liveTime");
const liveDate = document.getElementById("liveDate");
const greeting = document.getElementById("greeting");

const studentCount = document.getElementById("studentCount");
const attendanceCount = document.getElementById("attendanceCount");
const feesToday = document.getElementById("feesToday");
const pendingFees = document.getElementById("pendingFees");

/* ---------- Greeting ---------- */

function updateGreeting(){

const hour = new Date().getHours();

let text = "Good Evening,";

if(hour >= 5 && hour < 12){

text = "Good Morning,";

}

else if(hour >= 12 && hour < 17){

text = "Good Afternoon,";

}

else if(hour >= 17 && hour < 21){

text = "Good Evening,";

}

else{

text = "Good Night,";

}

if(greeting){

greeting.textContent = text;

}

}

/* ---------- Live Time ---------- */

function updateTime(){

const now = new Date();

if(liveTime){

liveTime.textContent = now.toLocaleTimeString("en-IN",{

hour:"2-digit",

minute:"2-digit",

second:"2-digit",

hour12:true

});

}

if(liveDate){

liveDate.textContent = now.toLocaleDateString("en-IN",{

weekday:"long",

day:"numeric",

month:"long",

year:"numeric"

});

}

}

/* ---------- Dashboard Placeholder ---------- */

function loadDashboard(){

studentCount.textContent = "0";

attendanceCount.textContent = "0";

feesToday.textContent = "₹0";

pendingFees.textContent = "₹0";

}

/* ---------- Start ---------- */

updateGreeting();

updateTime();

loadDashboard();

setInterval(updateTime,1000);


/* ==========================================================
   Phase 1C-2B
   Navigation + Notification + Future Ready Events
==========================================================*/

/* ---------- Elements ---------- */

const notificationBtn = document.getElementById("notificationBtn");
const notificationPanel = document.getElementById("notificationPanel");

const quickButtons = document.querySelectorAll(".quick-card");

const navButtons = document.querySelectorAll(".nav-item");

/* ---------- Notification Panel ---------- */

if(notificationBtn && notificationPanel){

notificationBtn.addEventListener("click",()=>{

const hidden = notificationPanel.hasAttribute("hidden");

if(hidden){

notificationPanel.removeAttribute("hidden");

}

else{

notificationPanel.setAttribute("hidden","");

}

});

document.addEventListener("click",(e)=>{

if(

!notificationPanel.contains(e.target)

&&

!notificationBtn.contains(e.target)

){

notificationPanel.setAttribute("hidden","");

}

});

}

/* ---------- Bottom Navigation ---------- */

navButtons.forEach(button=>{

button.addEventListener("click",()=>{

navButtons.forEach(item=>{

item.classList.remove("active");

});

button.classList.add("active");

const page = button.dataset.page;

console.log("Navigate :",page);

/*

Future

dashboard.html

students.html

attendance.html

fees.html

reports.html

*/

});

});

/* ---------- Quick Actions ---------- */

quickButtons.forEach(button=>{

button.addEventListener("click",()=>{

button.style.transform="scale(.96)";

setTimeout(()=>{

button.style.transform="";

},150);

const action = button.dataset.action;

console.log("Action :",action);

/*

Future Routing

add-student

attendance

fees

reports

students

settings

*/

});

});

/* ---------- Placeholder Functions ---------- */

function openStudents(){

console.log("Students Module");

}

function openAttendance(){

console.log("Attendance Module");

}

function openFees(){

console.log("Fees Module");

}

function openReports(){

console.log("Reports Module");

}

function openSettings(){

console.log("Settings Module");

}

/* ---------- App Loaded ---------- */

window.addEventListener("load",()=>{

console.log("EZEE VISION CHAMPUA Loaded Successfully");

});
