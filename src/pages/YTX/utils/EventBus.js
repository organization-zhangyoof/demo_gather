export class EventBus {
  listeners = [];
  listenersOncer = [];

  on = listeners => {
    this.listeners.push(listeners);
    return () => this.off(listeners);
  }

  once = listeners => {
    this.listenersOncer.push(listeners);
  }

  off = listeners => {
    this.listeners = this.listeners.filter(v => {
      return v !== listeners;
    })
  }

  emit = event => {
    this.listeners.forEach(listener => listener(event))

    this.listenersOncer.forEach(listeners => listeners(event))

    this.listenersOncer = [];
  }
}