import { prisma } from "./prismaInit.js";
import { BibleApi } from "./BibleApi.js";
async function initBibleApi() {
  let initToken = await prisma.baseInit.findFirst({
    where: { id: 1 },
    select: { token: true },
  });
  const createToken = async (token) => {
    await prisma.baseInit.create({
      data: {
        id: 1,
        token: token,
      },
    });
  };
  let bibleApi = new BibleApi(initToken?.token, createToken);
  return bibleApi;
}
export const bibleApi = await initBibleApi();

// class BibleInit extends BibleApi {
//   async #initToken (){
//     super.#initToken
//   }
// }
