import { configDotenv } from "dotenv";
configDotenv({ path: "./.env" })
import http from "node:http"
import path from "node:path";
import express from "express";
import { Server } from "socket.io"



function createApp() {
  const port = process.env.port ?? 8080;
  const app = express()
  const server = http.createServer(app)
  const io = new Server();
  io.attach(server)

  io.on("connection", (socket) => {
    console.log("socket connected", socket.id)
  })


  app.use(express.static("public")) //this works according to relative to cwd
  // app.use(express.static(path.resolve("./public"))) //converts it to absolute path, ensure correct path

  // app.get("/", (req, res) => {
  //   res.send("100 Check Boxes - Scaling Web Sockets n*n")
  // })

  app.get("/health", (req, res) => {
    res.send("System Status - GOOD")
  })

  server.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`)
  })
}

createApp()