<!-- Google Maps Initialization -->
<script>
    let map;

    function initMap() {
        const myLocation = { lat: 33.42365674532865, lng: -111.93258955372863 }; // Your location
        const rashiLocation = { lat: 19.122305627977454, lng: 72.99965065529193 }; // Rashi's location

        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 4,
            center: myLocation,
        });

        new google.maps.Marker({
            position: myLocation,
            map: map,
            title: "Your Location",
        });

        new google.maps.Marker({
            position: rashiLocation,
            map: map,
            title: "Rashi's Location",
        });
    }

    // Function to fetch and display messages
    function fetchMessages() {
        const url = 'https://script.google.com/macros/s/AKfycbyUCr8HkL-RlPrw51karPjMHsK2slMhESB4hqioix13zYdiLwMttIlMBRyUf_cq3PeW/exec';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const messageContainer = document.getElementById("message-container");
                messageContainer.innerHTML = ""; // Clear existing messages

                data.forEach(messageObj => {
                    const messageElement = document.createElement("div");
                    messageElement.classList.add("message");

                    const nameElement = document.createElement("h3");
                    nameElement.textContent = messageObj.name;
                    messageElement.appendChild(nameElement);

                    const messageContent = document.createElement("p");
                    messageContent.textContent = messageObj.message;
                    messageElement.appendChild(messageContent);

                    const timeElement = document.createElement("p");
                    const timestamp = new Date(messageObj.timestamp);
                    timeElement.textContent = `Posted at: ${timestamp.toLocaleTimeString()}`;
                    messageElement.appendChild(timeElement);

                    messageContainer.appendChild(messageElement);
                });
            })
            .catch(error => console.error("Error fetching messages:", error));
    }

    // Notes Section - Handle form submission
    document.getElementById("notes-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const message = document.getElementById("message").value;

        if (name && message) {
            // Send data to the backend (Google Sheets)
            sendToBackend(name, message);

            // Create a new message element
            const messageElement = document.createElement("div");
            messageElement.classList.add("message");

            const nameElement = document.createElement("h3");
            nameElement.textContent = name;
            messageElement.appendChild(nameElement);

            const messageContent = document.createElement("p");
            messageContent.textContent = message;
            messageElement.appendChild(messageContent);

            const timeElement = document.createElement("p");
            const currentTime = new Date().toLocaleTimeString();
            timeElement.textContent = `Posted at: ${currentTime}`;
            messageElement.appendChild(timeElement);

            document.getElementById("message-container").appendChild(messageElement);

            // Reset form inputs
            document.getElementById("name").value = "";
            document.getElementById("message").value = "";
        } else {
            alert("Please fill in both your name and message.");
        }
    });

    // Function to send data to Google Sheets
    function sendToBackend(name, message) {
        const url = 'https://script.google.com/macros/s/AKfycbyUCr8HkL-RlPrw51karPjMHsK2slMhESB4hqioix13zYdiLwMttIlMBRyUf_cq3PeW/exec';
        const data = {
            "name": name,
            "message": message
        };
        const params = new URLSearchParams(data);

        fetch(url, {
            method: 'POST',
            body: params,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Message posted to Google Sheets:', data);
        })
        .catch(error => {
            console.error('Error posting message:', error);
        });
    }

    // Fetch messages on page load
    document.addEventListener("DOMContentLoaded", fetchMessages);
</script>
