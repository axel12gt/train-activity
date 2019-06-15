  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCXN6C6aX8zPkVf7eNdrpREwsicT9K4Cek",
    authDomain: "train-activity-976f2.firebaseapp.com",
    databaseURL: "https://train-activity-976f2.firebaseio.com",
    projectId: "train-activity-976f2",
    storageBucket: "train-activity-976f2.appspot.com",
    messagingSenderId: "716338364140",
    appId: "1:716338364140:web:a12b1f8b4c3fffb2"
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  // sets dataRef variable to firebase.database()
  var dataRef = firebase.database()

  // names and initializes variables required for the application
  var name = ""
  var dest = ""
  var first = ""
  var freq = ""


  //my objects 
  var elements = {
    //gets values from form
    createRow: function () {

      //Gets the values from the form
      name = $("#train").val().trim()
      dest = $("#dest").val().trim()
      first = $("#first").val().trim()
      freq = $("#freq").val().trim()

    },
    //pushes info from input to database
    ref: function () {
      
        //database magic that pushes an object to an object
      dataRef.ref().push({
        //train name from form to database obj
        name: name,
        //destination from form to database obj
        dest: dest,
        //first train from form to database obj
        first: first,
        //frequency from form to database obj
        freq: freq,
        //not really sure why I put this here
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      })},
      //method that calls firebase and displays to screen
    display: function(){
      //empties table body contents before appending to prevent duplication
      $("tbody").empty()
        //accesses firebase to display to page
        dataRef.ref().on("child_added", function(childSnapshot) {
          // sets up calculations to work
          var firstTimeConverted = moment(childSnapshot.val().first, "HH:mm").subtract(1, "years");
          // difference of now and firstTimeConverted
          var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          // modulus of calculations
          var tRemainder = diffTime % childSnapshot.val().freq;
          // minutes till the next train
          var tMinutesTillTrain = childSnapshot.val().freq - tRemainder;
          // time of next train HH:mm
          var minutesAway = moment().add(tMinutesTillTrain, "minutes");
          
          //calls back firebase values and appends to table
          $("tbody").append("<tr><td> " +
          childSnapshot.val().name +
          " </td><td> " + childSnapshot.val().dest +
          " </td><td> " + childSnapshot.val().freq +
          " </td><td> " + childSnapshot.val().first +
          " </td><td> " + moment(minutesAway).format("hh:mm") +
          " </td><td> " + moment(tMinutesTillTrain) + "</td></tr>");
        })
      

    }
  }
// does a lot of stuff
  $("button").on("click", function(event){
    // prevents the page from refreshing
    event.preventDefault()
    // doesn't create rows but adds information from the form to temp variables
    elements.createRow()
    // adds the variables to the firebase as a child element
    elements.ref()
    // calls the firebase database and returns the values
    elements.display()
  })
  // calls the display function to pull info from the firebase
  elements.display()
  // refreshes the display every 15 seconds
  setInterval(() => { elements.display()
    
  }, 15000);
