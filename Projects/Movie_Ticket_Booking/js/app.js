
document.addEventListener('DOMContentLoaded', function() {
    // Fetch seat data when the page loads
    fetchSeats();
});

// Hall Image
function showImage() {
    document.getElementById('imageModal').style.display = 'flex';
}

function closeImage() {
    document.getElementById('imageModal').style.display = 'none';
}


// Function to fetch seat data from the server
function fetchSeats() {
    fetch('https://movie-production.up.railway.app/get-seats')
        .then(response => response.json())
        .then(data => {
            addSeats(data.pvr);
        })
        .catch(error => {
            console.error('Error fetching seats:', error);
            alert('Failed to load seat data. Please try again.');
        });
}

// Function to add seats to the page
let addSeats = (arr) => {
    arr.forEach((el, m) => {
        const { series, row_section, seat_counts, sections, price, ...seatArrays } = el;

        // Create Rows and Seats
        series.forEach((serie, index) => {
            let row = document.createElement('div');
            row.className = 'row';

            let booked_seats = seatArrays[serie.toLocaleLowerCase()] || [];

            // Create Seats
            let numberOfSeats = seat_counts[index];
            for (let seats = 0; seats < numberOfSeats; seats++) {

                if (seats === 0) {
                    let span = document.createElement('span');
                    span.innerText = serie;
                    row.appendChild(span);
                }

                let li = document.createElement('li');
                li.className = booked_seats.includes(seats) ? "seat booked" : "seat";
                li.id = `${serie}${seats}`;
                li.setAttribute('data-book', seats);
                li.setAttribute('data-sr', serie);
                li.innerText = seats + 1;

                li.onclick = function () {
                    if (!this.classList.contains('booked')) {
                        let selectedSeats = document.querySelectorAll('.selected');
                        if (selectedSeats.length) {
                            selectedSeats[0].classList.remove('selected');
                        }
                        this.classList.add('selected');
                        document.getElementById('book_ticket').style.display = 'unset';

                        // Store the selected seat in session storage
                        sessionStorage.setItem('selectedSeat', this.id);

                        // Log the selected seat to the console.
                        console.log("Selected seat:", this.id);
                    }
                };

                row.appendChild(li);

                if (seats === numberOfSeats - 1) {
                    let span = document.createElement('span');
                    span.innerText = serie;
                    row.appendChild(span);
                }
            }

            document.getElementById('chair').appendChild(row);
        });
    });
};

// Proceed to payment page function
function proceedToPayment() {
    // This function can be called to proceed to the payment page
    window.location.href = '/payment.html';
}

// Function to save the booked seat to the server
function saveBookedSeat() {
    const selectedSeatId = sessionStorage.getItem('selectedSeat'); // e.g., "H5"
    const row = selectedSeatId.substring(0, 1); // "H"
    const seatNo = parseInt(selectedSeatId.substring(1)); // 5

    fetch('https://movie-production.up.railway.app/save-seat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ row, seatNo })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Seat booked successfully:', data);
        sessionStorage.setItem('successMessage', 'Seat booked successfully!');
        window.location.href = '/index.html'; // Redirect with success message handling
    })
    .catch(error => {
        console.error('Error booking seat:', error);
        alert('Failed to book seat. Please try again.');
    });
}
