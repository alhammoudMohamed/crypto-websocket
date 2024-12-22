import { DependencyContainer } from "tsyringe";

import { WebSocketProviderAdapter } from "../../domain/providers/message-handler/message-handler.provider.adapter";

function setupProvidersInjection(container: DependencyContainer): void {
  container.register("WebSocketProviderPort", {
    useClass: WebSocketProviderAdapter,
  });
}

export { setupProvidersInjection };
