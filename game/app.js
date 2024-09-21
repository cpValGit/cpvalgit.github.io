// app.js

// Replace with your actual storage account name and key
const accountName = "your_account_name";
const accountKey = "your_account_key";
const queueName = "your_queue_name";

// Create a SharedKeyCredential
const { SharedKeyCredential, QueueServiceClient } = require("@azure/storage-queue");

const sharedKeyCredential = new SharedKeyCredential(accountName, accountKey);
const queueServiceClient = new QueueServiceClient(`https://${accountName}.queue.core.windows.net`, sharedKeyCredential);

// Function to send message to queue
async function sendMessageToQueue(message) {
    const queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.createIfNotExists(); // Create the queue if it doesn't exist
    await queueClient.sendMessage(message);
}

// Handle form submission
document.getElementById("messageForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const messageInput = document.getElementById("message");
    const message = messageInput.value;

    try {
        await sendMessageToQueue(message);
        alert("Message sent successfully!");
        messageInput.value = ""; // Clear input field
    } catch (error) {
        console.error("Error sending message:", error);
        alert("Failed to send message.");
    }
});