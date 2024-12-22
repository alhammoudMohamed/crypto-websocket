import WebSocket from "ws";

const port = 1234;

const ws = new WebSocket(`ws://localhost:${port}/markets/ws`);

ws.on("open", () => {
  console.log("Connected to server!");

  const subscriptionMessage = {
    event: "subscribe",
    channel: "rates",
  };

  const messageString = JSON.stringify(subscriptionMessage);
  console.log(`Sending message to server: ${messageString}`);

  ws.send(messageString);
});

ws.on("message", (message) => {
  console.table(`Received message from server: ${message}`);
});

ws.on("close", () => {
  console.log("Disconnected from server!");
});

ws.on("error", (error) => {
  console.error(`Error: ${error.message}`);
});
