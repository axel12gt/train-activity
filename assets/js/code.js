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
  var first = 0
  var freq = ""

  var firstTimeConverted = moment(first, "HH:mm").subtract(1, "years");
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % freq;
  var tMinutesTillTrain = freq - tRemainder;
  var minutesAway = moment().add(tMinutesTillTrain, "minutes");

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
      dataRef.ref().on("child_added", function(childSnapshot) {
        $("tbody").append("<tr><td> " +
        childSnapshot.val().name +
        " </td><td> " + childSnapshot.val().dest +
        " </td><td class='member-age'> " + childSnapshot.val().first +
        " </td><td class='member-comment'> " + childSnapshot.val().freq +
        " </td>"+"<td>"+ minutesAway +"</td>"+"</tr>");
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

  setInterval(() => { elements.display()
    
  }, 15000);
