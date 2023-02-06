import fetch from "node-fetch";
import { prisma } from "./prismaInit.js";
import { findStih } from "./findStih.js";

export async function addStih(chapter, number, initToken) {
  let stih = await findStih(chapter, number);
  let message = ``;
  if (stih === null) {
    const response = await fetch(
      `https://www.abibliadigital.com.br/api/verses/bbe/gn/${chapter}/${number}`,
      {
        headers: {
          Authorization: `Bearer ${initToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.msg !== undefined) {
      message = `Stih not founded`;
    } else {
      await prisma.stihi.create({
        data: {
          chapter: chapter,
          number: number,
          stih: data.text,
        },
      });
      message = `Stih was added`;
    }
  } else {
    message = `Stih already exist in base`;
  }
  return message;
}
