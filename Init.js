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

  // if (initToken === null) {
  //   const data = await vizov.getInit();

  //   if (data.msg !== undefined) {
  //     console.log(data.msg);
  //   } else {
  //     initToken = data.token;
  //     await prisma.baseInit.create({
  //       data: {
  //         id: 1,
  //         token: initToken,
  //       },
  //     });
  //     console.log(`We have got a new token here! ${initToken}`);
  //   }
  // } else {
  //   console.log(`We have got an old token here! ${initToken.token}`);
  //   initToken = initToken.token;
  // }

  return bibleApi;
}
export const bibleApi = await initBibleApi();
