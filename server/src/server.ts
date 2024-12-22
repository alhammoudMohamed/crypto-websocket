// import "reflect-metadata";

import {
  DependencyRegistry,
  getDependencyRegistryInstance,
} from "./configuration/dependency-registry";
import { WebSocketProviderAdapter } from "./domain/providers/message-handler/message-handler.provider.adapter";

let dependencyRegistry: DependencyRegistry;

(async (): Promise<void> => {
  dependencyRegistry = getDependencyRegistryInstance();

  const webSocketProvider =
    dependencyRegistry.resolve<WebSocketProviderAdapter>(
      "WebSocketProviderPort"
    );

  webSocketProvider.initializeHandlers();
})();

process.on("SIGINT", () => {
  console.log("Shutting down server");

  const webSocketProvider =
    dependencyRegistry.resolve<WebSocketProviderAdapter>(
      "WebSocketProviderPort"
    );

  webSocketProvider.closeConnection();

  console.log("Server shut down");
  process.exit(0);
});
