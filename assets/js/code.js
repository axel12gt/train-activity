  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCXN6C6aX8zPkVf7eNdrpREwsicT9K4Cek",
    authDomain: "train-activity-976f2.firebaseapp.com",
    databaseURL: "https://train-activity-976f2.firebaseio.com",
    projectId: "train-activity-976f2",
    storageBucket: "train-activity-976f2.appspot.com",
    messagingSenderId: "716338364140",
    appId: "1:716338364140:web:a12b1f8b4c3fffb2"
  };
  // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);

var elements = {
    createRow: function(){
        name = $("#train")
        dest = $("#dest")
        first = $("#first")
        freq = $("#freq")

        console.log(name,dest,first,freq)
        //creates a new table row element
        var tRow= $("<tr>")

        //creates table cells for the table
        var nameTd = $("<td>").text(name)
        var destTd  = $("<td>").text(dest)
        var firstTd = $("<td>").text(first)
        var freqTd = $("<td>").text(freq)

        // tRow.append(nameTd,destTd,firstTd,freqTd)
    }
}

name = $("#train")
dest = $("#dest")
first = $("#first")
freq = $("#freq")

console.log(name.value)