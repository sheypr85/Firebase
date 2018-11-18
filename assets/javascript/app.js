$(document).ready(function(){
    $('.timepicker').timepicker({twelveHour: false, autoClose: true,});
    
  });
         
  var ct = moment()
  $("#datetime").text(moment(ct).format("HH:mm")) 

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
var frequency = "";

// Capture Button Click
$("#button_submit").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();


    trainName = $("#train_name").val().trim();
    destination = $("#destination_name").val().trim();
    trainStart = $("#start_input").val().trim();
    frequency = $("#frequency_input").val().trim();


    if (!(trainName == '' || destination == '' || trainStart == '' || frequency == '')) {

        var trainInfo = {
            trainName: trainName,
            destination: destination,
            trainStart: trainStart,
            frequency: frequency
        };
    
    
        database.ref().push(trainInfo);
    
    
        $("#train_name").val("");
        $("#destination_name").val("");
        $("#start_input").val("");
        $("#frequency_input").val("");
    
        } else {
         alert("Please Fill All Fields.");
        }
        
       
});

database.ref().on("child_added", function(childSnapshot) {

  
    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().trainStart;
    var frequency = childSnapshot.val().frequency;
  

    var tFrequency = frequency;

    // Time is set by user
    var firstTime = trainStart;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");


    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");



    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(moment(nextTrain).format("HH:mm")),
      $("<td>").text(frequency + " min"),
      $("<td>").text(tMinutesTillTrain  + " min"),
    );
  
    // Append the new row to the table
    $("#table_body").append(newRow);

  });