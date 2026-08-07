/* ==========================================================
   EZEE VISION CHAMPUA
   Students Module
   Version : 1.0.0
========================================================== */

"use strict";

const Students = {

    data: [],

    filteredData: [],

    init(){

        this.load();

        this.bindEvents();

        this.render();

    },

/* ==========================================================
   LOAD
========================================================== */

    load(){

        const saved = localStorage.getItem("ezee_students");

        if(saved){

            this.data = JSON.parse(saved);

        }

        this.filteredData = [...this.data];

    },

/* ==========================================================
   SAVE
========================================================== */

    save(){

        localStorage.setItem(

            "ezee_students",

            JSON.stringify(this.data)

        );

    },

/* ==========================================================
   EVENTS
========================================================== */

    bindEvents(){

        const search=document.getElementById("studentSearch");

        if(search){

            search.addEventListener(

                "input",

                ()=>this.search(search.value)

            );

        }

        const classFilter=document.getElementById("classFilter");

        if(classFilter){

            classFilter.addEventListener(

                "change",

                ()=>this.filter()

            );

        }

        const statusFilter=document.getElementById("statusFilter");

        if(statusFilter){

            statusFilter.addEventListener(

                "change",

                ()=>this.filter()

            );

        }

    },
  /* ==========================================================
   SEARCH
========================================================== */

    search(keyword){

        keyword=keyword.toLowerCase();

        this.filteredData=this.data.filter(student=>{

            return student.name

            .toLowerCase()

            .includes(keyword);

        });

        this.render();

    },

/* ==========================================================
   FILTER
========================================================== */

    filter(){

        const classValue=

        document.getElementById(

        "classFilter"

        ).value;

        const statusValue=

        document.getElementById(

        "statusFilter"

        ).value;

        this.filteredData=this.data.filter(student=>{

            const classMatch=

            !classValue ||

            student.class===classValue;

            const statusMatch=

            !statusValue ||

            student.status===statusValue;

            return classMatch && statusMatch;

        });

        this.render();

    },
  /* ==========================================================
   RENDER
========================================================== */

    render(){

        const container=

        document.getElementById(

        "studentCards"

        );

        if(!container) return;

        if(this.filteredData.length===0){

            container.innerHTML=`

            <div class="glass student-card">

            <div class="student-info">

            <h3>No Students Found</h3>

            <p>

            Click + button to add students.

            </p>

            </div>

            </div>

            `;

            return;

        }

        container.innerHTML=this.filteredData.map(student=>`

<div class="glass student-card">

<div class="student-avatar">

<i class="fa-solid fa-user"></i>

</div>

<div class="student-info">

<h3>${student.name}</h3>

<p>${student.class}</p>

<p>${student.status}</p>

</div>

<div class="student-actions">

<button

class="action-btn edit-btn"

data-id="${student.id}">

<i class="fa-solid fa-pen"></i>

</button>

<button

class="action-btn delete-btn"

data-id="${student.id}">

<i class="fa-solid fa-trash"></i>

</button>

</div>

</div>

`).join("");

    }

};

document.addEventListener(

"DOMContentLoaded",

()=>{

Students.init();

}

);
