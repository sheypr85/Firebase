// Initialize Firebase
var config = {
    apiKey: "AIzaSyAhvJi4evAuqv1zDDnG6MXvG_8q5-h6oWk",
    authDomain: "fir-project-835e2.firebaseapp.com",
    databaseURL: "https://fir-project-835e2.firebaseio.com",
    projectId: "fir-project-835e2",
    storageBucket: "fir-project-835e2.appspot.com",
    messagingSenderId: "843622957433"
};
firebase.initializeApp(config);

var database = firebase.database();

// Initial Values
var trainName = "";
var destination = "";
var trainStart = "";
var trainFrequency = "";

// Capture Button Click
$("#button_submit").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();

    trainName = $("#train_name").val().trim();
    destination = $("#destination_name").val().trim();
    trainStart = $("#start_input").val().trim();
    trainFrequency = $("#frequency_input").val().trim();

    database.ref().set({
        trainName: trainName,
        destination: destination,
        trainStart: trainStart,
        trainFrequency: trainFrequency
    });

});

// Firebase watcher + initial loader HINT: .on("value")
// database.ref().on("value", function(snapshot) {

//   // Log everything that's coming out of snapshot
//   console.log(snapshot.val());
//   console.log(snapshot.val().trainName);
//   console.log(snapshot.val().destination);
//   console.log(snapshot.val().trainStart);
//   console.log(snapshot.val().trainFrequency);

// //   // Change the HTML to reflect
// //   $("#name-display").text(snapshot.val().name);
// //   $("#email-display").text(snapshot.val().email);
// //   $("#age-display").text(snapshot.val().age);
// //   $("#comment-display").text(snapshot.val().comment);

//   // Handle the errors
// }, function(errorObject) {
//   console.log("Errors handled: " + errorObject.code);
// });