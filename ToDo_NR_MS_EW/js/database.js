/**
 * Hier wird die Verbindung und die Kommunikation zur Datenbank programmiert. Hier sollten nur Code entstehen
 * die direkt was mit der Datenbank zu tun hat. Zum Beispiel: Daten von der Datenbank holen und diese an 
 * controller.js zurück returnen oder man bekommt über Funktionsvariabel 
 * [ beispiel: function insertUser(username, age,...) ] die Werte und schreibt nur mehr die Push Funktion
 * Es wird klar differenziert welches File welche Arbeit macht, um die Aufgaben besser zu verteilen.
 * Das hat den Vorteil, wenn man zum Beispiel die Daten returnen und nicht gleich ins HTML injecten, dass 
 * man sich auf eine JSON Notation eingit und jeder kann Funktionen ändern, aber jeder bekommt einen ähnlichen
 * JSON.
 * 
 * Welche Funktionen werde wir grob brauchen:
 * -Get all Task
 * -Get Task by UserID
 * -Get all User (for Login)
 * -Delete Task by UserID & TaskID
 * -Update Task by UserID & TaskID
 * -Insert new User
 * -Insert new Task
 * -mehr fallen mir auf die schnelle nicht ein
 */

// Initialisierung der Datenbank. Hier wird der Hauptdatenbank angesprochen.
var db = firebase.database().ref();
var userdb = firebase.database().ref().child("users");
var taskdb = {}



let users =[];
let keysFromUsers = [];



function keyForLogin(email,password){
    let keys = [];
    let loginErfolgreich = false;
    userdb.on('value', (snap) => {
        keys = Object.keys(snap.val());
    });

    keys.forEach((val) => {
        if(checkUserforLogin(val,email,password)){
            localStorage.setItem("schlüssel", val);
            loginErfolgreich = true;
            taskdb = userdb.child(val);
        }
    });
    return loginErfolgreich;
}

function checkUserforLogin(key,email,password){
    let value;
    let erfolgreich = false;
    userdb.child(key).on('value',snap=>{
        value = snap.val();
        
    });
    if(value.email == email && value.password == password){
        erfolgreich = true;
    }
    return erfolgreich;
}

function keyForRegister(user){
    let keys = [];
    let registerErfolgreich = false
    let schlüssel = null;
    userdb.on('value', (snap) => {
        keys = Object.keys(snap.val());
    });

    keys.forEach((val) => {
        schlüssel =  checkUserforRegister(val,user)
        
    })
    if(schlüssel) {
        userdb.push(user);
        localStorage.setItem("schlüssel", schlüssel);
        registerErfolgreich = true;
        taskdb = userdb.child(schlüssel)
        window.location = "index.html";
    }else{
        alert("Die E-Mail Adresse wurde schon verwendet");
    }
    return registerErfolgreich;
}

function checkUserforRegister(key,user){
    let registerOkay = key;
    let dbUser = {}
    userdb.child(key).on('value',snap=>{
        dbUser = snap.val();
        
    });
    if(user.email == dbUser.email){
        registerOkay = null;
    }
    return registerOkay;
}
function getUserByKey(key){
    let user = {}
    userdb.child(key).on('value',snap => {
        //datenAnzeigen(snap.val());
        
    })

}

function getData(){
    userdb.child(localStorage.getItem("schlüssel")).on('child_added', snap => {
        let item=snap.val();
        if(typeof(item) != "string"){
            makeHtml(item.taskDescription, item.taskTitle, item.until, snap.key);
        }
  });
}

function saveTask(){
    let taskTitle=document.getElementById("taskTitle").value;
    let taskDescription=document.getElementById("taskDescription").value;
    let until=document.getElementById("until").value;
    let task={taskTitle:taskTitle, taskDescription:taskDescription, until:until};
    taskdb = userdb.child(localStorage.getItem("schlüssel"));
    taskdb.push(task);
    window.location = "index.html"
    
}

//Löschen
db.on('child_removed', snap=>{
   document.getElementById(snap.key).remove(); 
});

function deleteTask(key){
    taskdb = userdb.child(localStorage.getItem("schlüssel"));
    taskdb.child(key).remove();
}


function getTaskByKey(key){
    taskdb = userdb.child(localStorage.getItem("schlüssel"));   
    taskdb.child(key).on('value',snap=>{
        let item = snap.val();
        document.getElementById("taskTitle").value = item.taskTitle
        document.getElementById("taskDescription").value = item.taskDescription
        document.getElementById("until").value = item.until
    });
}



function updateTaskByKey(key,taskTitle,taskDescription,until){
    let task={taskTitle:taskTitle, taskDescription:taskDescription, until:until};
    userdb.child(localStorage.getItem("schlüssel")).child(key).set(task)
}