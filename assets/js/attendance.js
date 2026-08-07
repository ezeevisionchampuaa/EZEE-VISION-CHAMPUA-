/* ==========================================================
   EZEE VISION CHAMPUA
   Attendance Module
   Clean Version : 2.0.0
========================================================== */

"use strict";

const Attendance = {

    students: [],
    records: {},
    selectedDate: "",
    selectedClass: "",

    /* ======================================================
       INIT
    ====================================================== */

    init() {

        this.loadStudents();

        this.loadRecords();

        this.setToday();

        this.setCurrentMonth();

        this.bindEvents();

        this.render();

    },

    /* ======================================================
       LOAD STUDENTS
    ====================================================== */

    loadStudents() {

        const saved = localStorage.getItem("ezee_students");

        if (!saved) {

            this.students = [];

            return;

        }

        try {

            const data = JSON.parse(saved);

            this.students =
                Array.isArray(data)
                    ? data
                    : [];

        } catch (error) {

            this.students = [];

        }

    },

    /* ======================================================
       LOAD ATTENDANCE RECORDS
    ====================================================== */

    loadRecords() {

        const saved =
            localStorage.getItem("ezee_attendance");

        if (!saved) {

            this.records = {};

            return;

        }

        try {

            const data = JSON.parse(saved);

            this.records =
                data &&
                typeof data === "object"
                    ? data
                    : {};

        } catch (error) {

            this.records = {};

        }

    },

    /* ======================================================
       SAVE RECORDS
    ====================================================== */

    saveRecords() {

        localStorage.setItem(
            "ezee_attendance",
            JSON.stringify(this.records)
        );

    },

    /* ======================================================
       SET TODAY
    ====================================================== */

    setToday() {

        const input =
            document.getElementById(
                "attendanceDate"
            );

        const today =
            new Date();

        const year =
            today.getFullYear();

        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                today.getDate()
            ).padStart(2, "0");

        this.selectedDate =
            `${year}-${month}-${day}`;

        if (input) {

            input.value =
                this.selectedDate;

        }

    },

    /* ======================================================
       SET CURRENT MONTH
    ====================================================== */

    setCurrentMonth() {

        const input =
            document.getElementById(
                "attendanceMonth"
            );

        if (!input) return;

        const today =
            new Date();

        const year =
            today.getFullYear();

        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");

        input.value =
            `${year}-${month}`;

    },

    /* ======================================================
       EVENTS
    ====================================================== */

    bindEvents() {

        /* DATE */

        const dateInput =
            document.getElementById(
                "attendanceDate"
            );

        if (dateInput) {

            dateInput.addEventListener(
                "change",
                () => {

                    this.selectedDate =
                        dateInput.value;

                    this.render();

                }
            );

        }


        /* CLASS */

        const classSelect =
            document.getElementById(
                "attendanceClass"
            );

        if (classSelect) {

            classSelect.addEventListener(
                "change",
                () => {

                    this.selectedClass =
                        classSelect.value;

                    this.render();

                }
            );

        }


        /* MONTH */

        const monthInput =
            document.getElementById(
                "attendanceMonth"
            );

        if (monthInput) {

            monthInput.addEventListener(
                "change",
                () => {

                    this.renderMonthly();

                }
            );

        }


        /* SAVE */

        const saveButton =
            document.getElementById(
                "saveAttendance"
            );

        if (saveButton) {

            saveButton.addEventListener(
                "click",
                () => {

                    this.saveAttendance();

                }
            );

        }


        /* EXPORT */

        const exportButton =
            document.getElementById(
                "exportAttendanceBtn"
            );

        if (exportButton) {

            exportButton.addEventListener(
                "click",
                () => {

                    this.exportCSV();

                }
            );

        }


        /* PRINT */

        const printButton =
            document.getElementById(
                "printAttendanceBtn"
            );

        if (printButton) {

            printButton.addEventListener(
                "click",
                () => {

                    this.printAttendance();

                }
            );

        }


        /* ATTENDANCE BUTTONS */

        document.addEventListener(
            "click",
            (event) => {

                const button =
                    event.target.closest(
                        ".attendance-btn"
                    );

                if (!button) return;

                const id =
                    button.dataset.id;

                const status =
                    button.dataset.status;

                if (!id || !status) return;

                this.mark(
                    id,
                    status
                );

            }
        );


        /* RECORD EDIT */

        document.addEventListener(
            "click",
            (event) => {

                const button =
                    event.target.closest(
                        ".attendance-record-edit"
                    );

                if (!button) return;

                const date =
                    button.dataset.date;

                if (!date) return;

                this.loadRecord(date);

            }
        );

    },

    /* ======================================================
       GET FILTERED STUDENTS
    ====================================================== */

    getStudents() {

        return this.students.filter(
            (student) => {

                if (!this.selectedClass) {

                    return true;

                }

                return (
                    student.class ===
                    this.selectedClass
                );

            }
        );

    },

    /* ======================================================
       GET CURRENT RECORD
    ====================================================== */

    getCurrentRecord() {

        if (!this.selectedDate) {

            return {};

        }

        if (
            !this.records[
                this.selectedDate
            ]
        ) {

            this.records[
                this.selectedDate
            ] = {};

        }

        return this.records[
            this.selectedDate
        ];

    },

    /* ======================================================
       GET STATUS
    ====================================================== */

    getStatus(studentId) {

        const record =
            this.records[
                this.selectedDate
            ];

        if (!record) {

            return "";

        }

        return (
            record[studentId] || ""
        );

    },

    /* ======================================================
       MARK ATTENDANCE
    ====================================================== */

    mark(id, status) {

        if (!this.selectedDate) {

            return;

        }

        const record =
            this.getCurrentRecord();

        record[id] =
            status;

        this.render();

    },

    /* ======================================================
       RENDER EVERYTHING
    ====================================================== */

    render() {

        this.renderStudents();

        this.renderSummary();

        this.renderPercentage();

        this.renderMonthly();

        this.renderRecords();

        this.renderAnalytics();

    },

    /* ======================================================
       RENDER STUDENT LIST
    ====================================================== */

    renderStudents() {

        const list =
            document.getElementById(
                "attendanceList"
            );

        if (!list) return;

        const students =
            this.getStudents();

        if (students.length === 0) {

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

            return;

        }

        const record =
            this.getCurrentRecord();

        list.innerHTML =
            students.map(
                (student) => {

                    const status =
                        record[
                            student.id
                        ] || "";

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
                                    class="attendance-btn present ${
                                        status === "present"
                                            ? "active"
                                            : ""
                                    }"
                                    data-id="${this.escape(
                                        String(student.id)
                                    )}"
                                    data-status="present"
                                    aria-label="Present"
                                >

                                    <i class="fa-solid fa-check"></i>

                                </button>

                                <button
                                    type="button"
                                    class="attendance-btn absent ${
                                        status === "absent"
                                            ? "active"
                                            : ""
                                    }"
                                    data-id="${this.escape(
                                        String(student.id)
                                    )}"
                                    data-status="absent"
                                    aria-label="Absent"
                                >

                                    <i class="fa-solid fa-xmark"></i>

                                </button>

                            </div>

                        </div>

                    `;

                }
            ).join("");

    },

    /* ======================================================
       SUMMARY
    ====================================================== */

    renderSummary() {

        const students =
            this.getStudents();

        const record =
            this.getCurrentRecord();

        let present = 0;

        let absent = 0;

        students.forEach(
            (student) => {

                if (
                    record[student.id]
                    === "present"
                ) {

                    present++;

                }

                if (
                    record[student.id]
                    === "absent"
                ) {

                    absent++;

                }

            }
        );

        const total =
            document.getElementById(
                "attendanceTotal"
            );

        const presentElement =
            document.getElementById(
                "attendancePresent"
            );

        const absentElement =
            document.getElementById(
                "attendanceAbsent"
            );

        if (total) {

            total.textContent =
                students.length;

        }

        if (presentElement) {

            presentElement.textContent =
                present;

        }

        if (absentElement) {

            absentElement.textContent =
                absent;

        }

    },

    /* ======================================================
       SAVE ATTENDANCE
    ====================================================== */

    saveAttendance() {

        if (!this.selectedDate) {

            this.showToast(
                "Select a date",
                "error"
            );

            return;

        }

        const students =
            this.getStudents();

        if (students.length === 0) {

            this.showToast(
                "No students found",
                "error"
            );

            return;

        }

        const record =
            this.getCurrentRecord();

        let marked = 0;

        students.forEach(
            (student) => {

                if (
                    record[student.id]
                    === "present"
                    ||
                    record[student.id]
                    === "absent"
                ) {

                    marked++;

                }

            }
        );

        if (marked === 0) {

            this.showToast(
                "Mark attendance first",
                "error"
            );

            return;

        }

        this.saveRecords();

        this.render();

        this.showToast(
            "Attendance Saved",
            "success"
        );

    },

    /* ======================================================
       PERCENTAGE
    ====================================================== */

    renderPercentage() {

        const container =
            document.getElementById(
                "attendancePercentageList"
            );

        if (!container) return;

        const students =
            this.getStudents();

        if (students.length === 0) {

            container.innerHTML = `

                <div class="glass percentage-empty">

                    No students available.

                </div>

            `;

            return;

        }

        const dates =
            Object.keys(
                this.records
            );

        if (dates.length === 0) {

            container.innerHTML = `

                <div class="glass percentage-empty">

                    No attendance records available yet.

                </div>

            `;

            return;

        }

        container.innerHTML =
            students.map(
                (student) => {

                    let present = 0;

                    let total = 0;

                    dates.forEach(
                        (date) => {

                            const record =
                                this.records[
                                    date
                                ];

                            if (
                                record &&
                                record[
                                    student.id
                                ]
                            ) {

                                total++;

                                if (
                                    record[
                                        student.id
                                    ]
                                    === "present"
                                ) {

                                    present++;

                                }

                            }

                        }
                    );

                    const percentage =
                        total === 0
                            ? 0
                            : Math.round(
                                (
                                    present /
                                    total
                                ) * 100
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

                }
            ).join("");

    },

    /* ==========================================================
   MONTHLY ATTENDANCE
   CONTINUED
========================================================== */

renderMonthly(){

    const container =
        document.getElementById("monthlyAttendanceList");

    if(!container) return;

    const students = this.getStudents();

    if(students.length === 0){

        container.innerHTML = `
            <div class="glass monthly-empty">
                No students available.
            </div>
        `;

        return;
    }

    const monthInput =
        document.getElementById("attendanceMonth");

    const month =
        monthInput ? monthInput.value : "";

    if(!month){

        container.innerHTML = `
            <div class="glass monthly-empty">
                Select a month to view attendance.
            </div>
        `;

        return;
    }

    container.innerHTML = students.map(student => {

        let present = 0;
        let absent = 0;

        Object.keys(this.records).forEach(date => {

            if(!date.startsWith(month)) return;

            const record = this.records[date];

            if(!record) return;

            const status = record[student.id];

            if(status === "present"){
                present++;
            }

            if(status === "absent"){
                absent++;
            }

        });

        const total = present + absent;

        const percentage =
            total === 0
                ? 0
                : Math.round((present / total) * 100);

        return `
            <div class="glass monthly-card">

                <div class="monthly-card-header">

                    <div class="monthly-student-info">

                        <h3>
                            ${this.escape(student.name)}
                        </h3>

                        <p>
                            ${this.escape(student.class)}
                        </p>

                    </div>

                    <div class="monthly-percentage">
                        ${percentage}%
                    </div>

                </div>

                <div class="monthly-stats">

                    <div class="monthly-stat">
                        <span>Marked</span>
                        <strong>${total}</strong>
                    </div>

                    <div class="monthly-stat">
                        <span>Present</span>
                        <strong>${present}</strong>
                    </div>

                    <div class="monthly-stat">
                        <span>Absent</span>
                        <strong>${absent}</strong>
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
   LOAD SAVED RECORD
========================================================== */

loadRecord(date){

    if(!this.records[date]){
        return;
    }

    this.selectedDate = date;

    const dateInput =
        document.getElementById("attendanceDate");

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

    const record = this.getCurrentRecord();

    let present = 0;
    let absent = 0;

    students.forEach(student => {

        if(record[student.id] === "present"){
            present++;
        }

        if(record[student.id] === "absent"){
            absent++;
        }

    });

    const total =
        document.getElementById("attendanceTotal");

    const presentEl =
        document.getElementById("attendancePresent");

    const absentEl =
        document.getElementById("attendanceAbsent");

    if(total){
        total.textContent = students.length;
    }

    if(presentEl){
        presentEl.textContent = present;
    }

    if(absentEl){
        absentEl.textContent = absent;
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

    const students = this.getStudents();

    if(students.length === 0){

        container.innerHTML = `
            <div class="glass percentage-empty">
                No students available.
            </div>
        `;

        return;
    }

    const dates = Object.keys(this.records);

    if(dates.length === 0){

        container.innerHTML = `
            <div class="glass percentage-empty">
                No attendance records available yet.
            </div>
        `;

        return;
    }

    container.innerHTML = students.map(student => {

        let present = 0;
        let total = 0;

        dates.forEach(date => {

            const record = this.records[date];

            if(
                record &&
                record[student.id]
            ){

                total++;

                if(
                    record[student.id] === "present"
                ){
                    present++;
                }

            }

        });

        const percentage =
            total === 0
                ? 0
                : Math.round((present / total) * 100);

        return `
            <div class="glass percentage-card">

                <div class="attendance-avatar">

                    <i class="fa-solid fa-user"></i>

                </div>

                <div class="percentage-info">

                    <h3>
                        ${this.escape(student.name)}
                    </h3>

                    <p>
                        ${this.escape(student.class)}
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
   SAVED ATTENDANCE RECORDS
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

    container.innerHTML = dates.map(date => {

        const record =
            this.records[date] || {};

        let present = 0;
        let absent = 0;

        Object.values(record).forEach(status => {

            if(status === "present"){
                present++;
            }

            if(status === "absent"){
                absent++;
            }

        });

        const total = present + absent;

        return `
            <div class="glass attendance-record-card">

                <div class="attendance-record-header">

                    <div class="attendance-record-date">

                        <div class="attendance-record-icon">

                            <i class="fa-solid fa-calendar-check"></i>

                        </div>

                        <div>

                            <h3>
                                ${this.formatDate(date)}
                            </h3>

                            <p>
                                Attendance Record
                            </p>

                        </div>

                    </div>

                </div>

                <div class="attendance-record-stats">

                    <div class="attendance-record-stat">

                        <span>Total</span>

                        <strong>
                            ${total}
                        </strong>

                    </div>

                    <div class="attendance-record-stat">

                        <span>Present</span>

                        <strong>
                            ${present}
                        </strong>

                    </div>

                    <div class="attendance-record-stat">

                        <span>Absent</span>

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

                        Edit

                    </button>

                </div>

            </div>
        `;

    }).join("");

},

/* ==========================================================
   ANALYTICS
========================================================== */

renderAnalytics(){

    const students =
        this.getStudents();

    let present = 0;
    let absent = 0;

    Object.values(this.records).forEach(record => {

        if(!record) return;

        Object.values(record).forEach(status => {

            if(status === "present"){
                present++;
            }

            if(status === "absent"){
                absent++;
            }

        });

    });

    const totalMarked =
        present + absent;

    const average =
        totalMarked === 0
            ? 0
            : Math.round(
                (present / totalMarked) * 100
            );

    const studentsEl =
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

    if(studentsEl){
        studentsEl.textContent =
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

    if(averageEl){
        averageEl.textContent =
            `${average}%`;
    }

    this.renderClassAnalytics();

},

/* ==========================================================
   CLASS ANALYTICS
========================================================== */

renderClassAnalytics(){

    const container =
        document.getElementById(
            "classAnalyticsList"
        );

    if(!container) return;

    if(this.students.length === 0){

        container.innerHTML = `
            <div class="glass analytics-empty">
                No students available.
            </div>
        `;

        return;
    }

    const classes = [
        "Class 6",
        "Class 7",
        "Class 8",
        "Class 9",
        "Class 10"
    ];

    container.innerHTML = classes.map(className => {

        const students =
            this.students.filter(
                student =>
                    student.class === className
            );

        if(students.length === 0){
            return "";
        }

        let present = 0;
        let absent = 0;

        Object.values(this.records).forEach(record => {

            if(!record) return;

            students.forEach(student => {

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

        const total =
            present + absent;

        const percentage =
            total === 0
                ? 0
                : Math.round(
                    (present / total) * 100
                );

        return `
            <div class="glass class-analytics-card">

                <div class="class-analytics-header">

                    <h3>
                        ${this.escape(className)}
                    </h3>

                    <strong>
                        ${percentage}%
                    </strong>

                </div>

                <div class="class-analytics-meta">

                    <span>
                        Students: ${students.length}
                    </span>

                    <span>
                        Present: ${present}
                    </span>

                    <span>
                        Absent: ${absent}
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
   SAVE ATTENDANCE
========================================================== */

saveAttendance(){

    if(!this.selectedDate){

        if(window.UI){
            UI.toast(
                "Select attendance date",
                "error"
            );
        }

        return;
    }

    const students =
        this.getStudents();

    if(students.length === 0){

        if(window.UI){
            UI.toast(
                "No students available",
                "error"
            );
        }

        return;
    }

    const record =
        this.getCurrentRecord();

    let marked = 0;

    students.forEach(student => {

        if(
            record[student.id] === "present" ||
            record[student.id] === "absent"
        ){
            marked++;
        }

    });

    if(marked === 0){

        if(window.UI){
            UI.toast(
                "Mark attendance first",
                "error"
            );
        }

        return;
    }

    this.saveRecords();

    this.render();

    if(window.UI){

        UI.toast(
            "Attendance saved successfully",
            "success"
        );

    }

},

/* ==========================================================
   CSV EXPORT
========================================================== */

exportCSV(){

    const dates =
        Object.keys(this.records)
        .sort();

    if(dates.length === 0){

        if(window.UI){
            UI.toast(
                "No attendance records to export",
                "error"
            );
        }

        return;
    }

    const rows = [
        [
            "Date",
            "Student Name",
            "Class",
            "Status"
        ]
    ];

    dates.forEach(date => {

        const record =
            this.records[date] || {};

        Object.entries(record).forEach(
            ([studentId,status]) => {

                const student =
                    this.students.find(
                        s => String(s.id) === String(studentId)
                    );

                if(!student) return;

                rows.push([
                    date,
                    student.name,
                    student.class,
                    status
                ]);

            }
        );

    });

    const csv =
        rows.map(row =>
            row.map(value =>
                `"${String(value)
                    .replace(/"/g,'""')}"`
            ).join(",")
        ).join("\n");

    const blob =
        new Blob(
            [csv],
            {
                type:"text/csv;charset=utf-8;"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "attendance-records.csv";

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

    if(window.UI){

        UI.toast(
            "Attendance CSV exported",
            "success"
        );

    }

},

/* ==========================================================
   PRINT ATTENDANCE
========================================================== */

printAttendance(){

    const printArea =
        document.getElementById(
            "attendancePrintArea"
        );

    if(!printArea) return;

    const students =
        this.getStudents();

    if(students.length === 0){

        if(window.UI){
            UI.toast(
                "No students to print",
                "error"
            );
        }

        return;
    }

    const record =
        this.getCurrentRecord();

    const dateEl =
        document.getElementById(
            "printAttendanceDate"
        );

    const classEl =
        document.getElementById(
            "printAttendanceClass"
        );

    const body =
        document.getElementById(
            "printAttendanceBody"
        );

    const totalEl =
        document.getElementById(
            "printTotal"
        );

    const presentEl =
        document.getElementById(
            "printPresent"
        );

    const absentEl =
        document.getElementById(
            "printAbsent"
        );

    if(dateEl){
        dateEl.textContent =
            this.formatDate(this.selectedDate);
    }

    if(classEl){
        classEl.textContent =
            this.selectedClass ||
            "All Classes";
    }

    let present = 0;
    let absent = 0;

    if(body){

        body.innerHTML =
            students.map((student,index) => {

                const status =
                    record[student.id] || "Not Marked";

                if(status === "present"){
                    present++;
                }

                if(status === "absent"){
                    absent++;
                }

                const displayStatus =
                    status === "present"
                        ? "Present"
                        : status === "absent"
                            ? "Absent"
                            : "Not Marked";

                return `
                    <tr>

                        <td>
                            ${index + 1}
                        </td>

                        <td>
                            ${this.escape(student.name)}
                        </td>

                        <td>
                            ${this.escape(student.class)}
                        </td>

                        <td>
                            ${displayStatus}
                        </td>

                    </tr>
                `;

            }).join("");

    }

    if(totalEl){
        totalEl.textContent =
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

    window.print();

},
/* ==========================================================
   FORMAT DATE
========================================================== */

formatDate(date){

    if(!date){
        return "—";
    }

    const parts = date.split("-");

    if(parts.length !== 3){
        return date;
    }

    return `${parts[2]}-${parts[1]}-${parts[0]}`;

},

/* ==========================================================
   EXPORT CSV
========================================================== */

exportCSV(){

    const dates =
        Object.keys(this.records)
        .sort();

    if(dates.length === 0){

        if(window.UI){

            UI.toast(
                "No attendance records to export",
                "error"
            );

        }else{

            alert(
                "No attendance records to export."
            );

        }

        return;

    }

    const rows = [];

    rows.push([
        "Date",
        "Student Name",
        "Class",
        "Status"
    ]);

    dates.forEach(date=>{

        const record =
            this.records[date] || {};

        this.students.forEach(student=>{

            const status =
                record[student.id];

            if(!status){
                return;
            }

            rows.push([
                date,
                student.name,
                student.class,
                status === "present"
                    ? "Present"
                    : "Absent"
            ]);

        });

    });

    const csv =
        rows
        .map(row =>
            row.map(value =>
                `"${String(value)
                    .replace(/"/g,'""')}"`
            ).join(",")
        )
        .join("\n");

    const blob =
        new Blob(
            [csv],
            {
                type:"text/csv;charset=utf-8;"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "ezee-vision-attendance.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    if(window.UI){

        UI.toast(
            "Attendance CSV exported",
            "success"
        );

    }

},

/* ==========================================================
   PRINT ATTENDANCE
========================================================== */

printAttendance(){

    const students =
        this.getStudents();

    if(students.length === 0){

        if(window.UI){

            UI.toast(
                "No students available to print",
                "error"
            );

        }else{

            alert(
                "No students available to print."
            );

        }

        return;

    }

    const record =
        this.getCurrentRecord();

    const date =
        this.selectedDate || "";

    const classValue =
        this.selectedClass ||
        "All Classes";

    const body =
        document.getElementById(
            "printAttendanceBody"
        );

    const printDate =
        document.getElementById(
            "printAttendanceDate"
        );

    const printClass =
        document.getElementById(
            "printAttendanceClass"
        );

    const printTotal =
        document.getElementById(
            "printTotal"
        );

    const printPresent =
        document.getElementById(
            "printPresent"
        );

    const printAbsent =
        document.getElementById(
            "printAbsent"
        );

    if(!body){
        return;
    }

    let present = 0;

    let absent = 0;

    body.innerHTML =
        students.map(
            (student,index)=>{

                const status =
                    record[student.id] || "Not Marked";

                if(status === "present"){
                    present++;
                }

                if(status === "absent"){
                    absent++;
                }

                const displayStatus =
                    status === "present"
                        ? "Present"
                        : status === "absent"
                            ? "Absent"
                            : "Not Marked";

                return `

                    <tr>

                        <td>
                            ${index + 1}
                        </td>

                        <td>
                            ${this.escape(
                                student.name
                            )}
                        </td>

                        <td>
                            ${this.escape(
                                student.class
                            )}
                        </td>

                        <td>
                            ${displayStatus}
                        </td>

                    </tr>

                `;

            }
        ).join("");

    if(printDate){

        printDate.textContent =
            this.formatDate(date);

    }

    if(printClass){

        printClass.textContent =
            classValue;

    }

    if(printTotal){

        printTotal.textContent =
            students.length;

    }

    if(printPresent){

        printPresent.textContent =
            present;

    }

    if(printAbsent){

        printAbsent.textContent =
            absent;

    }

    /*
       Small delay ensures the print area
       is completely updated before browser
       print dialog opens.
    */

    setTimeout(()=>{

        window.print();

    },100);

},

/* ==========================================================
   ANALYTICS
========================================================== */

renderAnalytics(){

    const students =
        this.getStudents();

    let totalPresent = 0;

    let totalAbsent = 0;

    const dates =
        Object.keys(this.records);

    students.forEach(student=>{

        dates.forEach(date=>{

            const record =
                this.records[date];

            if(!record){
                return;
            }

            const status =
                record[student.id];

            if(status === "present"){

                totalPresent++;

            }

            if(status === "absent"){

                totalAbsent++;

            }

        });

    });

    const totalMarked =
        totalPresent + totalAbsent;

    const average =
        totalMarked === 0
            ? 0
            : Math.round(
                (
                    totalPresent /
                    totalMarked
                ) * 100
            );

    const studentsEl =
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

    if(studentsEl){

        studentsEl.textContent =
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

    this.renderClassAnalytics();

},

/* ==========================================================
   CLASS ANALYTICS
========================================================== */

renderClassAnalytics(){

    const container =
        document.getElementById(
            "classAnalyticsList"
        );

    if(!container){
        return;
    }

    const classes = [
        "Class 6",
        "Class 7",
        "Class 8",
        "Class 9",
        "Class 10"
    ];

    if(this.students.length === 0){

        container.innerHTML = `

            <div class="glass analytics-empty">

                No students available.

            </div>

        `;

        return;

    }

    container.innerHTML =
        classes.map(className=>{

            const classStudents =
                this.students.filter(
                    student =>
                        student.class === className
                );

            if(classStudents.length === 0){
                return "";
            }

            let present = 0;

            let absent = 0;

            Object.keys(this.records)
                .forEach(date=>{

                    const record =
                        this.records[date];

                    if(!record){
                        return;
                    }

                    classStudents.forEach(
                        student=>{

                            const status =
                                record[student.id];

                            if(status === "present"){
                                present++;
                            }

                            if(status === "absent"){
                                absent++;
                            }

                        }
                    );

                });

            const marked =
                present + absent;

            const percentage =
                marked === 0
                    ? 0
                    : Math.round(
                        (
                            present /
                            marked
                        ) * 100
                    );

            return `

                <div class="glass class-analytics-card">

                    <div class="class-analytics-header">

                        <h3>
                            ${className}
                        </h3>

                        <strong>
                            ${percentage}%
                        </strong>

                    </div>

                    <div class="class-analytics-meta">

                        <span>
                            Students:
                            ${classStudents.length}
                        </span>

                        <span>
                            Present:
                            ${present}
                        </span>

                        <span>
                            Absent:
                            ${absent}
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
   ESCAPE HTML
========================================================== */

escape(value){

    return String(value ?? "")
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");

}

};

=====================================================
       TOAST
    ====================================================== */

    showToast(message, type) {

        if (
            window.UI &&
            typeof UI.toast === "function"
        ) {

            UI.toast(
                message,
                type
            );

            return;

        }

        console.log(
            message
        );

    }

};



/* ==========================================================
   START ATTENDANCE MODULE
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        Attendance.init();

    }
);

                
