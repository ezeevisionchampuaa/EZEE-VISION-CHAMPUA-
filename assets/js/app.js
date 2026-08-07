/* ==========================================================
   EZEE VISION CHAMPUA
   Core Application
   Version : 1.0.0
========================================================== */

"use strict";

/* ==========================================================
   APP
========================================================== */

const App = {

    init(){

        this.liveClock();

        this.updateGreeting();

        console.log("EZEE VISION CHAMPUA Loaded");

    },

/* ==========================================================
   LIVE TIME
========================================================== */

    liveClock(){

        const time=document.getElementById("liveTime");

        const date=document.getElementById("liveDate");

        if(!time || !date) return;

        const update=()=>{

            const now=new Date();

            time.textContent=now.toLocaleTimeString("en-IN",{

                hour:"2-digit",

                minute:"2-digit",

                second:"2-digit"

            });

            date.textContent=now.toLocaleDateString("en-IN",{

                weekday:"long",

                day:"numeric",

                month:"long",

                year:"numeric"

            });

        };

        update();

        setInterval(update,1000);

    },

/* ==========================================================
   GREETING
========================================================== */

    updateGreeting(){

        const greet=document.getElementById("greetingText");

        if(!greet) return;

        const hour=new Date().getHours();

        let text="Morning";

        if(hour>=12 && hour<17){

            text="Afternoon";

        }

        else if(hour>=17){

            text="Evening";

        }

        greet.textContent=text;

    }

};

/* ==========================================================
   START APP
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        App.init();

    }

);
