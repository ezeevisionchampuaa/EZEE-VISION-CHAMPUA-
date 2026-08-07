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
            localStorage.getItem("ezee_attendance");

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
            JSON.stringify(this.records)
        );

    }

};
    /* ======================================================
       SET TODAY
    ====================================================== */

    setToday() {

        const input =
            document.getElementById("attendanceDate");

        const today = new Date();

        const year =
            today.getFullYear();

        const month =
            String(today.getMonth() + 1)
                .padStart(2, "0");

        const day =
            String(today.getDate())
                .padStart(2, "0");

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
            document.getElementById("attendanceMonth");

        if (!input) return;

        const today = new Date();

        const year =
            today.getFullYear();

        const month =
            String(today.getMonth() + 1)
                .padStart(2, "0");

        input.value =
            `${year}-${month}`;

    },


    /* ======================================================
       EVENTS
    ====================================================== */

    bindEvents() {
this.bindAttendanceButtons();
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
       GET STUDENT STATUS
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
       ATTENDANCE BUTTON EVENTS
    ====================================================== */

    bindAttendanceButtons() {

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
                        record[student.id] || "";

                    return `

                        <div class="glass attendance-card">

                            <div class="attendance-avatar">

                                <i class="fa-solid fa-user"></i>

                            </div>

                            <div class="attendance-student">

                                <h3>
                                    ${student.name}
                                </h3>

                                <p>
                                    ${student.class}
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
                                    data-id="${student.id}"
                                    data-status="present"
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
                                    data-id="${student.id}"
                                    data-status="absent"
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
       RENDER SUMMARY
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

        this.showToast(
            "Attendance Saved",
            "success"
        );

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

        if (!monthInput) return;

        const selectedMonth =
            monthInput.value;

        if (!selectedMonth) {

            container.innerHTML = `

                <div class="glass monthly-empty">

                    Select a month.

                </div>

            `;

            return;

        }

        const dates =
            Object.keys(this.records)
                .filter(
                    (date) =>
                        date.startsWith(
                            selectedMonth
                        )
                )
                .sort();

        if (dates.length === 0) {

            container.innerHTML = `

                <div class="glass monthly-empty">

                    No attendance records for
                    this month.

                </div>

            `;

            return;

        }

        container.innerHTML =
            students.map(
                (student) => {

                    let present = 0;

                    let absent = 0;

                    dates.forEach(
                        (date) => {

                            const record =
                                this.records[date];

                            if (
                                !record ||
                                !record[
                                    student.id
                                ]
                            ) {

                                return;

                            }

                            if (
                                record[
                                    student.id
                                ] === "present"
                            ) {

                                present++;

                            }

                            if (
                                record[
                                    student.id
                                ] === "absent"
                            ) {

                                absent++;

                            }

                        }
                    );

                    return `

                        <div class="glass monthly-attendance-card">

                            <div class="attendance-avatar">

                                <i class="fa-solid fa-user"></i>

                            </div>

                            <div class="monthly-attendance-info">

                                <h3>
                                    ${student.name}
                                </h3>

                                <p>
                                    ${student.class}
                                </p>

                                <span>
                                    Present: ${present}
                                    &nbsp; • &nbsp;
                                    Absent: ${absent}
                                </span>

                            </div>

                        </div>

                    `;

                }
            ).join("");

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
                                record[
                                    student.id
                                ]
                            ) {

                                total++;

                                if (
                                    record[
                                        student.id
                                    ] === "present"
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
                                    ${student.name}
                                </h3>

                                <p>
                                    ${student.class}
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

                    return `

                        <div class="glass attendance-record-card">

                            <div class="attendance-record-info">

                                <h3>
                                    ${date}
                                </h3>

                                <p>
                                    Present: ${present}
                                    &nbsp; • &nbsp;
                                    Absent: ${absent}
                                </p>

                            </div>

                            <button
                                type="button"
                                class="attendance-record-edit"
                                data-date="${date}"
                            >

                                <i class="fa-solid fa-pen"></i>

                            </button>

                        </div>

                    `;

                }
            ).join("");

    },


    /* ======================================================
       LOAD RECORD
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

        let studentsCount =
            this.students.length;

        let present = 0;

        let absent = 0;

        Object.values(this.records)
            .forEach(
                (record) => {

                    Object.values(record)
                        .forEach(
                            (status) => {

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

                }
            );

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
                studentsCount;

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

                    Object.values(this.records)
                        .forEach(
                            (record) => {

                                students.forEach(
                                    (student) => {

                                        if (
                                            record[
                                                student.id
                                            ] === "present"
                                        ) {

                                            present++;

                                        }

                                        if (
                                            record[
                                                student.id
                                            ] === "absent"
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
                                    Present: ${present}
                                    &nbsp; • &nbsp;
                                    Absent: ${absent}
                                </p>

                            </div>

                            <strong>
                                ${percentage}%
                            </strong>

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
                "No attendance records available",
                "error"
            );

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

        dates.forEach(
            (date) => {

                const record =
                    this.records[date] || {};

                this.students.forEach(
                    (student) => {

                        const status =
                            record[student.id] || "";

                        if (!status) return;

                        rows.push([
                            date,
                            student.name,
                            student.class,
                            status
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
            "attendance-records.csv";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

    },


    /* ======================================================
       PRINT ATTENDANCE
    ====================================================== */

    printAttendance() {

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

        const dateElement =
            document.getElementById(
                "printAttendanceDate"
            );

        const classElement =
            document.getElementById(
                "printAttendanceClass"
            );

        const body =
            document.getElementById(
                "printAttendanceBody"
            );

        const totalElement =
            document.getElementById(
                "printTotal"
            );

        const presentElement =
            document.getElementById(
                "printPresent"
            );

        const absentElement =
            document.getElementById(
                "printAbsent"
            );

        if (!body) return;

        let present = 0;

        let absent = 0;

        body.innerHTML =
            students.map(
                (student, index) => {

                    const status =
                        record[student.id] || "";

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
                                ${student.name}
                            </td>

                            <td>
                                ${student.class}
                            </td>

                            <td>
                                ${status || "—"}
                            </td>

                        </tr>
                    `;

                }
            ).join("");

        if (dateElement) {

            dateElement.textContent =
                this.selectedDate || "—";

        }

        if (classElement) {

            classElement.textContent =
                this.selectedClass ||
                "All Classes";

        }

        if (totalElement) {

            totalElement.textContent =
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

        window.print();

    },
    /* ======================================================
       RENDER
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

        }

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

    }

};


/* ==========================================================
   START ATTENDANCE
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        Attendance.init();

        Attendance.setToday();

        Attendance.setCurrentMonth();

        Attendance.bindEvents();

        Attendance.render();

    }
);
