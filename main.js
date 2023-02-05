import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const host = "localhost";
const port = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/stih/add", async (req, res) => {
  const id = req.body.id;
  const stih = req.body.stih;
  try {
    await prisma.stihi.create({
      data: {
        id: id,
        stih: stih,
      },
    });
  } catch (e) {
    res.send("The stih is already in base");
    return;
  }
  res.send("The stih added");
});

app.post("/api/stih/get", async (req, res) => {
  const id = req.body.id;
  let stih = await prisma.stihi.findUnique({
    where: { id: id },
    select: { stih: true },
  });
  if (stih !== null) {
    res.send(`The stih you are looking for is ${stih.stih}`);
  } else {
    res.send(`There is no stih like that`);
  }
});

app.listen(port, host);
console.log(`Server is working`);
