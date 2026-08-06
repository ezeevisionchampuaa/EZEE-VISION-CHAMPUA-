/* ==========================================================
   EZEE VISION CHAMPUA
   Student Management System
   Version: 1.0.0
========================================================== */

"use strict";

/* ==========================================================
   STORAGE KEYS
========================================================== */

const STORAGE_KEYS = {
    STUDENTS: "ezee_students_v1"
};

/* ==========================================================
   STUDENT STORE
========================================================== */

const StudentStore = {

    students: [],

    load() {

        try {

            const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);

            this.students = data
                ? JSON.parse(data)
                : [];

        } catch (error) {

            console.error("Failed to load students:", error);

            this.students = [];

        }

    },

    save() {

        localStorage.setItem(
            STORAGE_KEYS.STUDENTS,
            JSON.stringify(this.students)
        );

    },

    getAll() {

        return [...this.students];

    }

};

/* ==========================================================
   ID GENERATOR
========================================================== */

const StudentID = {

    nextId() {

        return "STD-" + Date.now();

    },

    admissionNo() {

        const year = new Date().getFullYear();

        const count =
            StudentStore.students.length + 1;

        return `EZV-${year}-${String(count).padStart(4,"0")}`;

    }

};

/* ==========================================================
   INIT
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    StudentStore.load();

    console.log(
        "Student Module Loaded",
        StudentStore.students.length
    );

});
/* ==========================================================
   STUDENT FORM CONTROLLER
========================================================== */

const StudentForm = {

    form: null,
    modal: null,

    init() {

        this.form = document.getElementById("studentForm");
        this.modal = document.getElementById("studentModal");

        this.bindEvents();

    },

    bindEvents() {

        const addBtn = document.getElementById("addStudentFab");
        const firstBtn = document.getElementById("firstStudentBtn");
        const closeBtn = document.getElementById("closeModal");
        const cancelBtn = document.getElementById("cancelStudent");

        if (addBtn)
            addBtn.addEventListener("click", () => this.open());

        if (firstBtn)
            firstBtn.addEventListener("click", () => this.open());

        if (closeBtn)
            closeBtn.addEventListener("click", () => this.close());

        if (cancelBtn)
            cancelBtn.addEventListener("click", () => this.close());

        if (this.form)
            this.form.addEventListener("submit", (e) => {

                e.preventDefault();

                this.saveStudent();

            });

    },

    open() {

        this.clear();

        document.getElementById("studentId").value =
            StudentID.nextId();

        document.getElementById("admissionNo").value =
            StudentID.admissionNo();

        const today = new Date()
            .toISOString()
            .split("T")[0];

        const admission =
            document.getElementById("admissionDate");

        if (admission)
            admission.value = today;

        this.modal.removeAttribute("hidden");

    },

    close() {

        this.modal.setAttribute("hidden", "");

    },

    clear() {

        this.form.reset();

    },

    validate(data) {

        if (!data.studentName.trim()) {

            alert("Enter Student Name");

            return false;

        }

        if (!data.rollNo.trim()) {

            alert("Enter Roll Number");

            return false;

        }

        if (!data.studentClass) {

            alert("Select Class");

            return false;

        }

        if (!data.monthlyFees) {

            alert("Enter Monthly Fees");

            return false;

        }

        return true;

    },

    saveStudent() {

        const student = {

            studentId:
                document.getElementById("studentId").value,

            admissionNo:
                document.getElementById("admissionNo").value,

            rollNo:
                document.getElementById("rollNo").value.trim(),

            studentName:
                document.getElementById("studentName").value.trim(),

            fatherName:
                document.getElementById("fatherName").value.trim(),

            motherName:
                document.getElementById("motherName").value.trim(),

            mobile:
                document.getElementById("mobile").value.trim(),

            alternateMobile:
                document.getElementById("alternateMobile").value.trim(),

            dob:
                document.getElementById("dob").value,

            address:
                document.getElementById("address").value.trim(),

            studentClass:
                document.getElementById("studentClass").value,

            monthlyFees:
                Number(document.getElementById("monthlyFees").value),

            admissionDate:
                document.getElementById("admissionDate").value,

            status:
                document.getElementById("studentStatus").value,

            createdAt:
                new Date().toISOString()

        };

        if (!this.validate(student)) {

            return;

        }

        StudentStore.students.push(student);

        StudentStore.save();
      StudentRenderer.render();
        this.close();

        console.log("Student Added:", student);

        // Phase 3 me render aur summary update hoga.

    }

};

/* ==========================================================
   START FORM
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    StudentForm.init();

});

/* ==========================================================
   STUDENT RENDERER
========================================================== */

const StudentRenderer = {

    list: null,

    cards: null,

    empty: null,

    init() {

        this.list = document.getElementById("studentList");

        this.cards = document.getElementById("studentCards");

        this.empty = document.getElementById("emptyState");

    },

    render() {

        if (!this.cards) return;

        const students = StudentStore.getAll();

        this.cards.innerHTML = "";

        if (students.length === 0) {

            if (this.empty)
                this.empty.removeAttribute("hidden");

            return;

        }

        if (this.empty)
            this.empty.setAttribute("hidden", "");

        students.forEach(student => {

            this.cards.insertAdjacentHTML(

                "beforeend",

                this.card(student)

            );

        });

    },

    card(student) {

        return `

<div class="glass student-card"
     data-id="${student.studentId}">

<div class="student-photo">

${student.photo
? `<img src="${student.photo}" alt="${student.studentName}">`
: `<i class="fa-solid fa-user-graduate"></i>`}

</div>

<div class="student-info">

<h3>${student.studentName}</h3>

<p>

<b>Admission :</b>

${student.admissionNo}

</p>

<p>

<b>Roll :</b>

${student.rollNo}

</p>

<p>

<b>Class :</b>

${student.studentClass}

</p>

<p>

<b>Fees :</b>

₹${student.monthlyFees}

</p>

<p>

<b>Status :</b>

${student.status}

</p>

</div>

<div class="student-actions">

<button
class="edit-btn"
data-id="${student.studentId}"
title="Edit">

<i class="fa-solid fa-pen"></i>

</button>

<button
class="delete-btn"
data-id="${student.studentId}"
title="Delete">

<i class="fa-solid fa-trash"></i>

</button>

</div>

</div>

`;

    }

};

/* ==========================================================
   START RENDERER
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        StudentRenderer.init();

        StudentRenderer.render();

    }

);
/* ==========================================================
   STUDENT ACTIONS
========================================================== */

const StudentActions = {

    init() {

        const container = document.getElementById("studentCards");

        if (!container) return;

        container.addEventListener("click", (event) => {

            const editButton = event.target.closest(".edit-btn");
            const deleteButton = event.target.closest(".delete-btn");

            if (editButton) {

                this.edit(editButton.dataset.id);

                return;

            }

            if (deleteButton) {

                this.remove(deleteButton.dataset.id);

            }

        });

    },

    edit(studentId) {

        console.log("Edit:", studentId);

        /*
           Phase 4 me complete Edit Form
           implement hoga.
        */

        alert("Edit feature will be added in Phase 4.");

    },

    remove(studentId) {

        const confirmed = confirm(
            "Delete this student?"
        );

        if (!confirmed) return;

        StudentStore.students =
            StudentStore.students.filter(
                student => student.studentId !== studentId
            );

        StudentStore.save();

        StudentRenderer.render();

        console.log("Deleted:", studentId);

    }

};

/* ==========================================================
   START ACTIONS
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        StudentActions.init();

    }
);

