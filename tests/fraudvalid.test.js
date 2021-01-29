client = require("../machinelearning/client")
var data = [   
{'_id': ' Tesco ','amount': 14 },
{'_id': ' Tesco ','amount': 24 },];
stringifiedTransactions=JSON.stringify(data);

test('Identifies Valid Transaction', done => {
  function callback(data) {
    try {
      expect(data).toBe('False');
      done();
    } catch (error) {
      done(error);
    }
  }
  client.req(stringifiedTransactions,'ws://0.0.0.0:5007/',(data)=>{(callback(data))});
});
