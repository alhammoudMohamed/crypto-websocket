import { inject, singleton } from "tsyringe";
import { WebSocketServer, WebSocket, RawData } from "ws";
import fs from "fs";
import path from "path";

@singleton()
export class WebSocketProviderAdapter {
  constructor(
    @inject("WebSocketServer")
    private server: WebSocketServer,
    @inject("WebSocketClients")
    private clients: Set<WebSocket>
  ) {}

  public initializeHandlers(): void {
    this.server.on("connection", (ws: WebSocket) =>
      this.handleNewConnection(ws)
    );
    console.log("WebSocket server initialized");
  }

  private handleNewConnection(ws: WebSocket): void {
    this.clients.add(ws);

    ws.on("message", (data: RawData) => this.handleMessage(ws, data));
  }

  private parseMessage(data: RawData): any {
    try {
      return JSON.parse(data.toString());
    } catch (error) {
      console.error("Failed to parse message:", error);
      return null;
    }
  }

  private async handleMessage(ws: WebSocket, message: any): Promise<void> {
    const parsedMessage = this.parseMessage(message);

    if (
      parsedMessage.event === "subscribe" &&
      parsedMessage.channel === "rates"
    ) {
      console.log("Subscribed to rates");

      let rates;

      const fullFilePath = path.join(
        __dirname,
        "../../../../crypto-rates.json"
      );

      if (!fs.existsSync(fullFilePath)) {
        console.log("File not found");
        return;
      }

      try {
        rates = JSON.parse(
          await fs.promises.readFile(fullFilePath, { encoding: "utf-8" })
        );

        rates.data.forEach((rate: any) => {
          const message = {
            channel: "rates",
            event: "data",
            data: rate,
          };

          ws.send(JSON.stringify(message));
        });
      } catch (error) {
        console.log("Error:", error);
        return;
      }

      return;
    }

    if (message.type === "disconnect") {
      console.log("Client requested to disconnect");
      ws.close(1000, "Client initiated disconnect");
      return;
    }
  }

  public closeConnection(): void {
    console.log("Closing connection-----SERVER");
    this.clients.forEach((client) => {
      client.close(1001, "Server shutting down");
    });
  }
}
