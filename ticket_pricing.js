// Function to fetch ticket prices from the backend
function fetchPrices() {
    fetch('fetch_ticket_prices.php') // Assuming your PHP script is named this
        .then(response => response.json())  // Convert response to JSON
        .then(prices => populatePriceTable(prices)) 
        .catch(error => console.error('Error fetching prices:', error)); 
}

// Function to populate the price table
function populatePriceTable(prices) {
    const priceTable = document.getElementById('priceTable').getElementsByTagName('tbody')[0]; 
    priceTable.innerHTML = '';  // Clear existing rows

    prices.forEach(price => {
        const row = priceTable.insertRow();  
        
        const descriptionCell = row.insertCell();
        const priceCell = row.insertCell();
        const activeCell = row.insertCell();
        const actionsCell = row.insertCell();

        descriptionCell.textContent = price.price_description;
        priceCell.textContent = price.price;
        activeCell.textContent = price.active ? 'Yes' : 'No'; 

        // Creating "Edit" and "Deactivate" buttons 
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editPrice(price.ticket_price_id); // Call a function for editing (not yet implemented)

        const deactivateButton = document.createElement('button');
        deactivateButton.textContent = price.active ? 'Deactivate' : 'Activate'; // Dynamic button text
        deactivateButton.onclick = () => togglePriceStatus(price.ticket_price_id, !price.active); // Call a function to toggle active status (not yet implemented)

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deactivateButton);
    });
}

// Function to add the new price to the table
function addNewPriceToTable(newPrice) {
    // Similar logic to what you have in populatePriceTable, 
    // but insert a single row with the details of newPrice
}

// Function to update an existing price in the table
function updatePriceInTable(updatedPrice) {
    // Find the existing row (based on updatedPrice.ticket_price_id) and update its content 
}

// Event listener for the form (it now handles both adding and updating)
const priceForm = document.getElementById('priceForm'); 
priceForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Collect form data
    const priceDescription = document.getElementById('priceDescription').value;
    const price = document.getElementById('ticketPrice').value;
    const active = document.getElementById('ticketActive').checked;
    const priceId = document.getElementById('ticketPriceId').value;

    // Send data to the backend 
    fetch('save_ticket_price.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceDescription, price, active, priceId }) // Include priceId on updates
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            if (priceId) {
                updatePriceInTable(result.updatedPrice); 
            } else {
                addNewPriceToTable(result.newPrice); 
            }
            // Clear the form after successful submission? (Optional)
            priceForm.reset();
        } else {
            // Display an error message 
        }
    })
    .catch(error => console.error('Error:', error)); 
});


// Call the fetchPrices function when the page loads
fetchPrices(); 
