 
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

 var provider = new firebase.auth.GoogleAuthProvider();

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
 // 2. Button for adding Employees
 $("#add-train").on("click", function(event) {
     event.preventDefault();

     // Grabs user input
     var name = $("#name").val().trim();
     var dest = $("#dest").val().trim();
     var time1 = moment($("#time1").val().trim(), "DD/MM/YY").format("X");
     var freq = $("#freq").val().trim();

     // Creates local "temporary" object for holding employee data
     var newTrain = {
         name: name,
         dest: dest,
         time1: time1,
         freq: freq
     };

     // Uploads employee data to the database
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
