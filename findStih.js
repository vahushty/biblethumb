import { prisma } from "./prismaInit.js";

export async function findStih(chapter, number) {
  let stih = await prisma.stihi.findFirst({
    where: { chapter: chapter, number: number },
    select: { stih: true },
  });
  return stih;
}
