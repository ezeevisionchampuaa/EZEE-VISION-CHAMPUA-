/* ==========================================================
   EZEE VISION CHAMPUA
   Coaching Management System
   Global App Engine v1.0
==========================================================*/

"use strict";

/* ==========================================================
   APP
==========================================================*/

const App = {

    version: "1.0.0",

    coachingName: "EZEE VISION CHAMPUA",

    developer: "Shahid Sir",

    startedAt: new Date(),

    elements: {},

    init(){

        this.cacheDOM();

        this.bindEvents();

        this.updateGreeting();

        this.updateClock();

        this.updateYear();

        this.loadDashboard();

        setInterval(()=>{

            this.updateClock();

        },1000);

        console.log(

            `${this.coachingName} Loaded`

        );

    },

/* ==========================================================
   CACHE DOM
==========================================================*/

    cacheDOM(){

        this.elements = {

            greeting:

            document.getElementById("greeting"),

            liveTime:

            document.getElementById("liveTime"),

            liveDate:

            document.getElementById("liveDate"),

            studentCount:

            document.getElementById("studentCount"),

            attendanceCount:

            document.getElementById("attendanceCount"),

            feesToday:

            document.getElementById("feesToday"),

            pendingFees:

            document.getElementById("pendingFees"),

            attendancePercent:

            document.getElementById("attendancePercent"),

            feesPercent:

            document.getElementById("feesPercent"),

            attendanceBar:

            document.querySelector(".attendance-progress"),

            feesBar:

            document.querySelector(".fees-progress"),

            currentYear:

            document.getElementById("currentYear"),

            notificationBtn:

            document.getElementById("notificationBtn"),

            notificationPanel:

            document.getElementById("notificationPanel"),

            fab:

            document.getElementById("fabAddStudent")

        };

    },

/* ==========================================================
   EVENTS
==========================================================*/

    bindEvents(){

        const e = this.elements;

        if(e.notificationBtn){

            e.notificationBtn.addEventListener(

                "click",

                ()=>{

                    this.toggleNotifications();

                }

            );

        }

        if(e.fab){

            e.fab.addEventListener(

                "click",

                ()=>{

                    this.openStudentPage();

                }

            );

        }

        document.addEventListener(

            "click",

            (event)=>{

                this.closeNotificationOutside(event);

            }

        );

    },
   /* ==========================================================
   CLOCK & DATE
==========================================================*/

    updateClock(){

        const now = new Date();

        const time = now.toLocaleTimeString("en-IN",{
            hour:"2-digit",
            minute:"2-digit",
            second:"2-digit",
            hour12:true
        });

        const date = now.toLocaleDateString("en-IN",{
            weekday:"long",
            day:"numeric",
            month:"long",
            year:"numeric"
        });

        if(this.elements.liveTime){

            this.elements.liveTime.textContent = time;

        }

        if(this.elements.liveDate){

            this.elements.liveDate.textContent = date;

        }

    },

/* ==========================================================
   GREETING
==========================================================*/

    updateGreeting(){

        if(!this.elements.greeting) return;

        const hour = new Date().getHours();

        let text = "Good Evening,";

        if(hour>=5 && hour<12){

            text = "Good Morning,";

        }else if(hour>=12 && hour<17){

            text = "Good Afternoon,";

        }else if(hour>=17 && hour<21){

            text = "Good Evening,";

        }else{

            text = "Good Night,";

        }

        this.elements.greeting.textContent = text;

    },

/* ==========================================================
   YEAR
==========================================================*/

    updateYear(){

        if(this.elements.currentYear){

            this.elements.currentYear.textContent =
            new Date().getFullYear();

        }

    },

/* ==========================================================
   DASHBOARD PLACEHOLDER
==========================================================*/

    loadDashboard(){

        const e = this.elements;

        if(e.studentCount) e.studentCount.textContent = "0";

        if(e.attendanceCount) e.attendanceCount.textContent = "0";

        if(e.feesToday) e.feesToday.textContent = "₹0";

        if(e.pendingFees) e.pendingFees.textContent = "₹0";

        if(e.attendancePercent)
            e.attendancePercent.textContent = "0%";

        if(e.feesPercent)
            e.feesPercent.textContent = "0%";

        if(e.attendanceBar)
            e.attendanceBar.style.width = "0%";

        if(e.feesBar)
            e.feesBar.style.width = "0%";

    },

/* ==========================================================
   NOTIFICATION PANEL
==========================================================*/

    toggleNotifications(){

        const panel = this.elements.notificationPanel;

        if(!panel) return;

        panel.toggleAttribute("hidden");

    },

    closeNotificationOutside(event){

        const btn = this.elements.notificationBtn;

        const panel = this.elements.notificationPanel;

        if(!btn || !panel || panel.hasAttribute("hidden")){

            return;

        }

        if(
            !panel.contains(event.target) &&
            !btn.contains(event.target)
        ){

            panel.setAttribute("hidden","");

        }

    },

/* ==========================================================
   FAB
==========================================================*/

    openStudentPage(){

        window.location.href = "students.html";

    },
   
/* ==========================================================
   SAFE QUERY
==========================================================*/

    get(id){

        return document.getElementById(id);

    },

    query(selector){

        return document.querySelector(selector);

    },

    queryAll(selector){

        return document.querySelectorAll(selector);

    },

/* ==========================================================
   LOG
==========================================================*/

    log(message){

        console.log(

            `[EZEE] ${message}`

        );

    }

};

/* ==========================================================
   APP START
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        App.init();

    }

);
