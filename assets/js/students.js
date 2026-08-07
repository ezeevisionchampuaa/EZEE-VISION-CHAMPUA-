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
if(addBtn){

    addBtn.addEventListener(

        "click",

        ()=>this.addStudent()

    );

   const addBtn=document.getElementById("addStudentBtn");
   
}

           
document.addEventListener("click",(e)=>{
if(e.target.closest(".edit-btn")){

const id=e.target.closest(".edit-btn").dataset.id;

const student=this.data.find(s=>s.id===id);

this.openModal(student);

}
    if(e.target.closest(".delete-btn")){

        const id=e.target.closest(".delete-btn").dataset.id;

        this.deleteStudent(id);

    }
   
   document

.getElementById("addStudentBtn")

.addEventListener(

"click",

()=>this.openModal()

);

document

.getElementById("closeModal")

.addEventListener(

"click",

()=>this.closeModal()

);

document

.getElementById("studentForm")

.addEventListener(

"submit",

(e)=>{

e.preventDefault();

this.saveStudent();

}

);

});
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
openModal(student=null){

document
.getElementById("studentModal")
.classList.add("show");

if(student){

document
.getElementById("modalTitle")
.textContent="Edit Student";

document
.getElementById("studentId")
.value=student.id;

document
.getElementById("studentName")
.value=student.name;

document
.getElementById("studentClass")
.value=student.class;

document
.getElementById("studentStatus")
.value=student.status;

}else{

document
.getElementById("studentForm")
.reset();

document
.getElementById("studentId")
.value="";

document
.getElementById("modalTitle")
.textContent="Add Student";

}

   };

closeModal(){

document
.getElementById("studentModal")
.classList.remove("show");

},
saveStudent(){

const id=document.getElementById("studentId").value;

const student={

id:id || Date.now().toString(),

name:document.getElementById("studentName").value,

class:document.getElementById("studentClass").value,

status:document.getElementById("studentStatus").value

};
/* ==========================================================
   ADD STUDENT
========================================================== */

addStudent(){

    const name=prompt("Student Name");

    if(!name) return;

    const className=prompt("Class (Example: Class 9)");

    if(!className) return;

    const student={

        id:Date.now().toString(),

        name:name,

        class:className,

        status:"Active"

    };

    this.data.push(student);

    this.filteredData=[...this.data];

    this.save();

    this.render();

    if(window.UI){

        UI.toast("Student Added","success");

    }

},
/* ==========================================================
   DELETE
========================================================== */

deleteStudent(id){

    const ok=confirm(

        "Delete this student?"

    );

    if(!ok) return;

    this.data=this.data.filter(

        s=>s.id!==id

    );

    this.filteredData=[...this.data];

    this.save();

    this.render();

    if(window.UI){

        UI.toast(

            "Student Deleted",

            "success"

        );

    }

},


if(id){

const index=this.data.findIndex(

s=>s.id===id

);

this.data[index]=student;

}else{

this.data.push(student);

}

this.filteredData=[...this.data];

this.save();

this.render();

this.closeModal();

UI.toast("Student Saved","success");

}
document.addEventListener(

"DOMContentLoaded",

()=>{

Students.init();

}

);
