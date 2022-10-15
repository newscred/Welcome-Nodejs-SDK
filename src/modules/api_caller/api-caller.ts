import { request, RequestOptions } from "https";
import { Auth } from "../auth";

export class APICaller {
  #shouldRetry: boolean;
  #auth: Auth;

  #host = "https://api.welcomesoftware.com";
  #apiVersion = "v3";

  constructor(auth: Auth, enableAutoRetry: boolean) {
    this.#auth = auth;
    this.#shouldRetry = enableAutoRetry;
  }

  async #sendRequest(
    endpoint: string,
    tokenGetParam: any,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
    payload: any = {},
    isRetry: boolean = false
  ) {
    let url: URL;
    if (endpoint.startsWith("https")) {
      url = new URL(endpoint);
    } else {
      url = new URL(this.#host + "/" + this.#apiVersion + endpoint);
    }
    const payloadStringified = JSON.stringify(payload);
    const options: RequestOptions = {
      host: url.host,
      path: url.pathname,
      method: method,
      headers: {
        Authorization: `Bearer ${await this.#auth.getAccessToken(
          tokenGetParam
        )}`,
      },
    };

    if (["POST", "PUT", "PATCH"].includes(method)) {
      options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
        "Content-Length": payloadStringified.length,
      };
    }

    return new Promise((resolve, reject) => {
      const req = request(options, (res) => {
        let data = "";
        const statusCode = res.statusCode;

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", async () => {
          if (statusCode && statusCode < 299) {
            data = JSON.parse(data);
            resolve(data);
            return;
          }
          if (statusCode == 401 && this.#shouldRetry && !isRetry) {
            await this.#auth.rotateTokens(tokenGetParam);
            try {
              const res = this.#sendRequest(
                endpoint,
                tokenGetParam,
                method,
                payload,
                true
              );
              resolve(res);
              return;
            } catch (err) {
              reject(err);
              return;
            }
          }
          reject(data);
          return;
        });
      }).on("error", (err) => {
        reject(err.message);
      });

      if (payloadStringified) {
        req.write(payloadStringified);
      }
      req.end();
    });
  }

  async get(endpoint: string, tokenGetParam?: any) {
    return this.#sendRequest(endpoint, tokenGetParam);
  }

  async post(endpoint: string, payload: any, tokenGetParam?: any) {
    return this.#sendRequest(endpoint, tokenGetParam, "POST", payload);
  }

  async patch(endpoint: string, payload: any, tokenGetParam?: any) {
    return this.#sendRequest(endpoint, tokenGetParam, "PATCH", payload);
  }

  async put(endpoint: string, payload: any, tokenGetParam?: any) {
    return this.#sendRequest(endpoint, tokenGetParam, "PUT", payload);
  }

  async delete(endpoint: string, tokenGetParam?: any) {
    return this.#sendRequest(endpoint, tokenGetParam, "DELETE");
  }
}
