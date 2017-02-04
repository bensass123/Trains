 
 // Initialize Firebase

 console.log('init');

 
 var config = {
     apiKey: "AIzaSyCqi-A-bacfyoK6KUFY3YE65fah65iyUrc",
     authDomain: "trains-8118b.firebaseapp.com",
     databaseURL: "https://trains-8118b.firebaseio.com",
     storageBucket: "trains-8118b.appspot.com",
     messagingSenderId: "52498190691"
 };

 firebase.initializeApp(config);




 var database = firebase.database();

 var trains = database.ref('trains/');

 var provider = new firebase.auth.GoogleAuthProvider();

 //authentication 
 $(function(){ firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
 });
});



 // 2. Button for adding train
 $("#add-train").on("click", function(event) {
     event.preventDefault();

     // Grabs user input
     var name = $("#name").val().trim();
     var dest = $("#dest").val().trim();
     var time1 = $("#time1").val().trim();
     var freq = $("#freq").val().trim();


     // Creates local "temporary" object for holding train data
     var newTrain = {
         name: name,
         dest: dest,
         time1: moment(time1, 'hhmm').toISOString(),
         freq: freq
     };

     // Uploads train data to the database
     database.ref().push(newTrain);


     // Alert
     alert("Train successfully added");

     // Clears all of the text-boxes
     $("#name").val("");
     $("#dest").val("");
     $("#freq").val("");
     $("#time1").val("");



     // Prevents moving to new page
     return false;
 });

 database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var name = childSnapshot.val().name;
  var dest = childSnapshot.val().dest;
  var time1 = childSnapshot.val().time1;
  var freq = childSnapshot.val().freq;

  // Employee Info
  console.log(name);
  console.log(dest);
  console.log(time1);
  console.log(freq);

    //grabbing current time
    var currentTime = moment();
    var difference = currentTime.diff(moment(time1), 'minutes');
    var minsAway = freq - Math.abs(difference % freq);
    var nextArrival = currentTime.add(minsAway, 'minutes');
    nextArrival = moment(nextArrival).format('HH:mm');


  // Add each train's data into the table
  $("#train-table").append("<tr><td>" + name + "</td><td>" + dest + "</td><td>" +
  freq + "</td><td>" + nextArrival + "</td><td>" + minsAway + '<td></td>');
});
