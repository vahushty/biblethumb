import fetch from "node-fetch";

export class BibleApi {
  #AUTH_DATA = {
    name: "product",
    email: "sobakin2gavgavgav1488@email.com",
    password: "666666",
    notifications: false,
  };

  #BASE_URL = `https://www.abibliadigital.com.br/api/`;

  #token = null;

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
    this.#token = await this.#initToken();
    return await this.#request(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${this.#token}`,
      },
    });
  }

  async saveToken() {}

  async getPreInitializedToken() {
    return null;
  }

  async getStih(chapter, number) {
    return await this.#authRequest(`verses/bbe/gn/${chapter}/${number}`);
  }

  async #initToken() {
    this.#token = await this.getPreInitializedToken();
    if (this.#token !== null) {
      return this.#token;
    }

    const response = await this.#request(`users`, {
      method: "post",
      body: JSON.stringify(this.#AUTH_DATA),
    });
    if (!response.token) {
      throw new Error("Getting Token error" + response.msg);
    }
    this.#token = response.token;
    await this.saveToken(this.#token);
  
    return this.#token;
  }
}
