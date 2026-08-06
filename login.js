const DEFAULT_PIN = "1234";

if(!localStorage.getItem("adminPin")){
    localStorage.setItem("adminPin", DEFAULT_PIN);
}

function login(){

const pin = document.getElementById("pin").value;

const savedPin = localStorage.getItem("adminPin");

if(pin === savedPin){

localStorage.setItem("adminLogin","true");

location.href="settings.html";

}else{

alert("❌ Wrong PIN");

}

}
