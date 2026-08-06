/* ==========================================================
   EZEE VISION CHAMPUA
   Coaching Management System

   Shared UI & Navigation Controller
   Version: 1.0.0
========================================================== */

"use strict";


/* ==========================================================
   UI CONTROLLER
========================================================== */

const UI = {

    /* ------------------------------------------------------
       ROUTES

       IMPORTANT:
       Future pages add karne par unka route yahin manage hoga.
    ------------------------------------------------------ */

    routes: {

        dashboard: "index.html",

        students: "students.html",

        attendance: "attendance.html",

        fees: "fees.html",

        reports: "reports.html",

        settings: "settings.html"

    },


    /* ------------------------------------------------------
       INITIALIZATION
    ------------------------------------------------------ */

    init() {

        this.bindNavigation();

        this.bindQuickActions();

        this.setActiveNavigation();

        this.setupKeyboardSupport();

        this.handlePageRestore();

    },


    /* ======================================================
       BOTTOM NAVIGATION
    ====================================================== */

    bindNavigation() {

        const navigationItems =
            document.querySelectorAll(".nav-item[data-page]");


        if (!navigationItems.length) {

            return;

        }


        navigationItems.forEach((item) => {

            item.addEventListener("click", () => {

                const page = item.dataset.page;

                this.navigate(page);

            });

        });

    },


    /* ======================================================
       QUICK ACTIONS
    ====================================================== */

    bindQuickActions() {

        const quickActions =
            document.querySelectorAll("[data-action]");


        if (!quickActions.length) {

            return;

        }


        quickActions.forEach((button) => {

            button.addEventListener("click", () => {

                const action = button.dataset.action;

                this.handleAction(action);

            });

        });

    },


    /* ======================================================
       ACTION HANDLER
    ====================================================== */

    handleAction(action) {

        switch (action) {

            case "students":

                /*
                   Dashboard ke "Add Student" button se
                   Students page open hoga.

                   Query parameter future Students module ko
                   batayega ki Add Student form automatically
                   open karna hai.
                */

                window.location.href =
                    "students.html?action=add";

                break;


            case "attendance":

                this.navigate("attendance");

                break;


            case "fees":

                this.navigate("fees");

                break;


            case "reports":

                this.navigate("reports");

                break;


            case "settings":

                this.navigate("settings");

                break;


            default:

                console.warn(
                    `[EZEE UI] Unknown action: ${action}`
                );

        }

    },


    /* ======================================================
       PAGE ROUTER
    ====================================================== */

    navigate(page) {

        if (!page) {

            return;

        }


        const route = this.routes[page];


        if (!route) {

            console.warn(
                `[EZEE UI] Route not found: ${page}`
            );

            return;

        }


        /*
           Same page ko unnecessarily reload nahi karenge.
        */

        const currentFile =
            this.getCurrentPageFile();


        const targetFile =
            route.split("?")[0];


        if (currentFile === targetFile) {

            return;

        }


        window.location.href = route;

    },


    /* ======================================================
       CURRENT PAGE
    ====================================================== */

    getCurrentPageFile() {

        const path =
            window.location.pathname;


        let file =
            path.substring(
                path.lastIndexOf("/") + 1
            );


        /*
           GitHub Pages root URL par pathname kabhi
           blank/end slash ho sakta hai.

           Us situation me Dashboard active rahega.
        */

        if (!file) {

            file = "index.html";

        }


        return file;

    },


    /* ======================================================
       ACTIVE NAVIGATION
    ====================================================== */

    setActiveNavigation() {

        const items =
            document.querySelectorAll(".nav-item[data-page]");


        if (!items.length) {

            return;

        }


        const currentPage =
            this.getCurrentPageFile();


        const pageMap = {

            "index.html": "dashboard",

            "students.html": "students",

            "attendance.html": "attendance",

            "fees.html": "fees",

            "reports.html": "reports",

            "settings.html": "settings"

        };


        const activePage =
            pageMap[currentPage] || "dashboard";


        items.forEach((item) => {

            const isActive =
                item.dataset.page === activePage;


            item.classList.toggle(
                "active",
                isActive
            );


            /*
               Accessibility
            */

            if (isActive) {

                item.setAttribute(
                    "aria-current",
                    "page"
                );

            } else {

                item.removeAttribute(
                    "aria-current"
                );

            }

        });

    },


    /* ======================================================
       KEYBOARD ACCESSIBILITY
    ====================================================== */

    setupKeyboardSupport() {

        const interactiveElements =
            document.querySelectorAll(
                ".nav-item, .quick-card"
            );


        interactiveElements.forEach((element) => {

            element.addEventListener(
                "keydown",
                (event) => {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        /*
                           Native button already keyboard
                           accessible hai.

                           Ye fallback future custom elements
                           ke liye rakha gaya hai.
                        */

                        if (
                            element.tagName !== "BUTTON"
                        ) {

                            event.preventDefault();

                            element.click();

                        }

                    }

                }
            );

        });

    },


    /* ======================================================
       PAGE RESTORE
    ====================================================== */

    handlePageRestore() {

        /*
           Mobile browsers Back/Forward Cache (bfcache)
           use kar sakte hain.

           Back button ke baad active navigation ko
           dobara verify karenge.
        */

        window.addEventListener(
            "pageshow",
            () => {

                this.setActiveNavigation();

            }
        );

    },


    /* ======================================================
       HELPER — OPEN STUDENTS
    ====================================================== */

    openStudents() {

        this.navigate("students");

    },


    /* ======================================================
       HELPER — ADD STUDENT
    ====================================================== */

    addStudent() {

        window.location.href =
            "students.html?action=add";

    },


    /* ======================================================
       HELPER — ATTENDANCE
    ====================================================== */

    openAttendance() {

        this.navigate("attendance");

    },


    /* ======================================================
       HELPER — FEES
    ====================================================== */

    openFees() {

        this.navigate("fees");

    },


    /* ======================================================
       HELPER — REPORTS
    ====================================================== */

    openReports() {

        this.navigate("reports");

    }

};


/* ==========================================================
   START UI
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        UI.init();

    }
);
