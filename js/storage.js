// ===============================
// EZEE VISION Storage Manager
// ===============================

const STORAGE_KEY = "ezee_students";

function getStudents() {

    return JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || [];

}

function saveStudents(data) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}
