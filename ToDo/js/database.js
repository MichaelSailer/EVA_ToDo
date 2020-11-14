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
var userdb = firebase.database().ref().child("users")

//So sollte der JSON aussehen:
let TaskJSON = {
    taskTitle: "TaskTitle",
    taskDescription: "That is what in particularly is.",
    until: "dd-mm-yyyy",
    time: "hh:mm"
}

let userJSON = {
    firstName: "Max",
    lastName: "Mustermann",
    email: "max.mustermann@gmail.com"
}


// Just for Testing, wenn wir starten könne wir diesen Teil löschen:
//---------------------------------------------------------------------------------------------------


// Neuen User einfügen: 
// wird bei Regristrien von neuen User aufgerufen nur mit richtigen JSON Daten
// Funktion newUser (vorname, nachname, email);
//      userdb.push(userJSON);

// alle  User auslesen:

let users =[];
let keysFromUsers = [];

//Holt sich alle Daten aus userdb raus. Daher wir push verwendetet wird für jeden Eintrag ein Key generiert
//und an diesen Schlüssel hängt dann unsere Daten (Name, Email,...)
userdb.on("value", snap => {
    let values = snap.val();
    //Object.keys() holt sich den Schlüssel von den Eintrag
    keysFromUsers = Object.keys(values);
    gethThrougAllUsers()
});


//Diese Funktion geht durch alle Schlüssel durch und schaut in den einzelnen Einträge nach und gibt
//die Daten zu diesen Schlüssel aus.
function getThrougAllUsers(){

    keysFromUsers.forEach(schlüssel => {
        userdb.child(schlüssel).on("value", snap => {
            let values = snap.val();
            console.log(values.email);
        })
    });

}

