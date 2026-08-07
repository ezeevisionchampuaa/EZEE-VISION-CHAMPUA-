/* ==========================================================
   EZEE VISION CHAMPUA
   Students Module
   Version : 2.0.0
========================================================== */

"use strict";

const Students = {

    data: [],

    filteredData: [],

/* ==========================================================
   INIT
========================================================== */

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

        }else{

            this.data = [];

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

        const search = document.getElementById("studentSearch");

        if(search){

            search.addEventListener("input",()=>{

                this.search(search.value);

            });

        }

        const classFilter = document.getElementById("classFilter");

        if(classFilter){

            classFilter.addEventListener("change",()=>{

                this.filter();

            });

        }

        const statusFilter = document.getElementById("statusFilter");

        if(statusFilter){

            statusFilter.addEventListener("change",()=>{

                this.filter();

            });

        }

        const addBtn = document.getElementById("addStudentBtn");

        if(addBtn){

            addBtn.addEventListener("click",()=>{

                this.openModal();

            });

        }

        const closeBtn = document.getElementById("closeModal");

        if(closeBtn){

            closeBtn.addEventListener("click",()=>{

                this.closeModal();

            });

        }

        const form = document.getElementById("studentForm");

        if(form){

            form.addEventListener("submit",(e)=>{

                e.preventDefault();

                this.saveStudent();

            });

        }

        document.addEventListener("click",(e)=>{

            const edit = e.target.closest(".edit-btn");

            const del = e.target.closest(".delete-btn");

            if(edit){

                const id = edit.dataset.id;

                const student = this.data.find(

                    s=>s.id===id

                );

                if(student){

                    this.openModal(student);

                }

            }

            if(del){

                this.deleteStudent(

                    del.dataset.id

                );

            }

        });

    },
   /* ==========================================================
   SEARCH
========================================================== */

    search(keyword){

        keyword = keyword.trim().toLowerCase();

        this.filteredData = this.data.filter(student=>{

            return student.name
                .toLowerCase()
                .includes(keyword);

        });

        this.render();

    },
/* ==========================================================
   APPLY FILTERS
========================================================== */

applyFilters(){

    const keyword=document
    .getElementById("studentSearch")
    .value
    .trim()
    .toLowerCase();

    const classValue=document
    .getElementById("classFilter")
    .value;

    const statusValue=document
    .getElementById("statusFilter")
    .value;

    this.filteredData=this.data.filter(student=>{

        const searchMatch=

        student.name
        .toLowerCase()
        .includes(keyword);

        const classMatch=

        !classValue ||

        student.class===classValue;

        const statusMatch=

        !statusValue ||

        student.status===statusValue;

        return searchMatch &&
               classMatch &&
               statusMatch;

    });

    this.render();

}
/* ==========================================================
   RENDER
========================================================== */

    render(){

        const container =
            document.getElementById("studentCards");

        if(!container) return;

        if(this.filteredData.length===0){

            container.innerHTML = `

            <div class="glass student-card">

                <div class="student-info">

                    <h3>No Students Found</h3>

                    <p>Click + button to add students.</p>

                </div>

            </div>

            `;

            return;

        }

        container.innerHTML = this.filteredData.map(student=>`

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

    },
   /* ==========================================================
   OPEN MODAL
========================================================== */

    openModal(student = null){

        const modal = document.getElementById("studentModal");

        if(!modal) return;

        modal.classList.add("show");

        const form = document.getElementById("studentForm");

        if(student){

            document.getElementById("modalTitle").textContent = "Edit Student";

            document.getElementById("studentId").value = student.id;

            document.getElementById("studentName").value = student.name;

            document.getElementById("studentClass").value = student.class;

            document.getElementById("studentStatus").value = student.status;

        }else{

            if(form) form.reset();

            document.getElementById("modalTitle").textContent = "Add Student";

            document.getElementById("studentId").value = "";

        }

    },

/* ==========================================================
   CLOSE MODAL
========================================================== */

    closeModal(){

        const modal = document.getElementById("studentModal");

        if(modal){

            modal.classList.remove("show");

        }

    },

/* ==========================================================
   SAVE STUDENT
========================================================== */

    saveStudent(){

        const id = document.getElementById("studentId").value;

        const student = {

            id : id || Date.now().toString(),

            name : document.getElementById("studentName").value.trim(),

            class : document.getElementById("studentClass").value,

            status : document.getElementById("studentStatus").value

        };

        if(student.name === ""){

            UI.toast("Enter student name","error");

            return;

        }

        if(student.class === ""){

            UI.toast("Select class","error");

            return;

        }

        if(id){

            const index = this.data.findIndex(

                s => s.id === id

            );

            if(index !== -1){

                this.data[index] = student;

            }

        }else{

            this.data.push(student);

        }

        this.filteredData = [...this.data];

        this.save();

        this.render();

        this.closeModal();

        if(window.UI){

            UI.toast(

                "Student Saved",

                "success"

            );

        }

    },
   /* ==========================================================
   DELETE STUDENT
========================================================== */

    deleteStudent(id){

        const ok = confirm(
            "Delete this student?"
        );

        if(!ok) return;

        this.data = this.data.filter(
            student => student.id !== id
        );

        this.filteredData = [...this.data];

        this.save();

        this.render();

        if(window.UI){

            UI.toast(
                "Student Deleted",
                "success"
            );

        }

    }

};

/* ==========================================================
   START APP
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    ()=>{
        Students.init();
    }
);
