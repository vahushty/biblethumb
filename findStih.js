import { prisma } from "./prismaInit.js";
export async function findStih(id) {
  let find = await prisma.stihi.findUnique({
    where: { id: id },
    select: { stih: true, id: true },
  });
  return find;
}
