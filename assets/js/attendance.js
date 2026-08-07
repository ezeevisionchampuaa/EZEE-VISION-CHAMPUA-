/* ==========================================================
   EZEE VISION CHAMPUA
   Attendance Module
   Version : 1.0.0
========================================================== */

"use strict";

const Attendance = {

    students: [],

    records: {},

    selectedDate: "",

    selectedClass: "",

/* ==========================================================
   INIT
========================================================== */

    init(){

        this.loadStudents();

        this.loadRecords();

        this.setToday();

        this.bindEvents();

        this.render();

    },

/* ==========================================================
   LOAD STUDENTS
========================================================== */

    loadStudents(){

        const saved = localStorage.getItem(
            "ezee_students"
        );

        if(saved){

            try{

                this.students = JSON.parse(saved);

            }catch(error){

                this.students = [];

            }

        }else{

            this.students = [];

        }

    },

/* ==========================================================
   LOAD ATTENDANCE
========================================================== */

    loadRecords(){

        const saved = localStorage.getItem(
            "ezee_attendance"
        );

        if(saved){

            try{

                this.records = JSON.parse(saved);

            }catch(error){

                this.records = {};

            }

        }else{

            this.records = {};

        }

    },

/* ==========================================================
   SAVE RECORDS
========================================================== */

    saveRecords(){

        localStorage.setItem(

            "ezee_attendance",

            JSON.stringify(this.records)

        );

    },

/* ==========================================================
   TODAY
========================================================== */

    setToday(){

        const dateInput =
            document.getElementById(
                "attendanceDate"
            );

        if(!dateInput) return;

        const today = new Date();

        const year =
            today.getFullYear();

        const month =
            String(
                today.getMonth()+1
            ).padStart(2,"0");

        const day =
            String(
                today.getDate()
            ).padStart(2,"0");

        this.selectedDate =
            `${year}-${month}-${day}`;

        dateInput.value =
            this.selectedDate;

    },

/* ==========================================================
   EVENTS
========================================================== */

    bindEvents(){

        const dateInput =
            document.getElementById(
                "attendanceDate"
            );

        if(dateInput){

            dateInput.addEventListener(
                "change",
                ()=>{
                    this.selectedDate =
                        dateInput.value;

                    this.render();
                }
            );

        }

        const classSelect =
            document.getElementById(
                "attendanceClass"
            );

        if(classSelect){

            classSelect.addEventListener(
                "change",
                ()=>{
                    this.selectedClass =
                        classSelect.value;

                    this.render();
                }
            );

        }

        const saveButton =
            document.getElementById(
                "saveAttendance"
            );

        if(saveButton){

            saveButton.addEventListener(
                "click",
                ()=>{
                    this.saveAttendance();
                }
            );

           const monthInput =
    document.getElementById(
        "attendanceMonth"
    );

if(monthInput){

    const today = new Date();

    monthInput.value =
        `${today.getFullYear()}-${String(
            today.getMonth()+1
        ).padStart(2,"0")}`;

    monthInput.addEventListener(
        "change",
        ()=>{
            this.renderMonthly();
        }
    );

}
        }

        document.addEventListener(
            "click",
            (event)=>{

                const button =
                    event.target.closest(
                        ".attendance-btn"
                    );

                if(!button) return;

                const id =
                    button.dataset.id;

                const status =
                    button.dataset.status;

                this.mark(
                    id,
                    status
                );
            document.addEventListener(
    "click",
    (event)=>{

        const button =
            event.target.closest(
                ".attendance-record-edit"
            );

        if(!button) return;

        const date =
            button.dataset.date;

        this.loadRecord(date);

    }
);

            }
        );

    },

/* ==========================================================
   FILTER STUDENTS
========================================================== */

    getStudents(){

        return this.students.filter(
            student=>{

                if(!this.selectedClass){

                    return true;

                }

                return student.class ===
                    this.selectedClass;

            }
        );

    },
/* ==========================================================
   GET ATTENDANCE STATUS
========================================================== */

getStatus(studentId){

    if(!this.records[this.selectedDate]){

        return "";

    }

    return this.records[this.selectedDate][studentId] || "";

},
/* ==========================================================
   GET CURRENT RECORD
========================================================== */

    getCurrentRecord(){

        if(!this.records[this.selectedDate]){

            this.records[this.selectedDate] = {};

        }

        return this.records[this.selectedDate];

    },

/* ==========================================================
   MARK ATTENDANCE
========================================================== */

    mark(id,status){

        if(!this.selectedDate) return;

        const record =
            this.getCurrentRecord();

        record[id] = status;

        this.render();

    },

/* ==========================================================
   RENDER
========================================================== */

    render(){

        const list =
            document.getElementById(
                "attendanceList"
            );

        if(!list) return;

        const students =
            this.getStudents();

        const record =
            this.getCurrentRecord();

        if(students.length === 0){

            list.innerHTML = `

                <div class="glass attendance-empty">

                    <i class="fa-solid fa-users"></i>

                    <h3>
                        No Students Found
                    </h3>

                    <p>
                        Add students first from the
                        Students module.
                    </p>

                </div>

            `;

            this.updateSummary(students);

this.renderPercentage();

            return;

        }

        list.innerHTML =
            students.map(student=>{

                const status =
                    record[student.id] || "";

                return `

                <div class="glass attendance-card">

                    <div class="attendance-avatar">

                        <i class="fa-solid fa-user"></i>

                    </div>

                    <div class="attendance-student">

                        <h3>
                            ${this.escape(
                                student.name
                            )}
                        </h3>

                        <p>
                            ${this.escape(
                                student.class
                            )}
                        </p>

                    </div>

                    <div class="attendance-actions">

                        <button
                            type="button"
                            class="attendance-btn present
                            ${status==="present" ? "active" : ""}"
                            data-id="${student.id}"
                            data-status="present"
                            aria-label="Present">

                            <i class="fa-solid fa-check"></i>

                        </button>

                        <button
                            type="button"
                            class="attendance-btn absent
                            ${status==="absent" ? "active" : ""}"
                            data-id="${student.id}"
                            data-status="absent"
                            aria-label="Absent">

                            <i class="fa-solid fa-xmark"></i>

                        </button>

                    </div>

                </div>

                `;

            }).join("");

        this.updateSummary(students);

this.renderPercentage();

this.renderMonthly();
       
this.renderRecords();
    },
/* ==========================================================
   MONTHLY ATTENDANCE
========================================================== */

renderMonthly(){

    const container =
        document.getElementById(
            "monthlyAttendanceList"
        );

    if(!container) return;

    const students =
        this.getStudents();

    if(students.length === 0){

        container.innerHTML = `

            <div class="glass monthly-empty">

                No students available.

            </div>

        `;

        return;

    }

    const monthInput =
        document.getElementById(
            "attendanceMonth"
        );

    const month =
        monthInput
            ? monthInput.value
            : "";

    if(!month){

        container.innerHTML = `

            <div class="glass monthly-empty">

                Select a month to view attendance.

            </div>

        `;

        return;

    }

    container.innerHTML =
        students.map(student=>{

            let present = 0;

            let absent = 0;

            Object.keys(this.records)
                .forEach(date=>{

                    if(!date.startsWith(month)){

                        return;

                    }

                    const record =
                        this.records[date];

                    if(
                        !record ||
                        !record[student.id]
                    ){

                        return;

                    }

                    if(
                        record[student.id]
                        === "present"
                    ){

                        present++;

                    }

                    if(
                        record[student.id]
                        === "absent"
                    ){

                        absent++;

                    }

                });

            const total =
                present + absent;

            const percentage =
                total === 0
                ? 0
                : Math.round(
                    (present / total) * 100
                );

            return `

                <div class="glass monthly-card">

                    <div class="monthly-card-header">

                        <div class="monthly-student-info">

                            <h3>
                                ${this.escape(
                                    student.name
                                )}
                            </h3>

                            <p>
                                ${this.escape(
                                    student.class
                                )}
                            </p>

                        </div>

                        <div class="monthly-percentage">

                            ${percentage}%

                        </div>

                    </div>

                    <div class="monthly-stats">

                        <div class="monthly-stat">

                            <span>
                                Marked
                            </span>

                            <strong>
                                ${total}
                            </strong>

                        </div>

                        <div class="monthly-stat">

                            <span>
                                Present
                            </span>

                            <strong>
                                ${present}
                            </strong>

                        </div>

                        <div class="monthly-stat">

                            <span>
                                Absent
                            </span>

                            <strong>
                                ${absent}
                            </strong>

                        </div>

                    </div>

                    <div class="monthly-progress">

                        <div
                            class="monthly-progress-fill"
                            style="width:${percentage}%"
                        ></div>

                    </div>

                </div>

            `;

        }).join("");

},
   /* ==========================================================
   LOAD RECORD
========================================================== */

loadRecord(date){

    if(!this.records[date]){

        return;

    }

    this.selectedDate = date;

    const dateInput =
        document.getElementById(
            "attendanceDate"
        );

    if(dateInput){

        dateInput.value = date;

    }

    this.render();

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

    if(window.UI){

        UI.toast(
            "Attendance record loaded",
            "success"
        );

    }

},
/* ==========================================================
   SUMMARY
========================================================== */

    updateSummary(students){

        const record =
            this.getCurrentRecord();

        let present = 0;

        let absent = 0;

        students.forEach(student=>{

            if(record[student.id] === "present"){

                present++;

            }

            if(record[student.id] === "absent"){

                absent++;

            }

        });

        const total =
            document.getElementById(
                "attendanceTotal"
            );

        const presentEl =
            document.getElementById(
                "attendancePresent"
            );

        const absentEl =
            document.getElementById(
                "attendanceAbsent"
            );

        if(total){

            total.textContent =
                students.length;

        }

        if(presentEl){

            presentEl.textContent =
                present;

        }

        if(absentEl){

            absentEl.textContent =
                absent;

        }

    },
/* ==========================================================
   ATTENDANCE PERCENTAGE
========================================================== */

renderPercentage(){

    const container =
        document.getElementById(
            "attendancePercentageList"
        );

    if(!container) return;

    const students =
        this.getStudents();

    if(students.length === 0){

        container.innerHTML = `

            <div class="glass percentage-empty">

                No students available.

            </div>

        `;

        return;

    }

    const dates =
        Object.keys(this.records);

    if(dates.length === 0){

        container.innerHTML = `

            <div class="glass percentage-empty">

                No attendance records available yet.

            </div>

        `;

        return;

    }

    container.innerHTML =
        students.map(student=>{

            let present = 0;

            let total = 0;

            dates.forEach(date=>{

                const record =
                    this.records[date];

                if(
                    record &&
                    record[student.id]
                ){

                    total++;

                    if(
                        record[student.id]
                        === "present"
                    ){

                        present++;

                    }

                }

            });

            const percentage =
                total === 0
                ? 0
                : Math.round(
                    (present / total) * 100
                );

            return `

                <div class="glass percentage-card">

                    <div class="attendance-avatar">

                        <i class="fa-solid fa-user"></i>

                    </div>

                    <div class="percentage-info">

                        <h3>
                            ${this.escape(
                                student.name
                            )}
                        </h3>

                        <p>
                            ${this.escape(
                                student.class
                            )}

                            •
                            ${present}/${total}
                            present
                        </p>

                        <div class="percentage-bar">

                            <div
                                class="percentage-fill"
                                style="width:${percentage}%"
                            ></div>

                        </div>

                    </div>

                    <div class="percentage-value">

                        ${percentage}%

                    </div>

                </div>

            `;

        }).join("");

},
   /* ==========================================================
   SAVED RECORDS
========================================================== */

renderRecords(){

    const container =
        document.getElementById(
            "attendanceRecordsList"
        );

    if(!container) return;

    const dates =
        Object.keys(this.records)
        .sort()
        .reverse();

    if(dates.length === 0){

        container.innerHTML = `

            <div class="glass attendance-record-empty">

                No saved attendance records yet.

            </div>

        `;

        return;

    }

    container.innerHTML =
        dates.map(date=>{

            const record =
                this.records[date] || {};

            let present = 0;

            let absent = 0;

            Object.values(record)
                .forEach(status=>{

                    if(status === "present"){

                        present++;

                    }

                    if(status === "absent"){

                        absent++;

                    }

                });

            const total =
                present + absent;

            const formattedDate =
                this.formatDate(date);

            return `

                <div class="glass attendance-record-card">

                    <div class="attendance-record-header">

                        <div class="attendance-record-date">

                            <div class="attendance-record-icon">

                                <i class="fa-solid fa-calendar-check"></i>

                            </div>

                            <div>

                                <h3>
                                    ${formattedDate}
                                </h3>

                                <p>
                                    ${total} students marked
                                </p>

                            </div>

                        </div>

                    </div>

                    <div class="attendance-record-stats">

                        <div class="attendance-record-stat">

                            <span>
                                Total
                            </span>

                            <strong>
                                ${total}
                            </strong>

                        </div>

                        <div class="attendance-record-stat">

                            <span>
                                Present
                            </span>

                            <strong>
                                ${present}
                            </strong>

                        </div>

                        <div class="attendance-record-stat">

                            <span>
                                Absent
                            </span>

                            <strong>
                                ${absent}
                            </strong>

                        </div>

                    </div>

                    <div class="attendance-record-actions">

                        <button
                            type="button"
                            class="attendance-record-edit"
                            data-date="${date}"
                        >

                            <i class="fa-solid fa-pen"></i>

                            Edit Record

                        </button>

                    </div>

                </div>

            `;

        }).join("");

},
/* ==========================================================
   ATTENDANCE ANALYTICS
========================================================== */

renderAnalytics(){

    const students =
        this.getStudents();

    const studentCount =
        document.getElementById(
            "analyticsStudents"
        );

    const presentEl =
        document.getElementById(
            "analyticsPresent"
        );

    const absentEl =
        document.getElementById(
            "analyticsAbsent"
        );

    const averageEl =
        document.getElementById(
            "analyticsAverage"
        );

    const classContainer =
        document.getElementById(
            "classAnalyticsList"
        );

    if(!studentCount &&
       !presentEl &&
       !absentEl &&
       !averageEl){

        return;

    }

    const dates =
        Object.keys(this.records);

    let totalPresent = 0;

    let totalAbsent = 0;

    let totalMarked = 0;

    students.forEach(student=>{

        dates.forEach(date=>{

            const record =
                this.records[date];

            if(!record) return;

            const status =
                record[student.id];

            if(status === "present"){

                totalPresent++;

                totalMarked++;

            }

            if(status === "absent"){

                totalAbsent++;

                totalMarked++;

            }

        });

    });

    const average =
        totalMarked === 0
        ? 0
        : Math.round(
            (totalPresent / totalMarked) * 100
        );

    if(studentCount){

        studentCount.textContent =
            students.length;

    }

    if(presentEl){

        presentEl.textContent =
            totalPresent;

    }

    if(absentEl){

        absentEl.textContent =
            totalAbsent;

    }

    if(averageEl){

        averageEl.textContent =
            `${average}%`;

    }

    if(!classContainer){

        return;

    }

    if(students.length === 0){

        classContainer.innerHTML = `

            <div class="glass analytics-empty">

                No students available.

            </div>

        `;

        return;

    }

    const classes = [
        ...new Set(
            students.map(
                student=>student.class
            )
        )
    ];

    classContainer.innerHTML =
        classes.map(className=>{

            const classStudents =
                students.filter(
                    student=>
                        student.class === className
                );

            let present = 0;

            let absent = 0;

            classStudents.forEach(student=>{

                dates.forEach(date=>{

                    const record =
                        this.records[date];

                    if(!record) return;

                    const status =
                        record[student.id];

                    if(status === "present"){

                        present++;

                    }

                    if(status === "absent"){

                        absent++;

                    }

                });

            });

            const marked =
                present + absent;

            const percentage =
                marked === 0
                ? 0
                : Math.round(
                    (present / marked) * 100
                );

            return `

                <div class="glass class-analytics-card">

                    <div class="class-analytics-header">

                        <h3>
                            ${this.escape(
                                className
                            )}
                        </h3>

                        <strong>
                            ${percentage}%
                        </strong>

                    </div>

                    <div class="class-analytics-meta">

                        <span>
                            ${classStudents.length}
                            Students
                        </span>

                        <span>
                            ${present} Present
                            •
                            ${absent} Absent
                        </span>

                    </div>

                    <div class="class-analytics-bar">

                        <div
                            class="class-analytics-fill"
                            style="width:${percentage}%"
                        ></div>

                    </div>

                </div>

            `;

        }).join("");

},
   /* ==========================================================
   FORMAT DATE
========================================================== */

formatDate(date){

    if(!date) return "";

    const parts =
        date.split("-");

    if(parts.length !== 3){

        return date;

    }

    const formatted =
        new Date(
            Number(parts[0]),
            Number(parts[1])-1,
            Number(parts[2])
        );

    return formatted.toLocaleDateString(
        "en-IN",
        {
            day:"numeric",
            month:"long",
            year:"numeric"
        }
    );

},
/* ==========================================================
   SAVE ATTENDANCE
========================================================== */

    saveAttendance(){

        const students =
            this.getStudents();

        if(students.length === 0){

            if(window.UI){

                UI.toast(
                    "No students found",
                    "error"
                );

            }

            return;

        }

        const record =
            this.getCurrentRecord();

        const unmarked =
            students.filter(
                student=>
                    !record[student.id]
            );

        if(unmarked.length){

            if(window.UI){

                UI.toast(
                    "Mark all students first",
                    "error"
                );

            }

            return;

        }

        this.saveRecords();

        if(window.UI){

            UI.toast(
                "Attendance Saved",
                "success"
            );

        }

    },

/* ==========================================================
   ESCAPE HTML
========================================================== */

    escape(value){

        return String(value)

            .replace(/&/g,"&amp;")

            .replace(/</g,"&lt;")

            .replace(/>/g,"&gt;")

            .replace(/"/g,"&quot;")

            .replace(/'/g,"&#039;");

    }

};

/* ==========================================================
   START
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    ()=>{
        Attendance.init();
    }
);
