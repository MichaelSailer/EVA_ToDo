/**
 * Der Controller wird dafür verwendet, um die Kommunikation zwischen den Seiten. Also von einer Seite von 
 * der anderen Seite wechseln. Hier könnte man auch den Zwischenspeicher initialisieren und manche Daten 
 * Zwischenspeichern. Würde hier auch gleich Sachen kontrollieren, also im File database.js sollten Funktionen
 * zu Verfügung stehen und hier sollte man die Funktionen aufrufen und diese verwenden. 
 * 
 * Grund dafür ist, dass man reintheoretisch die Datenbank später in einen anderen Projekt auch verwenden
 * möchte und somit nur mehr die Funktionen aufrufen und können, dann diese Daten für ein andere Webseite 
 * machen. Also Funktionen in database.js programmieren und dann mittels return, dann die Daten an controller.js
 * zurücksenden.
 *  
 */

 //Funktionen:

 // Wechseln zur Seiten, um neuen Task anzulegen
function addNewJob(){
    window.location= "newTask.html";
}
//Für Register und Login. Bei Enter wird gleich eingeloggt
var input = document.getElementById("password");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("goIn").click();
  }
});

 function checkLogin(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    
    if(keyForLogin(email,password)){
        window.location = "index.html"
    }else{
        alert("Wrong Password or Email adress");
    }
}

 function datenLaden(){
    let key = localStorage.getItem("schlüssel");
    let userInfo =  getUserByKey(key);

}
function goToRegister(){
    window.location = "Register.html";
}
function goToLogin(){
    window.location = "Login.html"

}
function goBack(){
    window.location = "index.html"
}
function signOut(){
    localStorage.removeItem("schlüssel");
    window.location = "Login.html";
}
function saveUser(){
    let firstName=document.getElementById("firstname").value;
    let lastName=document.getElementById("lastname").value;
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;
    let user={firstName:firstName, lastName:lastName, email:email, password:password};
    
    keyForRegister(user);    
}

function updateByKeyID(itemKey){
    localStorage.setItem("updateItem",itemKey);
    window.location = "updateTask.html";
}

function makeHtml(description, title, until, schlüssel){
    let htmlString =  '<button onclick=updateByKeyID("'+schlüssel+'") class="list-group-item list-group-item-action bg-secondary">'
    htmlString += '<div class="d-flex w-100 justify-content-between">'
    htmlString += '<h5 class="mb-3 text-light">'+title+'</h5>'
    htmlString += '<small class="text-white" >Until: '+until+'</small></div>'
    
    htmlString += '<p class="mb-1 text-white">'+description+'</p>'
    htmlString += '</button>'

    document.getElementById("toDoListe").innerHTML += htmlString;
}

function loadData(){
    let key = localStorage.getItem("updateItem");
    getTaskByKey(key);

}

function loadIndexSite(){
    getData();
}

function deleteTaskFromUI(){
    deleteTask(localStorage.getItem("updateItem"));
    alert("Congratulation you did a nice Job!");
    window.location = "index.html"    
}

function updateTask(){
    let taskTitle=document.getElementById("taskTitle").value;
    let taskDescription=document.getElementById("taskDescription").value;
    let until=document.getElementById("until").value;
    let key = localStorage.getItem("updateItem")
    updateTaskByKey(key,taskTitle,taskDescription,until);
    window.location = "index.html";
}

/**
 * Funktion 1:
 * LocalStorage.setItem("UpdateSchlüssel",schlüssel)
 * aufruf von Update View
 * 
 * Funktion 2:
 * Sobald geladen (onload)
 * let key = localStorage.getItem("UpdateSchlüssel");
 * db.on('value'snap=>{
 * let item = snap.val();
 * document.getElementById("Name").value = item.gericht;
 * })
 * 
 * Funktion 3: getrigged durch Save Button
 * let gericht = document.getElementById("Name").value
 * 
 * let jsonObject = {gericht: gericht}
 * 
 * db.set(jsonObject);
 */