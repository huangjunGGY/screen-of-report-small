import { provide, inject, reactive } from 'vue';

const EventBusSymbol = Symbol();

export function provideEventBus() {
  const eventBus = reactive({
    emit(event, ...args) {
      this[`${event}`]?.forEach(callback => callback(...args));
    },
    on(event, callback) {
      if (!this[`${event}`]) {
        this[`${event}`] = [];
      }
      this[`${event}`].push(callback);
    },
    off(event, callback) {
      if (!this[`${event}`]) return;
      const index = this[`${event}`].indexOf(callback);
      if (index !== -1) {
        this[`${event}`].splice(index, 1);
      }
    }
  });

  provide(EventBusSymbol, eventBus);
}

export function useEventBus() {
  const eventBus = inject(EventBusSymbol);
  if (!eventBus) {
    throw new Error('Event bus not provided!');
  }
  return eventBus;
}
