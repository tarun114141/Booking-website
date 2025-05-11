document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("bookings-container");
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  
    if (bookings.length === 0) {
      container.innerHTML = "<p>No bookings available.</p>";
      return;
    }
  
    let html = "<table><tr><th>Name</th><th>Room</th><th>Date</th><th>Time</th></tr>";
  
    bookings.forEach(b => {
      html += `<tr>
        <td>${b.name}</td>
        <td>${b.room}</td>
        <td>${b.date}</td>
        <td>${b.time}</td>
      </tr>`;
    });
  
    html += "</table>";
    container.innerHTML = html;
  });
  
  
  // Filter & Delete User Bookings
  document.getElementById("filter-bookings").addEventListener("click", function () {
    const keyword = document.getElementById("my-booking-name").value.trim().toLowerCase();
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const container = document.getElementById("my-bookings-container");
  
    const filtered = bookings.filter(b =>
      b.name.toLowerCase().includes(keyword) || b.room.toLowerCase().includes(keyword)
    );
  
    if (filtered.length === 0) {
      container.innerHTML = "<p>No bookings found for you.</p>";
      return;
    }
  
    let html = "<table><tr><th>Name</th><th>Room</th><th>Date</th><th>Time</th><th>Action</th></tr>";
  
    filtered.forEach((b, index) => {
      html += `<tr>
        <td>${b.name}</td>
        <td>${b.room}</td>
        <td>${b.date}</td>
        <td>${b.time}</td>
        <td><button class="delete-booking" data-index="${index}">Delete</button></td>
      </tr>`;
    });
  
    html += "</table>";
    container.innerHTML = html;
  
    // Delete Functionality
    document.querySelectorAll(".delete-booking").forEach(btn => {
      btn.addEventListener("click", function () {
        const targetIndex = parseInt(this.getAttribute("data-index"));
        const toDelete = filtered[targetIndex];
  
        bookings = bookings.filter(b => {
          return !(b.name === toDelete.name &&
                   b.room === toDelete.room &&
                   b.date === toDelete.date &&
                   b.time === toDelete.time);
        });
  
        localStorage.setItem("bookings", JSON.stringify(bookings));
        document.getElementById("filter-bookings").click();
      });
    });
  });
  
  
  // Check Available Slots
  document.getElementById("check-availability").addEventListener("click", function () {
    const date = document.getElementById("check-date").value;
    if (!date) return alert("Please select a date.");
  
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  
    const allSlots = ["9–10am", "10–11am", "11–12pm", "2–3pm", "3–4pm"];
    const booked = bookings
      .filter(b => b.date === date)
      .map(b => b.time.trim());
  
    const available = allSlots.filter(slot => !booked.includes(slot));
  
    const display = document.getElementById("available-slots");
    if (available.length === 0) {
      display.innerHTML = "<p>No available slots on this date.</p>";
    } else {
      display.innerHTML = "<p>Available slots:</p><ul>" +
        available.map(slot => `<li>${slot}</li>`).join("") +
        "</ul>";
    }
  });
  