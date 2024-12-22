import "reflect-metadata";

import { container, InjectionToken, ValueProvider } from "tsyringe";
import { registerLibraries } from "./dependency-registries/libraries";
import { setupProvidersInjection } from "./dependency-registries/providers";

class DependencyRegistry {
  public container = container;

  constructor() {
    registerLibraries.call(this);
    setupProvidersInjection(this.container);
  }

  resolve<T>(token: InjectionToken<T>): T {
    return this.container.resolve(token);
  }

  register<T>(token: InjectionToken<T>, provider: ValueProvider<T>): void {
    this.container.register<T>(token, provider);
  }

  registerInstance<T>(token: InjectionToken<T>, instance: T): void {
    this.container.registerInstance(token, instance);
  }
}

let dependencyRegistry: DependencyRegistry;

const getDependencyRegistryInstance = (): DependencyRegistry => {
  if (!dependencyRegistry) {
    dependencyRegistry = new DependencyRegistry();
  }

  return dependencyRegistry;
};

export { getDependencyRegistryInstance, DependencyRegistry };
