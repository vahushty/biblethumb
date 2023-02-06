import fetch from "node-fetch";
import { findStih } from "./findStih.js";
export async function findServerStih(chapter, number, initToken) {
  let stih = await findStih(chapter, number);
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
    if (data.msg === undefined) {
      stih = data.text;
    } else {
      stih = data.msg;
    }
  } else {
    console.log("THE LOCAL BASE WAS USED");
  }

  return stih;
}
