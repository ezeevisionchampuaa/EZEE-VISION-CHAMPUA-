/* ==========================================================
   EZEE VISION CHAMPUA
   Attendance Module
   Clean Rewrite : 2.0.0
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

    init(){

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

        const saved =
            localStorage.getItem("ezee_students");

        if (!saved) {

            this.students = [];

            return;

        }

        try {

            const data =
                JSON.parse(saved);

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
            localStorage.getItem(
                "ezee_attendance"
            );

        if (!saved) {

            this.records = {};

            return;

        }

        try {

            const data =
                JSON.parse(saved);

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
       SAVE ATTENDANCE RECORDS
    ====================================================== */

    saveRecords() {

        localStorage.setItem(
            "ezee_attendance",
            JSON.stringify(
                this.records
            )
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
this.bindAttendanceButtons();
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
       ESCAPE HTML
    ====================================================== */

    escape(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

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
                    record[student.id] ===
                    "present"
                ) {

                    present++;

                }

                if (
                    record[student.id] ===
                    "absent"
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
                    record[student.id] ===
                    "present" ||
                    record[student.id] ===
                    "absent"
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
       ATTENDANCE PERCENTAGE
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
                                this.records[date];

                            if (
                                record &&
                                record[student.id]
                            ) {

                                total++;

                                if (
                                    record[student.id] ===
                                    "present"
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


    /* ======================================================
       MONTHLY ATTENDANCE
    ====================================================== */

    renderMonthly() {

        const container =
            document.getElementById(
                "monthlyAttendanceList"
            );

        if (!container) return;

        const students =
            this.getStudents();

        if (students.length === 0) {

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

        if (!monthInput || !monthInput.value) {

            container.innerHTML = "";

            return;

        }

        const selectedMonth =
            monthInput.value;

        container.innerHTML =
            students.map(
                (student) => {

                    let present = 0;

                    let absent = 0;

                    Object.keys(
                        this.records
                    ).forEach(
                        (date) => {

                            if (
                                !date.startsWith(
                                    selectedMonth
                                )
                            ) {

                                return;

                            }

                            const status =
                                this.records[date] &&
                                this.records[date][
                                    student.id
                                ];

                            if (
                                status === "present"
                            ) {

                                present++;

                            }

                            if (
                                status === "absent"
                            ) {

                                absent++;

                            }

                        }
                    );

                    const total =
                        present + absent;

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

                        <div class="glass monthly-card">

                            <div class="monthly-student">

                                <div class="attendance-avatar">

                                    <i class="fa-solid fa-user"></i>

                                </div>

                                <div>

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

                            </div>

                            <div class="monthly-stats">

                                <span>
                                    Present:
                                    <strong>
                                        ${present}
                                    </strong>
                                </span>

                                <span>
                                    Absent:
                                    <strong>
                                        ${absent}
                                    </strong>
                                </span>

                                <span>
                                    ${percentage}%
                                </span>

                            </div>

                        </div>

                    `;

                }
            ).join("");

    },
       /* ======================================================
       ATTENDANCE RECORDS
    ====================================================== */

    renderRecords() {

        const container =
            document.getElementById(
                "attendanceRecordsList"
            );

        if (!container) return;

        const dates =
            Object.keys(this.records)
                .sort()
                .reverse();

        if (dates.length === 0) {

            container.innerHTML = `

                <div class="glass attendance-empty">

                    <i class="fa-solid fa-calendar-xmark"></i>

                    <h3>
                        No Attendance Records
                    </h3>

                    <p>
                        Saved attendance records
                        will appear here.
                    </p>

                </div>

            `;

            return;

        }

        container.innerHTML =
            dates.map(
                (date) => {

                    const record =
                        this.records[date] || {};

                    let present = 0;

                    let absent = 0;

                    Object.values(record)
                        .forEach(
                            (status) => {

                                if (
                                    status ===
                                    "present"
                                ) {

                                    present++;

                                }

                                if (
                                    status ===
                                    "absent"
                                ) {

                                    absent++;

                                }

                            }
                        );

                    const total =
                        present + absent;

                    return `

                        <div class="glass attendance-record-card">

                            <div class="record-info">

                                <h3>
                                    ${this.escape(
                                        date
                                    )}
                                </h3>

                                <p>
                                    Total:
                                    ${total}
                                    •
                                    Present:
                                    ${present}
                                    •
                                    Absent:
                                    ${absent}
                                </p>

                            </div>

                            <button
                                type="button"
                                class="attendance-record-edit"
                                data-date="${this.escape(
                                    date
                                )}"
                            >

                                <i class="fa-solid fa-pen"></i>

                                Edit

                            </button>

                        </div>

                    `;

                }
            ).join("");

    },


    /* ======================================================
       LOAD SAVED RECORD
    ====================================================== */

    loadRecord(date) {

        if (!date) return;

        this.selectedDate =
            date;

        const dateInput =
            document.getElementById(
                "attendanceDate"
            );

        if (dateInput) {

            dateInput.value =
                date;

        }

        this.render();

    },
       /* ======================================================
       ATTENDANCE ANALYTICS
    ====================================================== */

    renderAnalytics() {

        const students =
            this.getStudents();

        let present = 0;

        let absent = 0;

        Object.values(this.records)
            .forEach((record) => {

                if (!record) return;

                Object.values(record)
                    .forEach((status) => {

                        if (
                            status === "present"
                        ) {

                            present++;

                        }

                        if (
                            status === "absent"
                        ) {

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
                    (
                        present /
                        totalMarked
                    ) * 100
                );

        const studentsElement =
            document.getElementById(
                "analyticsStudents"
            );

        const presentElement =
            document.getElementById(
                "analyticsPresent"
            );

        const absentElement =
            document.getElementById(
                "analyticsAbsent"
            );

        const averageElement =
            document.getElementById(
                "analyticsAverage"
            );

        if (studentsElement) {

            studentsElement.textContent =
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

        if (averageElement) {

            averageElement.textContent =
                `${average}%`;

        }

        this.renderClassAnalytics();

    },


    /* ======================================================
       CLASS-WISE ANALYTICS
    ====================================================== */

    renderClassAnalytics() {

        const container =
            document.getElementById(
                "classAnalyticsList"
            );

        if (!container) return;

        const classes = [
            "Class 6",
            "Class 7",
            "Class 8",
            "Class 9",
            "Class 10"
        ];

        container.innerHTML =
            classes.map(
                (className) => {

                    const students =
                        this.students.filter(
                            (student) =>
                                student.class ===
                                className
                        );

                    let present = 0;

                    let absent = 0;

                    students.forEach(
                        (student) => {

                            Object.values(
                                this.records
                            ).forEach(
                                (record) => {

                                    if (!record) {
                                        return;
                                    }

                                    const status =
                                        record[
                                            student.id
                                        ];

                                    if (
                                        status ===
                                        "present"
                                    ) {

                                        present++;

                                    }

                                    if (
                                        status ===
                                        "absent"
                                    ) {

                                        absent++;

                                    }

                                }
                            );

                        }
                    );

                    const total =
                        present + absent;

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

                        <div class="glass class-analytics-card">

                            <div>

                                <h3>
                                    ${className}
                                </h3>

                                <p>
                                    Students:
                                    ${students.length}
                                </p>

                            </div>

                            <div class="class-analytics-value">

                                <strong>
                                    ${percentage}%
                                </strong>

                                <span>
                                    ${present}
                                    Present /
                                    ${absent}
                                    Absent
                                </span>

                            </div>

                        </div>

                    `;

                }
            ).join("");

    },
       /* ======================================================
       EXPORT CSV
    ====================================================== */

    exportCSV() {

        const dates =
            Object.keys(this.records)
                .sort();

        if (dates.length === 0) {

            this.showToast(
                "No attendance records to export",
                "error"
            );

            return;

        }

        const rows = [];

        rows.push([
            "Date",
            "Student Name",
            "Class",
            "Status"
        ]);

        dates.forEach(
            (date) => {

                const record =
                    this.records[date] || {};

                Object.keys(record)
                    .forEach(
                        (studentId) => {

                            const student =
                                this.students.find(
                                    (item) =>
                                        String(item.id) ===
                                        String(studentId)
                                );

                            if (!student) return;

                            rows.push([
                                date,
                                student.name,
                                student.class,
                                record[studentId]
                            ]);

                        }
                    );

            }
        );

        const csv =
            rows.map(
                (row) =>
                    row.map(
                        (value) =>
                            `"${String(value)
                                .replace(/"/g, '""')}"`
                    ).join(",")
            ).join("\n");

        const blob =
            new Blob(
                [csv],
                {
                    type:
                        "text/csv;charset=utf-8;"
                }
            );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "ezee-attendance.csv";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        this.showToast(
            "Attendance CSV exported",
            "success"
        );

    },


    /* ======================================================
       PRINT ATTENDANCE
    ====================================================== */

    printAttendance() {

        const students =
            this.getStudents();

        if (students.length === 0) {

            this.showToast(
                "No students available",
                "error"
            );

            return;

        }

        const record =
            this.getCurrentRecord();

        const body =
            document.getElementById(
                "printAttendanceBody"
            );

        if (!body) return;

        let present = 0;

        let absent = 0;

        body.innerHTML =
            students.map(
                (student, index) => {

                    const status =
                        record[student.id] ||
                        "Not Marked";

                    if (
                        status === "present"
                    ) {

                        present++;

                    }

                    if (
                        status === "absent"
                    ) {

                        absent++;

                    }

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
                                ${this.escape(
                                    status
                                )}
                            </td>

                        </tr>

                    `;

                }
            ).join("");

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

        if (printDate) {

            printDate.textContent =
                this.selectedDate || "—";

        }

        if (printClass) {

            printClass.textContent =
                this.selectedClass ||
                "All Classes";

        }

        if (printTotal) {

            printTotal.textContent =
                students.length;

        }

        if (printPresent) {

            printPresent.textContent =
                present;

        }

        if (printAbsent) {

            printAbsent.textContent =
                absent;

        }

        window.print();

    },


    /* ======================================================
       TOAST
    ====================================================== */

    showToast(message, type = "success") {

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

        alert(message);

    },


    /* ======================================================
       MAIN RENDER
    ====================================================== */

    render() {

        this.renderStudents();

        this.renderSummary();

        this.renderPercentage();

        this.renderMonthly();

        this.renderRecords();

        this.renderAnalytics();

    },
   };

/* ==========================================================
   START ATTENDANCE APP
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        Attendance.init();

    }
);
