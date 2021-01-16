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
    """  This is the websocket handler function.  Note that we
    can dispatch based on path in here, too."""
    while True:
        m = ws.wait()
        if m is None:
            break
        data=json.loads(m)
        amount=start(data)
        ws.send(amount)


def dispatch(environ, start_response):
    """ This resolves to the web page or the websocket depending on
    the path."""
    return handle(environ, start_response)

if __name__ == "__main__":
    # run an example app from the command line
    listener = eventlet.listen(('0.0.0.0', 5000))
    print("\nVisit http://localhost:5000/ in your websocket-capable browser.\n")
    wsgi.server(listener, dispatch)
