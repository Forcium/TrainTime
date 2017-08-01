// Initialize Firebase
var config = {
    apiKey: "AIzaSyAVwXRnx-oKTbEPYokc6ij7QeI55IKYPtw",
    authDomain: "fir-trainapp-e6616.firebaseapp.com",
    databaseURL: "https://fir-trainapp-e6616.firebaseio.com",
    projectId: "fir-trainapp-e6616",
    storageBucket: "",
    messagingSenderId: "501443964492"
  };
  firebase.initializeApp(config);
var database = firebase.database();

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Adding new trains and schedule
$("#trainSubmitButton").on("click", function() {

  //user input form
  var trainName = $("#trainInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstArrival = $("#arrivalInput").val().trim();
  var frequency = $("#frequencyInput").val().trim();

  //temporary js object for train data
  var newTrain = {
                  name: trainName,
                  place: destination,
                  firstTrain: firstArrival,
                  frequencyOf: frequency
                }

  //new train data upload to firebase
  database.ref().push(newTrain);
        console.log(newTrain.name);
        console.log(newTrain.place);
        console.log(newTrain.firstTrain);
        console.log(newTrain.frequencyOf);
  //clearing all text fields once "okay" button is clicked
  $("#trainInput").val("");
  $("#destinationInput").val("");
  $("#arrivalInput").val("");
  $("#frequencyInput").val("");

  return false;
});
