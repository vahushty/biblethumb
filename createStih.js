import { prisma } from "./prismaInit.js";
export async function createStih(id, stih) {
  let create = await prisma.stihi.create({
    data: {
      id: id,
      stih: stih,
    },
  });
  return create;
}
