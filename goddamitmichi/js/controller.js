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

//Zurück zur Hauptseite wechseln


//
