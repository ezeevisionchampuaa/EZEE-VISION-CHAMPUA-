/* ==========================================================
   EZEE VISION CHAMPUA
   Dashboard Engine
   Version : 1.0.0
========================================================== */

"use strict";

/* ==========================================================
   DASHBOARD
========================================================== */

const Dashboard = {

    stats: {

        totalStudents: 0,

        todayAttendance: 0,

        monthlyCollection: 0,

        pendingFees: 0,

        present: 0,

        absent: 0

    },

    init() {

        this.loadStats();

        this.renderStats();

        this.loadActivity();

        this.loadNotices();

        this.renderSummary();

    },

/* ==========================================================
   LOAD STATS
========================================================== */

    loadStats() {

        // Firebase / Storage integration later

        this.stats.totalStudents = 0;

        this.stats.todayAttendance = 0;

        this.stats.monthlyCollection = 0;

        this.stats.pendingFees = 0;

        this.stats.present = 0;

        this.stats.absent = 0;

    },

/* ==========================================================
   RENDER STATISTICS
========================================================== */

    renderStats() {

        this.setText(

            "totalStudents",

            this.stats.totalStudents

        );

        this.setText(

            "todayAttendance",

            this.stats.todayAttendance + "%"

        );

        this.setText(

            "monthlyCollection",

            "₹" + this.stats.monthlyCollection

        );

        this.setText(

            "pendingFees",

            "₹" + this.stats.pendingFees

        );

    },

/* ==========================================================
   SUMMARY
========================================================== */

    renderSummary() {

        this.setText(

            "presentCount",

            this.stats.present

        );

        this.setText(

            "absentCount",

            this.stats.absent

        );

        this.setText(

            "feePaidCount",

            "₹" + this.stats.monthlyCollection

        );

    },

/* ==========================================================
   RECENT ACTIVITY
========================================================== */

    loadActivity() {

        const list = document.getElementById(

            "activityList"

        );

        if (!list) return;

        list.innerHTML = `

<div class="activity-item">

<div class="activity-icon blue">

<i class="fa-solid fa-circle-check"></i>

</div>

<div>

<h4>System Ready</h4>

<p>

Dashboard initialized successfully.

</p>

</div>

</div>

`;

    },

/* ==========================================================
   NOTICE BOARD
========================================================== */

    loadNotices() {

        const board = document.getElementById(

            "noticeBoard"

        );

        if (!board) return;

        board.innerHTML = `

<div class="notice-item">

<span class="notice-badge">

INFO

</span>

<p>

Welcome to EZEE VISION CHAMPUA ERP.

</p>

</div>

`;

    },

/* ==========================================================
   HELPER
========================================================== */

    setText(id, value) {

        const el = document.getElementById(id);

        if (el)

            el.textContent = value;

    }

};

/* ==========================================================
   START DASHBOARD
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        Dashboard.init();

    }

);
