const ADMIN_PIN="1234";

function login(){

const pin=document.getElementById("pin").value;

if(pin===ADMIN_PIN){

localStorage.setItem("adminLogin","true");

location.href="settings.html";

}else{

alert("Wrong PIN");

}

}
