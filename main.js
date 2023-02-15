import express from "express";
import { findServerStih } from "./findServerStih.js";
import { addStih } from "./addStih.js";

const host = "localhost";
const port = 8080;

const app = express();

//Server initialization

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Adding stih
app.post("/api/stih/add", async (req, res) => {
  const chapter = req.body.chapter;
  const number = req.body.number;
  const message = await addStih(chapter, number);
  res.send(message);
});

//Finding stih
app.post("/api/stih/get", async (req, res) => {
  const chapter = req.body.chapter;
  const number = req.body.number;
  let stih = await findServerStih(chapter, number);
  res.send(stih);
});

app.listen(port, host);
console.log(`Server is working`);
