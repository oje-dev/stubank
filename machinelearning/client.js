const WebSocket = require('ws');
var ws

async function req(jsondata) {
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

async function getdata(socket,data) {
  //await client.start('ws://0.0.0.0:5001/');
  ws = new WebSocket(socket);
  hot = await req(data);
  return hot;
}

exports.getdata=getdata;
