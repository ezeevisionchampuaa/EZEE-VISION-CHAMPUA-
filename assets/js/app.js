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


