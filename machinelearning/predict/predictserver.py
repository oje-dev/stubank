import eventlet
from eventlet import wsgi
from eventlet import websocket
import json
from predict_spending import start

# demo app
import os
import random


@websocket.WebSocketWSGI
def handle(ws):
    while True:
        m = ws.wait()
        if m is None:
            break
        data=json.loads(m)
        amount=start(data)
        return ws.send(amount)


def dispatch(environ, start_response):
    return handle(environ, start_response)

if __name__ == "__main__":
    # run an example app from the command line
    listener = eventlet.listen(('0.0.0.0', 5000))
    wsgi.server(listener, dispatch)
