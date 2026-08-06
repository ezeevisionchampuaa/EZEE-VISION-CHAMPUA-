function backupData(){

const data=localStorage.getItem("students")||"[]";

const blob=new Blob([data],{type:"application/json"});

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="EZEE_VISION_Backup.json";

a.click();

}

function aboutApp(){

alert(

"EZEE VISION ERP\n\nVersion : 4.0\nDeveloped for Coaching Management."

);

}

function toggleTheme(){

alert("Dark Mode Version 5.0 me aayega.");

}
