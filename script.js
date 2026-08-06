/* ===================================
   EZEE VISION ERP v8.0
   Script Part 1
=================================== */

document.addEventListener("DOMContentLoaded", () => {

  initLoader();
  initClock();
  initCounters();
  setActiveNavigation();

});

/* ===========================
   Loader
=========================== */

function initLoader() {

  setTimeout(() => {

    document.body.classList.add("loaded");

  }, 1200);

}

/* ===========================
   Live Date & Time
=========================== */

function initClock() {

  const dateEl = document.getElementById("currentDate");
  const timeEl = document.getElementById("currentTime");

  function updateClock() {

    const now = new Date();

    const dateOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric"
    };

    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit"
    };

    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString("en-IN", dateOptions);
    }

    if (timeEl) {
      timeEl.textContent = now.toLocaleTimeString("en-IN", timeOptions);
    }

  }

  updateClock();

  setInterval(updateClock, 1000);

}

/* ===========================
   Counter Animation
=========================== */

function animateCounter(id, target, suffix = "") {

  const el = document.getElementById(id);

  if (!el) return;

  let current = 0;

  const step = Math.max(1, Math.ceil(target / 40));

  const timer = setInterval(() => {

    current += step;

    if (current >= target) {

      current = target;

      clearInterval(timer);

    }

    el.textContent = current + suffix;

  }, 20);

}

function initCounters() {

  animateCounter("totalStudents", 0);
  animateCounter("presentToday", 0);
  animateCounter("absentToday", 0);
  animateCounter("attendancePercent", 0, "%");

}

/* ===========================
   Bottom Navigation
=========================== */

function setActiveNavigation() {

  const currentPage = location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-item").forEach(item => {

    const href = item.getAttribute("href");

    if (href === currentPage) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }

  });

}
/* ===================================
   EZEE VISION ERP v8.0
   Script Part 2
   Dashboard Data
===================================*/

/* ===========================
   Local Storage
=========================== */

const STORAGE_KEYS = {

students:"erp_students",

attendance:"erp_attendance",

activity:"erp_activity"

};

/* ===========================
   Load Dashboard
=========================== */

function loadDashboard(){

const students=getStudents();

const attendance=getAttendance();

updateDashboard(students,attendance);

renderRecentActivity();

}

window.addEventListener("load",loadDashboard);

/* ===========================
   Students
=========================== */

function getStudents(){

return JSON.parse(

localStorage.getItem(

STORAGE_KEYS.students

)

)||[];

}

/* ===========================
   Attendance
=========================== */

function getAttendance(){

return JSON.parse(

localStorage.getItem(

STORAGE_KEYS.attendance

)

)||[];

}

/* ===========================
   Dashboard Update
=========================== */

function updateDashboard(students,attendance){

const total=students.length;

let present=0;

attendance.forEach(item=>{

if(item.status==="Present"){

present++;

}

});

const absent=Math.max(

0,

total-present

);

const percent=

total===0

?0

:Math.round(

(present/total)*100

);

animateCounter(

"totalStudents",

total

);

animateCounter(

"presentToday",

present

);

animateCounter(

"absentToday",

absent

);

animateCounter(

"attendancePercent",

percent,

"%"

);

}

/* ===========================
   Search Student
=========================== */

const searchInput=

document.getElementById(

"searchInput"

);

if(searchInput){

searchInput.addEventListener(

"input",

function(){

const keyword=

this.value

.toLowerCase()

.trim();

filterStudents(

keyword

);

}

);

}

function filterStudents(keyword){

const cards=

document.querySelectorAll(

".student-card"

);

cards.forEach(card=>{

const name=

card.dataset.name||

"";

if(

name

.toLowerCase()

.includes(keyword)

){

card.style.display="flex";

}else{

card.style.display="none";

}

});

}

/* ===========================
   Recent Activity
=========================== */

function renderRecentActivity(){

const container=

document.getElementById(

"activityList"

);

if(!container) return;

const activity=

JSON.parse(

localStorage.getItem(

STORAGE_KEYS.activity

)

)||[];

if(activity.length===0){

return;

}

container.innerHTML="";

activity

.slice(0,5)

.forEach(item=>{

container.innerHTML+=`

<div class="activity-card">

<div class="activity-icon">

<span class="material-symbols-rounded">

history

</span>

</div>

<div>

<h4>${item.title}</h4>

<p>${item.time}</p>

</div>

</div>

`;

});

}
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "none";
    }
});
