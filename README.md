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
- Websocket server will send a ping frame every 5-10 min
  If the websocket server does not receive a pong frame back from the connection within a 10 minute period, the connection will be disconnected.
  When you receive a ping, you must send a pong with a copy of ping's payload as soon as possible.

- Modify TsCongfig file 
- Create unit tests
- Create service level tests

- Create a simple UI to display the messages
