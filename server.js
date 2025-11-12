// server.js
import five from "johnny-five";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
const board = new five.Board();

board.on("ready", () => {
  const led = new five.Led(13);
  const servo = new five.Servo(10);

  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      const command = JSON.parse(message);
      if (command.action === "blink") {
        console.log("blink LED");
        led.blink();
      } else if (command.action === "stop") {
        console.log("stop LED");
        led.stop();
      } else if (command.action === "turn") {
        const angle = Math.floor(Math.random() * 360);
        console.log("set servo to angle: " + angle);
        servo.to(angle);
      }
    });
  });
});
