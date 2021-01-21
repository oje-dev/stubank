//start websocket  and remove max listener cap
const WebSocket = require('ws');
//code cannot be abstracted because this line cannot be in a function. or passed to a function without causing a listener issue.
var ws = new WebSocket('ws://0.0.0.0:5000/');
ws.setMaxListeners(0)

/**
 * Send user data and recieve machine learning.
 * @param {Object} func - The function that will be run with the recieved data.
 * @param {string} jsondata - A stringified Json string to send to the python server.
 *@returns {string} the predicted total value to be spent
 * It will predict the date of the most recent transaction + 1 month.
 */
function req(jsondata,func){
  //send the data to the server when connection is started.
  ws.on('open', function open() {
    ws.send(jsondata);
  });
  //when the server sends a response, runs the sent function.
  ws.on('message', function incoming(data) {
    func(data);
  });
  //error handling
  ws.on('error', (err) => console.log(err.message));
  ws.on('close', function close() {
  });
}

//export function
exports.req=req;