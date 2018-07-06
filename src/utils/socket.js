var W3CWebSocket = require('websocket').w3cwebsocket;

export const client = new W3CWebSocket('ws://localhost:1337/', 'echo-protocol');

client.onclose = function() {
    console.log('echo-protocol Client Closed');
};