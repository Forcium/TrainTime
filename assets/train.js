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
  var firstArrival = parseInt($("#arrivalInput").val().trim());
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


});

  //firebase event for adding the train values upon user entry
  database.ref().on("child_added", function(snapshot) {

    // create variable for snapshots, getting ready for pulling from database
    var trainName = snapshot.val().name;
    var destination = snapshot.val().place;
    var initialTrain = snapshot.val().firstTrain;
    var freq = snapshot.val().frequencyOf;

    var firstTrainTime = moment(initialTrain, "HH:mm");
    var current = moment().format("HH:mm");
    var difference = moment().diff(moment(firstTrainTime), "minutes");
    var timeRemaining = difference % freq;
    var untilNextTrain = freq - timeRemaining;

    var trainNext = moment().add(untilNextTrain, "minutes").format("HH:mm");


    $("#trainBody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + trainNext + "</td><td>" + freq + "</td><td>" + untilNextTrain + "</td></tr>");
  });
