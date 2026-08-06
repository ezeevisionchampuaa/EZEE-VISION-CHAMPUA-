"use strict";

/* ==========================================
   EZEE VISION CHAMPUA
   Shared UI Navigation
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const page = item.dataset.page;

            if (!page) return;

            const routes = {
                dashboard: "index.html",
                students: "students.html",
                attendance: "attendance.html",
                fees: "fees.html",
                reports: "reports.html",
                settings: "settings.html"
            };

            if (routes[page]) {
                window.location.href = routes[page];
            }

        });

    });

});
