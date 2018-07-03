/**
 * Generic event dispatcher
 * @class  BellhopEventDispatcher
 */
export class BellhopEventDispatcher {
  /**
   *  The collection of event listeners
   *  @property {Object} _listeners
   *  @private
   */
  constructor() {
    this._listeners = {};
  }

  /**
   *  Add an event listener to the listen to an event from either the parent or iframe
   *  @method on
   *  @param {String} name The name of the event to listen
   *  @param {Function} callback The handler when an event is triggered
   *  @param {number} [priority=0] The priority of the event listener. Higher numbers are handled first.
   */
  on(name, callback, priority = 0) {
    if (!this._listeners[name]) {
      this._listeners[name] = [];
    }
    callback._priority = parseInt(priority) || 0;

    // If callback is already set to this event
    if (-1 !== this._listeners[name].indexOf(callback)) {
      return;
    }

    this._listeners[name].push(callback);

    if (this._listeners[name].length > 1) {
      this._listeners[name].sort(this.listenerSorter);
    }
  }

  /**
   *  Sorts listeners added by .on() by priority
   */
  listenerSorter(a, b) {
    return a._priority - b._priority;
  }

  /**
   *  Remove an event listener
   *  @method off
   *  @param {String} type The type of event to listen for. If undefined, remove all listeners.
   *  @param {Function} [callback] The optional handler when an event is triggered, if no callback
   *         is set then all listeners by type are removed
   */
  off(type, callback) {
    if (this._listeners[type] === undefined) {
      return;
    }

    if (callback === undefined) {
      delete this._listeners[type];
      return;
    }

    const index = this._listeners[type].indexOf(callback);

    -1 < index ? this._listeners[type].splice(index, 1) : undefined;
  }

  /**
   *  Trigger any event handlers for an event type
   *  @method trigger
   *  @param {Object | String} event The event to send
   */
  trigger(event) {
    if (typeof event == 'string') {
      event = {
        type: event
      };
    }

    if ('undefined' !== typeof this._listeners[event.type]) {
      for (let i = this._listeners[event.type].length - 1; i >= 0; i--) {
        this._listeners[event.type][i](event);
      }
    }
  }

  /**
   * Reset the listeners object
   * @method  destroy
   */
  destroy() {
    this._listeners = {};
  }
}
