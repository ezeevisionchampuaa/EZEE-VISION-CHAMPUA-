/* ==========================================================
   EZEE VISION CHAMPUA
   UI Engine
   Version : 1.0.0
========================================================== */

"use strict";

/* ==========================================================
   UI
========================================================== */

const UI = {

    init() {

        this.initTheme();

        this.bindThemeButton();

    },

/* ==========================================================
   THEME
========================================================== */

    initTheme() {

        const theme =
            localStorage.getItem("ez_theme") || "dark";

        document.body.dataset.theme = theme;

        this.updateThemeIcon(theme);

    },

    bindThemeButton() {

        const btn =
            document.getElementById("themeBtn");

        if (!btn) return;

        btn.addEventListener("click", () => {

            this.toggleTheme();

        });

    },

    toggleTheme() {

        const current =
            document.body.dataset.theme;

        const next =
            current === "dark"
            ? "light"
            : "dark";

        document.body.dataset.theme = next;

        localStorage.setItem(
            "ez_theme",
            next
        );

        this.updateThemeIcon(next);

        this.toast(

            `Theme changed to ${next}`,

            "success"

        );

    },

    updateThemeIcon(theme) {

        const icon =
            document.querySelector("#themeBtn i");

        if (!icon) return;

        icon.className =
            theme === "dark"

            ? "fa-solid fa-sun"

            : "fa-solid fa-moon";

    },

/* ==========================================================
   TOAST
========================================================== */

    toast(message,type="info") {

        let toast =
            document.getElementById("toast");

        if(!toast){

            toast=document.createElement("div");

            toast.id="toast";

            document.body.appendChild(toast);

        }

        toast.className=`toast ${type}`;

        toast.textContent=message;

        toast.classList.add("show");

        setTimeout(()=>{

            toast.classList.remove("show");

        },2500);

    },

/* ==========================================================
   LOADER
========================================================== */

    showLoader(){

        document.body.classList.add("loading");

    },

    hideLoader(){

        document.body.classList.remove("loading");

    }

};

/* ==========================================================
   START UI
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        UI.init();

    }

);
