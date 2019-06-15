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

  var dataRef = firebase.database()

  var name = ""
  var dest = ""
  var first = ""
  var freq = ""



  var elements = {
    createRow: function () {

      //Gets the values from the form
      name = $("#train").val().trim()
      dest = $("#dest").val().trim()
      first = $("#first").val().trim()
      freq = $("#freq").val().trim()

      console.log(name, dest, first, freq)
    },

    ref: function () {
      console.log("isworking")
      dataRef.ref().push({
        name: name,
        dest: dest,
        first: first,
        freq: freq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      })},

    display: function(){

      $("tbody").empty()
        dataRef.ref().on("child_added", function(childSnapshot) {
          var firstTimeConverted = moment(childSnapshot.val().first, "HH:mm").subtract(1, "years");
          // console.log(moment(firstTimeConverted),"HH:mm")
          var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          console.log(diffTime)
          var tRemainder = diffTime % childSnapshot.val().freq;
          console.log(tRemainder)
          var tMinutesTillTrain = childSnapshot.val().freq - tRemainder;
          console.log(tMinutesTillTrain)
          var minutesAway = moment().add(tMinutesTillTrain, "minutes");
          console.log(moment(minutesAway).format("hh:mm"))
          
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

  $("button").on("click", function(event){
    console.log("is working")
    event.preventDefault()
    elements.createRow()
    elements.ref()
    elements.display()
  })

  elements.display()
  
