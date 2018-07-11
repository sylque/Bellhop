var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},classCallCheck=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),get=function t(e,n,i){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var s=Object.getPrototypeOf(e);return null===s?void 0:t(s,n,i)}if("value"in o)return o.value;var r=o.get;return void 0!==r?r.call(i):void 0},inherits=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},possibleConstructorReturn=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},BellhopEventDispatcher=function(){function t(){classCallCheck(this,t),this._listeners={}}return createClass(t,[{key:"on",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;this._listeners[t]||(this._listeners[t]=[]),e._priority=parseInt(n)||0,-1===this._listeners[t].indexOf(e)&&(this._listeners[t].push(e),this._listeners[t].length>1&&this._listeners[t].sort(this.listenerSorter))}},{key:"listenerSorter",value:function(t,e){return t._priority-e._priority}},{key:"off",value:function(t,e){if(void 0!==this._listeners[t])if(void 0!==e){var n=this._listeners[t].indexOf(e);-1<n&&this._listeners[t].splice(n,1)}else delete this._listeners[t]}},{key:"trigger",value:function(t){if("string"==typeof t&&(t={type:t}),void 0!==this._listeners[t.type])for(var e=this._listeners[t.type].length-1;e>=0;e--)this._listeners[t.type][e](t)}},{key:"destroy",value:function(){this._listeners={}}}]),t}(),Bellhop=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100*Math.random()|0;classCallCheck(this,e);var n=possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n.id="BELLHOP:"+t,n.connected=!1,n.isChild=!0,n.connecting=!1,n.origin="*",n._sendLater=[],n.iframe=null,n}return inherits(e,BellhopEventDispatcher),createClass(e,[{key:"receive",value:function(t){this.target===t.source&&("connected"===t.data?this.onConnectionReceived(t.data):this.connected&&"object"===_typeof(t.data)&&t.data.type&&this.trigger(t.data))}},{key:"onConnectionReceived",value:function(t){this.connecting=!1,this.connected=!0,this.trigger("connected"),this.isChild||this.target.postMessage(t,this.origin);for(var e=0,n=this._sendLater.length;e<n;e++){var i=this._sendLater[e];this.send(i.data)}this._sendLater.length=0}},{key:"connect",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"*";this.connecting||(this.disconnect(),this.connecting=!0,t instanceof HTMLIFrameElement&&(this.iframe=t),this.isChild=void 0===t,this.origin=e,window.addEventListener("message",this.receive.bind(this)),this.isChild&&(window===this.target?this.trigger("failed"):this.target.postMessage("connected",this.origin)))}},{key:"disconnect",value:function(){this.connected=!1,this.connecting=!1,this.origin=null,this.iframe=null,this.isChild=!0,this._sendLater.length=0,window.removeEventListener("message",this.receive)}},{key:"send",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("string"!=typeof t)throw"The event type must be a string";var n={type:t,data:e};this.connecting?this._sendLater.push(n):this.target.postMessage(n,this.origin)}},{key:"fetch",value:function(t,e){var n=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(!this.connecting&&!this.connected)throw"No connection, please call connect() first";this.on(t,function t(i){o&&n.off(i.type,t),e(i)}),this.send(t,i)}},{key:"respond",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];this.on(t,function o(s){i&&e.off(s.type,o),e.send(t,n)})}},{key:"destroy",value:function(){get(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"destroy",this).call(this),this.disconnect(),this._sendLater.length=0}},{key:"target",get:function(){return this.isChild?window.parent:this.iframe.contentWindow}}]),e}();export{Bellhop};
//# sourceMappingURL=bellhop.js.map
