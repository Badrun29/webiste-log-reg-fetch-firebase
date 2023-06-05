const firebaseConfig = {
    apiKey: "AIzaSyBnkCUlVyOtaz369WUwMbXQK700HMCtw7U",
    authDomain: "moisture-c02cc.firebaseapp.com",
    databaseURL: "https://moisture-c02cc-default-rtdb.firebaseio.com",
    projectId: "moisture-c02cc",
    storageBucket: "moisture-c02cc.appspot.com",
    messagingSenderId: "221486445241",
    appId: "1:221486445241:web:3183330ac6e38bb2b9a168",
  };
  $(document).ready(function(){
	var database = firebase.database();
	var relay;
	database.ref().on("value", function(snap){
		relay = snap.val().relay;
		if(relay == 1){
			document.getElementById("unact").style.display = "none";
			document.getElementById("act").style.display = "block";
		} else {
			document.getElementById("unact").style.display = "block";
			document.getElementById("act").style.display = "none";
		}
	});

	$(".toggle-btn").click(function(){
		var firebaseRef = firebase.database().ref().child("DHT/relay");

		if (relay == 1) {
			firebaseRef.set("0"); // Mengubah nilai 1 menjadi string "0"
			relay = 0;
		  } else {
			firebaseRef.set("1"); // Mengubah nilai 1 menjadi string "1"
			relay = 1;
		  }
	})
});
      

  firebase.initializeApp(firebaseConfig);
  var firebaseRef = firebase.database().ref("DHT");
  firebaseRef.on("value", function (snapshot) {
    snapshot.forEach(function (element) {
      // console.log(element.key);
      document.querySelector("#root").innerHTML = `
            <div>${element.val()}</div>
          `;
    });
  });