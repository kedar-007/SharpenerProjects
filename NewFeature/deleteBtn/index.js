function bookAppointment() {
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  if (name && date && time) {
    const appointment = {
      name: name,
      date: date,
      time: time
    };

    // Get existing appointments from local storage
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    // Add the new appointment
    appointments.push(appointment);

    // Save the updated appointments to local storage
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Update the UI
    displayAppointments();
    
    // Clear the form
    document.getElementById('appointmentForm').reset();
  } else {
    alert('Please fill in all fields');
  }
}

function deleteAppointment(index) {
  // Get existing appointments from local storage
  let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  // Remove the appointment at the specified index
  appointments.splice(index, 1);

  // Save the updated appointments to local storage
  localStorage.setItem('appointments', JSON.stringify(appointments));

  // Update the UI
  displayAppointments();
}

function displayAppointments() {
  const appointmentsList = document.getElementById('appointmentsList');
  appointmentsList.innerHTML = '';

  // Get appointments from local storage
  const storedAppointments = localStorage.getItem('appointments');
  const appointments = storedAppointments ? JSON.parse(storedAppointments) : [];

  // Display each appointment in the list
  appointments.forEach((appointment, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${appointment.name} - ${appointment.date} at ${appointment.time}`;
    
    // Add a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
      deleteAppointment(index);
    };

    listItem.appendChild(deleteButton);
    appointmentsList.appendChild(listItem);
  });
}

// Display existing appointments on page load
displayAppointments();