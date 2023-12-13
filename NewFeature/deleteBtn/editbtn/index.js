let editingIndex = -1;

    function bookAppointment() {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;

      if (name && email && date && time) {
        const appointment = {
          name: name,
          email: email,
          date: date,
          time: time
        };

        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

        if (editingIndex !== -1) {
          appointments[editingIndex] = appointment;
          editingIndex = -1;
        } else {
          appointments.push(appointment);
        }

        localStorage.setItem('appointments', JSON.stringify(appointments));
        displayAppointments();
        document.getElementById('appointmentForm').reset();
      } else {
        alert('Please fill in all fields');
      }
    }

    function deleteAppointment(index) {
      let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
      appointments.splice(index, 1);
      localStorage.setItem('appointments', JSON.stringify(appointments));
      displayAppointments();
    }

    function editAppointment(index) {
      let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
      const appointment = appointments[index];

      document.getElementById('name').value = appointment.name;
      document.getElementById('email').value = appointment.email;
      document.getElementById('date').value = appointment.date;
      document.getElementById('time').value = appointment.time;

      editingIndex = index;
    }

    function displayAppointments() {
      const appointmentsList = document.getElementById('appointmentsList');
      appointmentsList.innerHTML = '';

      let storedAppointments = localStorage.getItem('appointments');
      let appointments = storedAppointments ? JSON.parse(storedAppointments) : [];

      appointments.forEach((appointment, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Name: ${appointment.name}, Email: ${appointment.email}, Date: ${appointment.date} at ${appointment.time}`;
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function () {
          editAppointment(index);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
          deleteAppointment(index);
        };

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        appointmentsList.appendChild(listItem);
      });
    }

    displayAppointments();