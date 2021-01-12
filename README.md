# Learning WebSocket

Just one of the things I'm learning. <https://github.com/hchiam/learning>

## Super quick demo setup

Triple-click to select the whole command below: (and copy it into CLI and run it)

```bash
git clone https://github.com/hchiam/learning-websocket.git && cd learning-websocket && yarn && nodemon
```

Or if you don't have [`yarn`](https://github.com/hchiam/learning-yarn) installed:

```bash
git clone https://github.com/hchiam/learning-websocket.git && cd learning-websocket && npm install && nodemon
```

You can then open <http://localhost:8080> in multiple tabs to see live chat working locally in localhost.

## Key things

Both server and client have `.on` and `.emit` events. 1st parameter is the name of the listener. 2nd parameter contains the data (a JSON object for `.emit`, and a `function(data)` for `.on`). There's `io.sockets.emit` ("send to all") and `socket.broadcast.emit` ("send to all others").

### Server

```js
const io = socket(server);

io.on("connection", (socket) => {
  socket.on("some-server-listener-1", (data) => {
    // send message data to all clients:
    io.sockets.emit("client-listener-1", data);

    // send typing data to all clients except sender client that triggered this listener:
    socket.broadcast.emit("client-listener-2", data);

    socket.on("disconnect", (socket) => {
      console.log(`A client socket disconnected.`);
    });
  });
});
```

### Client

```js
const socket = io(window.location.origin);

socket.emit("some-server-listener-1", data);
socket.on("client-listener-2", (data) => {
  // ...
});
```

## Medium tutorial

<https://medium.com/@tfarguts/websockets-for-beginners-part-2-9a1970a1c228>

## More links to learn from

"WebSockets in 100 seconds": <https://www.youtube.com/watch?v=1BfCnjr_Vjg>

<https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API>

<https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications>

<https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers>
