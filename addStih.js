import { prisma } from "./prismaInit.js";
import { findStih } from "./findStih.js";
import { bibleApi } from "./Init.js";

export async function addStih(chapter, number) {
  let stih = await findStih(chapter, number);
  let message = ``;
  if (stih === null) {
    let data = await bibleApi.getStih(chapter, number);
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
