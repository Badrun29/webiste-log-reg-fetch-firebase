// Set new default font family and font color to mimic Bootstrap's default styling


// Area Chart Example
var ctx = document.getElementById("myAreaChart");


// Initialize an empty data array
var data = [];

// Create a new chart
var ctx = document.getElementById('myAreaChart').getContext('2d');
var chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Real-Time Data',
      data: data,
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
          text: 'Value'
        }
      }
    }
  }
});


function generateDataPoint() {
  var randomValue = Math.floor(Math.random() * 1200) + 1;
  var timestamp = new Date().toLocaleTimeString();

  // Add the new data point to the chart
  chart.data.labels.push(timestamp);
  chart.data.datasets[0].data.push(randomValue);

  // Limit the number of data points displayed to 10
  if (chart.data.labels.length > 100) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }

  // Update the chart
  chart.update();
}

// Generate a new data point every second
setInterval(generateDataPoint, 1000);

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
