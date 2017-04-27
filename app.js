//VARIABLES

//initi firebase
//database as a var
 
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCpFMM5izx4ZJFgBH1fU9oUC_OBiyBSac4",
    authDomain: "codersbay-cfb59.firebaseapp.com",
    databaseURL: "https://codersbay-cfb59.firebaseio.com",
    projectId: "codersbay-cfb59",
    storageBucket: "codersbay-cfb59.appspot.com",
    messagingSenderId: "985966532428"
  };

firebase.initializeApp(config);

var database = firebase.database();


//FUNCTIONS
//click listner fot new train button
$("#newTrain").on("click", function(event){ 
event.preventDefault();

//grab user input
var trainName= $("#name-input").val().trim();
var trainDestination= $("#destination-input").val().trim();
var firstTrain= $("#firstTrain-input").val().trim();
var trainFqy= $("#frequency-input").val().trim();


//local temp obj to hold train data
var newTrain = {
	name: trainName,
	destination: trainDestination,
	start: firstTrain,
	rate: trainFqy
};

//uploads new train to DB
database.ref().push(newTrain);

// Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.rate);

  alert("Train successfully added");

  //clears text boxes
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#firstTrain-input").val("");
  $("#frequency-input").val("");
});



database.ref().on("child_added", 
	function(childSnapshot, prevChildKey) {
		
		console.log(childSnapshot.val());

	var tName = childSnapshot.val().name;
  	var tDestination = childSnapshot.val().destination;
  	var tStart = childSnapshot.val().start;
  	var tRate = childSnapshot.val().rate;

	var tMin;
  	var tHour;
  //train Next Arrival time
  	var nextTrain;
  	//train Min until next Arrival
  	var tMinutesTillTrain;


	 	console.log(tName);
	    console.log(tDestination);
	    console.log(tStart);
	  	console.log(tRate);
	
//formated first train time
	var tStartFtd = moment.unix(tStart).format();

//MATH
var tFrequency = tRate;

    // Time is 3:30 AM
    var firstTime = tStart;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);


    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  // Add each train's data into the table
$("#train-table > tbody").append("<tr><td>" + tName + 
	"</td><td>" + tDestination + 
	"</td><td>" + tRate + 
	"</td><td>" + moment(nextTrain).format("hh:mm") + 
	"</td><td>" + tMinutesTillTrain + "</td></tr>");

//close of childSnapshot
});


 	
  
