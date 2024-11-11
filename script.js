document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("send-button");
    const userInput = document.getElementById("user-input");
    const messagesContainer = document.getElementById("messages");

    // Function to display messages
    function displayMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.classList.add(sender); // user or bot class
        messageDiv.innerText = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
    }

    // API request function
    async function fetchBotResponse(query) {
        const url = `https://darkness.ashlynn.workers.dev/chat/?prompt=${encodeURIComponent(query)}&model=gpt-4o-mini`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.status === 200 && data.response) {
                return data.response; // Return the response from the bot
            } else {
                return "Sorry, I couldn't understand that.";
            }
        } catch (error) {
            console.error('Error fetching response:', error);
            return "There was an error while fetching the response.";
        }
    }

    // Handle sending a message
    sendButton.addEventListener("click", async function () {
        const userText = userInput.value.trim();
        if (userText !== "") {
            displayMessage(userText, "user");
            userInput.value = ""; // Clear input box
            const botResponse = await fetchBotResponse(userText);
            setTimeout(() => {
                displayMessage(botResponse, "bot");
            }, 1000); // Simulate bot typing delay
        }
    });

    // Allow enter key to send message
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendButton.click();
        }
    });
});
