import fetch from "node-fetch";
export class BibleApi {
  #AUTH_DATA = {
    name: "product",
    email: "sobakin2gavgavgav1488@email.com",
    password: "666666",
    notifications: false,
  };

  #BASE_URL = `https://www.abibliadigital.com.br/api/`;
  constructor(token, initCb) {
    this.initCb = initCb;
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
    if (this.initCb) {
      await this.initCb(response.token);
    }
  }
}