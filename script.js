document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("booking-form");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const name = document.getElementById("name").value;
      const room = document.getElementById("room").value;
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;
  
      if (!name || !room || !date || !time) {
        alert("Please fill in all fields.");
        return;
      }
  
      const booking = { name, room, date, time };
      const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  
      bookings.push(booking);
      localStorage.setItem("bookings", JSON.stringify(bookings));
  
      alert("Booking submitted successfully!");
      form.reset();
    });
  });
  