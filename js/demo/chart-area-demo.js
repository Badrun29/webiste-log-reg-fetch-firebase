
// Initialize an empty data array
var database = firebase.database().ref().child('DHT/temperature');

var chartDataHistory = [];
var ctx = document.getElementById('gaugeChart').getContext('2d');
var gaugeChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Real-Time Data',
      data: [0, 2000],
      borderColor: '#4e73df',
      fill: false
    }]
  },
  options: {
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Value',
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        ticks: {
          stepSize: 20,
          callback: function(value, index, values) {
            return value + '%';
          }
        },
        grid: {
          display: true,
          color: '#dcdcdc'
        }
      }
    },
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }
    },
    elements: {
      point: {
        radius: 0
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }
});
// Monitor data changes in Firebase
database.on('value', function(snapshot) {
  var value = snapshot.val();
  var data = gaugeChart.data.datasets[0].data;

  // Add new data to the end of the dataset
  data.push(value);
  data.shift(); // Remove the first data point


  // Update the chart
  gaugeChart.update();
});


// Mendapatkan elemen dengan id "time"
var timeElement = document.getElementById('time');

// Fungsi untuk mengupdate waktu secara real-time
function updateTime() {
  // Membuat objek Date untuk mendapatkan waktu saat ini
  var currentTime = new Date();

  // Mendapatkan jam, menit, dan detik dari objek Date
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();

  // Format waktu dengan menambahkan leading zero jika angka kurang dari 10
  var formattedTime = addLeadingZero(hours) + ":" + addLeadingZero(minutes) + ":" + addLeadingZero(seconds);

  // Menampilkan waktu di elemen dengan id "time"
  timeElement.innerHTML = formattedTime;
}

// Fungsi untuk menambahkan leading zero jika angka kurang dari 10
function addLeadingZero(number) {
  return (number < 10 ? "0" : "") + number;
}

// Memanggil fungsi updateTime setiap detik
setInterval(updateTime, 1000);

// Mendapatkan elemen dengan id "date"
var dateElement = document.getElementById('date');

// Fungsi untuk mendapatkan nama hari dalam bahasa Inggris
function getDayName(dayIndex) {
  var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  return days[dayIndex];
}

// Fungsi untuk mendapatkan nama bulan dalam bahasa Inggris
function getMonthName(monthIndex) {
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[monthIndex];
}

// Fungsi untuk mengupdate tanggal secara real-time
function updateDate() {
  // Membuat objek Date untuk mendapatkan tanggal saat ini
  var currentDate = new Date();

  // Mendapatkan hari, bulan, dan tahun dari objek Date
  var day = currentDate.getDay();
  var month = currentDate.getMonth();
  var year = currentDate.getFullYear();

  // Mendapatkan nama hari dan bulan
  var dayName = getDayName(day);
  var monthName = getMonthName(month);

  // Format tanggal
  var formattedDate = dayName + ', ' + monthName + ' ' + year;

  // Menampilkan tanggal di elemen dengan id "date"
  dateElement.innerHTML = formattedDate;
}

// Memanggil fungsi updateDate saat halaman dimuat
updateDate();
