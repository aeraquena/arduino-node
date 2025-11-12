// server.js
import five from "johnny-five";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
const board = new five.Board();

board.on("ready", () => {
  const led = new five.Led(13);

  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      const command = JSON.parse(message);
      if (command.action === "blink") {
        led.blink();
      } else if (command.action === "stop") {
        led.stop();
      }
    });
  });
});
