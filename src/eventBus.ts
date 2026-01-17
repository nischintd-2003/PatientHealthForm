type Callback = () => void;

class EventBus {
  private subscribers: Callback[] = [];

  subscribe(cb: Callback) {
    this.subscribers.push(cb);
  }

  unsubscribe(cb: Callback) {
    this.subscribers = this.subscribers.filter((fn) => fn !== cb);
  }

  publish() {
    this.subscribers.forEach((cb) => cb());
  }
}

export const eventBus = new EventBus();
