/* Client Code 

let sse = new EventSource("http://localhost:8888/stream");
sse.onmessage = console.log

*/

const cors = require("cors");
const express = require("express");
const app = require("express")();

const corsOption = {
  origin: ["*"],
  credentials: true,
};
app.use(cors(corsOption));
app.use(express.json());

// Increase the timeout to 10 minutes (600000 milliseconds)
app.set("timeout", 600000);

app.get("/", (req, res) => res.send("hello!"));

// app.get("/stream", (req, res) => {
//   console.log("hit");
//   res.setHeader("Content-Type", "text/event-stream");
//   send(res);
// });
const port = process.env.PORT || 8888;
const serverName = process.env.SERVER_NAME || "sample";

// let i = 0;
// function send(res) {
//   res.write("data: " + `hello from ${serverName} ---- [${i}]\n\n`);
//   i += 1;

//   setTimeout(() => send(res), 1000);
// }

app.get("/poll", (req, res) => {
  // Simulating a long polling request that takes longer than 5 minutes
  //   setTimeout(() => {
  res.send("Long polling response");
  //   }, 1000); // Respond after 10 minutes
});

app.post("/hook", (req, res) => {
  console.log(req.body);
  console.log("herders: ");
  console.log(req.headers);
  console.log("------");

  res.status(500).send();
});

app.listen(port);
console.log(`Listening on ${port}`);
