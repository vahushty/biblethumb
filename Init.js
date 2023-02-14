import { prisma } from "./prismaInit.js";
import { BibleInit } from "./BibleApi.js";
async function initBibleApi() {
  let initToken = await prisma.baseInit.findFirst({
    where: { id: 1 },
    select: { token: true },
  });
  let bibleApi = new BibleInit(initToken?.token);
  return bibleApi;
}
export const bibleApi = await initBibleApi();
