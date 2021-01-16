const WebSocket = require('ws');
var ws = new WebSocket('ws://0.0.0.0:5001/');
console.log("Connected!");

function req(jsondata) {
  const obj = JSON.stringify(jsondata);
  ws.on('open', function open() {
    ws.send(obj);
  });
  return new Promise(function(resolve) {
    ws.on('message', function incoming(data) {
      resolve(data);
    });
  })
}
exports.req = req;




