import express from "express";
import { findServerStih } from "./findServerStih.js";
import { addStih } from "./addStih.js";
import { init } from "./Init.js";


const host = "localhost";
const port = 8080;

const app = express();

const initToken = await init();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/stih/add", async (req, res) => {
  const chapter = req.body.chapter;
  const number = req.body.number;
  const message = await addStih(chapter,number,initToken);
  res.send(message);
});

app.post("/api/stih/get", async (req, res) => {
  const chapter = req.body.chapter;
  const number = req.body.number;
  let stih = await findServerStih(chapter,number,initToken);
  res.send(stih);
});

app.listen(port, host);
console.log(`Server is working`);