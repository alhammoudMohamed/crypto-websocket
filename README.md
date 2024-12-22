crypto-websocket

## Getting started

1. clone the repository
2. run `cd server && npm i && cd ../client && npm i`

## Running the server

run `cd server && ts-node src/server.ts`

## Running the client

run `cd client && ts-node client.ts`

Next steps:

- split the message-handler provider to two separate providers

  - One provider for initializing the server
  - Another provider to handle the messages

- In the Application layer, we can create a web-socket listener that can subscribe to an API or Web-socket to get the messages and then pass it to the message-handler provider
- Based on the event/chanel, we can call the respective handler to process the message

- Create unit tests
- Create service level tests

- Create a simple UI to display the messages
