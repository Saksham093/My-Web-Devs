document.addEventListener('DOMContentLoaded', function () {
    const selectedSeat = sessionStorage.getItem('selectedSeat');
    console.log('Seat selected:', selectedSeat);
    // You can also display this seat ID somewhere on your payment page
});


function confirmPayment() {
    const mailId = document.getElementById('mail_id').value;
    const referenceNo = parseInt(document.getElementById('reference_no').value, 10);
    const selectedSeat = sessionStorage.getItem('selectedSeat');  // Using sessionStorage directly

    if (!Number.isInteger(referenceNo)) {
        alert('Reference number can\'t be blank: must be an integer');
        return;
    }

    fetch('https://movie-production.up.railway.app/save-payment', {  // Assuming you're consolidating to this single endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seat_id: selectedSeat, mail_id: mailId, reference_no: referenceNo, time_stamp: new Date().toISOString() })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Make sure to return the JSON-parsed response
        })
        .then(data => {
            console.log('Success:', data.message);
            document.getElementById('modalText').innerText = data.message;  // Set the text of the modal
            var modal = document.getElementById("myModal");
            var span = document.getElementsByClassName("close")[0];

            modal.style.display = "block";  // Show the modal

            // When the user clicks on <span> (x), close the modal and redirect
            span.onclick = function () {
                modal.style.display = "none";
                window.location.href = '/index.html';  // Redirect after closing the modal

                // Assuming seat details are stored or can be retrieved from session storage
                const selectedSeatId = sessionStorage.getItem('selectedSeat'); // e.g., "H5"
                const row = selectedSeatId.substring(0, 1); // "H"
                const seatNo = parseInt(selectedSeatId.substring(1)); // 5

                // Now save the booked seat
                return saveBookedSeat(row, seatNo);
            }

            // When the user clicks anywhere outside of the modal, close it and redirect
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                    window.location.href = '/index.html';

                    // Assuming seat details are stored or can be retrieved from session storage
                    const selectedSeatId = sessionStorage.getItem('selectedSeat'); // e.g., "H5"
                    const row = selectedSeatId.substring(0, 1); // "H"
                    const seatNo = parseInt(selectedSeatId.substring(1)); // 5

                    // Now save the booked seat
                    return saveBookedSeat(row, seatNo);
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to save data (Check your internet or your data) : ' + error.message);
        });
}


// Get the number input element
const numberInput = document.getElementById('reference_no');

// Disable the spin box functionality
numberInput.addEventListener('wheel', (event) => {
    event.preventDefault();
});

numberInput.addEventListener('keydown', (event) => {
    // Prevent the up and down arrow keys from changing the value
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
    }
});


function savePaymentData(seat_id, mail_id, reference_no) {
    const time_stamp = new Date().toISOString(); // Format time as ISO string
    fetch('https://movie-production.up.railway.app/save-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seat_id, mail_id, reference_no, time_stamp })
    })
        .then(response => response.text())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function ensureConnectedAndQuery(req, res) {
    if (connection.state === 'disconnected') {
        connection.connect(err => {
            if (err) {
                console.error('Failed to reconnect:', err);
                res.status(500).send('Database connection failed');
                return;
            }
            executeQuery(req, res);
        });
    } else {
        executeQuery(req, res);
    }
}

function executeQuery(req, res) {
    const { seat_id, mail_id, reference_no, time_stamp } = req.body;
    const query = 'INSERT INTO payments (seat_id, mail_id, reference_no, time_stamp) VALUES (?, ?, ?, ?)';
    connection.query(query, [seat_id, mail_id, reference_no, time_stamp], (err, results) => {
        if (err) {
            console.error('Error in saving to database:', err);
            res.status(500).send('Error in saving data');
            return;
        }
        res.json({ 
            message: 'Thank you for confirmation! Your movie ticket will be shared via email within 24 hours. For assistance, please contact us on WhatsApp: <a href="https://wa.me/919656709933?text=Hello!%20I%20need%20help." target="_blank">WhatsApp Support</a>.' 
        });
        

    });
}

app.post('https://movie-production.up.railway.app/save-payment', ensureConnectedAndQuery);


function saveBookedSeat(row, seatNo) {
    console.log('Row:', row); // Check if 'row' is a string
    console.log('Seat Number:', seatNo); // Check the seat number type and value

    return fetch('https://movie-production.up.railway.app/save-seat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ row: row, seatNo: seatNo })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to save the seat');
        }
        return response.text();  // Assuming the server responds with plain text
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to save seat. Please try again.');
        throw error;  // Re-throw to handle it in subsequent chains
    });
}
