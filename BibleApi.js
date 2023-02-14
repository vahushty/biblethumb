import fetch from "node-fetch";
import { prisma } from "./prismaInit.js";
export class BibleApi {
  #AUTH_DATA = {
    name: "product",
    email: "sobakin2gavgavgav1488@email.com",
    password: "666666",
    notifications: false,
  };

  #BASE_URL = `https://www.abibliadigital.com.br/api/`;
  constructor(token) {
    this.token = token;
  }

  async #request(url, options = {}) {
    const response = await fetch(`${this.#BASE_URL}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  async #authRequest(url, options = {}) {
    if (!this.token) {
      await this.#initToken();
    }
    return await this.#request(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
  async initBible() {}

  async getStih(chapter, number) {
    return await this.#authRequest(`verses/bbe/gn/${chapter}/${number}`);
  }

  async #initToken() {
    const response = await this.#request(`users`, {
      method: "post",
      body: JSON.stringify(this.#AUTH_DATA),
    });
    if (!response.token) {
      throw new Error("Getting Token error" + response.msg);
    }
    this.token = response.token;
    await this.initBible();
  }
}

export class BibleInit extends BibleApi {
  constructor(token) {
    if (typeof BibleInit.instance === `object`) {
      return BibleInit.instance;
    }
    super(token);
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
}
