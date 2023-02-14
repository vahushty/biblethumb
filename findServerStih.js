import { findStih } from "./findStih.js";
import { bibleApi } from "./Init.js";
export async function findServerStih(chapter, number) {
  let stih = await findStih(chapter, number);
  if (stih) {
    console.log("THE LOCAL BASE WAS USED");
    return stih.stih;
  }
  const data = await bibleApi.getStih(chapter, number);
  if (data.msg === undefined) {
    stih = data.text;
  } else {
    stih = data.msg;
  }

  return stih;
}
