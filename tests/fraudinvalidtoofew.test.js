client = require("../machinelearning/client")
var data = [{'_id': ' Tesco ','amount': 14 },
{'_id': ' Tesco ','amount': 24 }];
stringifiedTransactions=JSON.stringify(data);
//** Calls the websocket server, tries to conduct a "fradulent" payment and chests if the result is true*/
test('Identifies Fraud Transaction', done => {
  function callback(data) {
    try {
      expect(data).toBe('True');
      done();
    } catch (error) {
      done(error);
    }
  }
  client.req(stringifiedTransactions,'ws://0.0.0.0:5007/',(data)=>{(callback(data))});
});