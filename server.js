const { createServer } = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

process.on("uncaughtException", (err) => {
  console.error("uncaughtException:", err);
});
process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection:", err);
});

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res).catch((err) => {
      console.error("Request handler error:", err);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    });
  });

  server.on("error", (err) => {
    console.error("Server error:", err);
  });

  server.on("clientError", (err, socket) => {
    console.error("Client error:", err);
    if (socket.writable) {
      socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
    }
  });

  server.listen(port, () => {
    console.log(`> Ready on port ${port}`);
  });
});
