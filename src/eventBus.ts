type Callback = () => void;

class EventBus {
  private subscribers: Callback[] = [];

  subscribe(cb: Callback): void {
    this.subscribers.push(cb);
  }

  unsubscribe(cb: Callback): void {
    this.subscribers = this.subscribers.filter((fn) => fn !== cb);
  }

  publish(): void {
    this.subscribers.forEach((cb) => cb());
  }
}

export const eventBus = new EventBus();
