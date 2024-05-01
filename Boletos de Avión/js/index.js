let reservations = [];

function reserveFlight(date, time, destination) {
    document.getElementById('reservationForm').style.display = 'block';
    document.getElementById('reservationForm').dataset.date = date;
    document.getElementById('reservationForm').dataset.time = time; // Asegúrate de establecer el atributo "time"
    document.getElementById('reservationForm').dataset.destination = destination;
}

function confirmReservation() {
    const cedula = document.getElementById('cedulaInput').value;
    const date = document.getElementById('reservationForm').dataset.date;
    const time = document.getElementById('reservationForm').dataset.time;
    const destination = document.getElementById('reservationForm').dataset.destination;

    // Verificar si la cédula tiene exactamente 8 dígitos
    const cedulaPattern = /^\d{8}$/;
    if (!cedulaPattern.test(cedula)) {
        const errorMessage = document.getElementById('cedulaError');
        errorMessage.innerHTML = 'Por favor, introduce una cédula válida de exactamente 8 dígitos.';
        setTimeout(function () {
            errorMessage.innerHTML = ''; // Limpiar el mensaje después de un tiempo
        }, 3000); // Limpiar después de 3 segundos
        return;
    }

    // Mostrar el spinner y ocultar el botón de reserva
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'inline-block'; // Mostrar el spinner

    // Simular una reserva con un retardo de 2 segundos (para demostración)
    setTimeout(function () {
        reservations.push({ cedula, date, time, destination });
        document.getElementById('reservationForm').style.display = 'none';
        document.getElementById('cedulaInput').value = '';

        // Mostrar mensaje de confirmación arriba del input de consultar vuelos
        const messageContainer = document.getElementById('reservationMessage');
        messageContainer.innerHTML = '<p>Vuelo reservado exitosamente.</p>';
        setTimeout(function () {
            messageContainer.innerHTML = ''; // Limpiar el mensaje después de un tiempo
        }, 3000); // Limpiar después de 3 segundos

        // Limpiar el mensaje de error de cédula si la cédula es válida
        const errorMessage = document.getElementById('cedulaErrorMessage');
        errorMessage.innerHTML = '';

        // Ocultar el spinner
        spinner.style.display = 'none';
    }, 2000); // Simular un retardo de 2 segundos para la reserva (para demostración)
}

function loadReservedFlights() {
    const cedulaInput = document.getElementById('cedulaReservation');
    const cedula = cedulaInput.value.trim(); // Eliminar espacios en blanco al inicio y al final

    // Verificar si la cédula contiene solo números y tiene exactamente 8 caracteres
    const cedulaPattern = /^\d{8}$/;
    if (!cedulaPattern.test(cedula)) {
        const errorMessage2 = document.getElementById('cedulaError2');
        errorMessage2.innerHTML = 'Por favor, introduce una cédula válida de exactamente 8 dígitos.';
        setTimeout(function() {
            errorMessage2.innerHTML = ''; // Limpiar el mensaje después de un tiempo
        }, 3000);
        return; // Salir de la función si la cédula no es válida
    } else {
        const errorMessage = document.getElementById('cedulaError');
        errorMessage.innerHTML = ''; // Limpiar el mensaje de error si la cédula es válida
    }

    const reservedFlightsList = document.getElementById('reservedFlightsList');
    reservedFlightsList.innerHTML = '';

    let foundReservation = false; // Variable para rastrear si se encontraron reservas

    reservations.forEach(reservation => {
        if (reservation.cedula === cedula) {
            foundReservation = true; // Se encontró una reserva para esta cédula
            const listItem = document.createElement('li');
            listItem.textContent = `${reservation.date} - ${reservation.time} - ${reservation.destination}`; // Añadir la hora a la lista
            reservedFlightsList.appendChild(listItem);
        }
    });

    // Mostrar mensaje si no se encontraron reservas para esta cédula
    if (!foundReservation) {
        const noReservationsMessage = document.getElementById('noReservationsMessage');
        noReservationsMessage.innerHTML = 'Esta cédula no tiene vuelos reservados.';
        setTimeout(function() {
            noReservationsMessage.innerHTML = ''; // Limpiar el mensaje después de un tiempo
        }, 3000); // Limpiar después de 3 segundos
    } else {
        const noReservationsMessage = document.getElementById('noReservationsMessage');
        noReservationsMessage.innerHTML = ''; // Limpiar el mensaje si se encontraron reservas
    }
}


