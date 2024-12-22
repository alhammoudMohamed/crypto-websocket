import { container, instanceCachingFactory } from "tsyringe";
import { WebSocketServer } from "ws";

import { DependencyRegistry } from "../dependency-registry";

function registerLibraries(this: DependencyRegistry): void {
  container.register("WebSocketServer", {
    useFactory: instanceCachingFactory(
      () => new WebSocketServer({ port: 1234, path: "/markets/ws" })
    ),
  });
  container.register("WebSocketClients", {
    useValue: new Set(),
  });
}

export { registerLibraries };
