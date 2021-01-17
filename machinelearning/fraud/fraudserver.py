import eventlet
from eventlet import wsgi
from eventlet import websocket
import json
from checktransaction import start


@websocket.WebSocketWSGI
def handle(ws):
    #check for message
    while True:
        m = ws.wait()
        if m is None:
            break
        #if message recieved run check transaction on it and return the value, closing the websocket
        data=json.loads(m)
        amount=start(data)
        return ws.send(amount)


def dispatch(environ, start_response):
    #on request respond with handle
    return handle(environ, start_response)


if __name__ == "__main__":
    #set the ip and port to listen on 
    listener = eventlet.listen(('0.0.0.0', 5007))
    wsgi.server(listener, dispatch)
