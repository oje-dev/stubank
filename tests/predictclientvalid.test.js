

//remember to stringify JSON data first
const obj = JSON.stringify(data);
//make sure to require the correct client with the correct path
//const client = require('../machinelearning/fraud/fraudclient');
const client = require('../machinelearning/client');

test('predicts a variety transactions', done => {
  function callback(data) {
    try {
      expect(data).toBe('630.56');
      done();
    } catch (error) {
      done(error);
    }
  }
  client.req(obj,'ws://0.0.0.0:5003/',(data)=>{(callback(data))});
});
