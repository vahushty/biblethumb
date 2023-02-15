import { BibleApi } from "./BibleApi.js";
import { prisma } from "./prismaInit.js";

export class BibleInit extends BibleApi {
  constructor(...args) {
    super(...args);
    if (typeof BibleInit.instance === `object`) {
      return BibleInit.instance;
    }
    BibleInit.instance = this;
    return this;
  }

  async initBible() {
    await prisma.baseInit.create({
      data: {
        id: 1,
        token: this.token,
      },
    });
  }

  async tokenBible() {
    let initToken = await prisma.baseInit.findFirst({
      where: { id: 1 },
      select: { token: true },
    });
    return initToken?.token || null;
  }
}
