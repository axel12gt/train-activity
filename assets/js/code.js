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

  var minutesAway
  var dataRef = firebase.database()

  var name = ""
  var dest = ""
  var first = 0
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

  // dataRef.ref().on("child_added", function(childSnapshot){
  //   elements.display()
  // })

  // name = $("#train")
  // dest = $("#dest")
  // first = $("#first")
  // freq = $("#freq")

  // console.log(name.value)

  // //creates a new table row element
  // var tRow= $("<tr>")

  // //creates table cells for the table
  // var nameTd = $("<td>").text(name)
  // var destTd  = $("<td>").text(dest)
  // var firstTd = $("<td>").text(first)
  // var freqTd = $("<td>").text(freq)

  // // tRow.append(nameTd,destTd,firstTd,freqTd)