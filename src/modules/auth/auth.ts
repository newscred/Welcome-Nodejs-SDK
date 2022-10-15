import { request, RequestOptions } from "https";

enum GrantType {
  AUTHORIZATION_CODE = "authorization_code",
  REFRESH_TOKEN = "refresh_token",
}
interface AuthConstructorParam {
  accessToken: string | ((tokenGetParam?: any) => string | Promise<string>);
  refreshToken: string | ((tokenGetParam?: any) => string | Promise<string>);
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
  onAuthSuccess?: (
    accessToken: string,
    refreshToken: string,
    tokenGetParam?: any
  ) => any;
  onAuthFailure?: (error: string, ...args: any) => any;
  tokenChangeCallback?: (
    accessToken: string,
    refreshToken: string,
    tokenGetParam?: any
  ) => any;
}

interface TokenRequestPayload {
  grant_type: GrantType.AUTHORIZATION_CODE;
  client_id: string;
  client_secret: string;
  code: string;
  redirect_uri: string;
}

interface TokenRotatePayload {
  grant_type: GrantType.REFRESH_TOKEN;
  client_id: string;
  client_secret: string;
  refresh_token: string;
}

interface TokenRevokPayload {
  token: string;
  token_type_hint: "access_token" | "refresh_token";
  client_id: string;
  client_secret: string;
}

export class Auth {
  #accessToken: string | ((tokenGetParam?: any) => string | Promise<string>);
  #refreshToken: string | ((tokenGetParam?: any) => string | Promise<string>);
  #clientId: string | undefined;
  #clientSecret: string | undefined;
  #redirectUri: string | undefined;
  #onAuthSuccess?: (accessToken: string, refreshToken: string, tokenGetParam?: any) => any;
  #onAuthFailure?: (error: string) => any;
  #tokenChangeCallback?: (accessToken: string, refreshToken: string, tokenGetParam?: any) => any;

  static authorizationServerAddr =
    "https://accounts.welcomesoftware.com/o/oauth2/v1";

  constructor(param: AuthConstructorParam) {
    this.#accessToken = param.accessToken;
    this.#refreshToken = param.refreshToken;
    this.#clientId = param.clientId || process.env.WELCOME_CLIENT_ID;
    this.#clientSecret = param.clientSecret || process.env.WELCOME_CLIENT_SECRET;
    this.#redirectUri = param.redirectUri;
    this.#onAuthFailure = param.onAuthFailure;
    this.#onAuthSuccess = param.onAuthSuccess;
    this.#tokenChangeCallback = param.tokenChangeCallback;
  }

  async getAccessToken(tokenGetParam?: any) {
    if (typeof this.#accessToken === "function") {
      return this.#accessToken(tokenGetParam);
    }
    return this.#accessToken;
  }

  async getRefreshToken(tokenGetParam?: any) {
    if (typeof this.#refreshToken === "function") {
      return this.#refreshToken(tokenGetParam);
    }
    return this.#refreshToken;
  }

  #post(
    endpoint: "/token",
    payload: TokenRequestPayload | TokenRotatePayload
  ): Promise<{ access_token: string; refresh_token: string }>;
  #post(
    endpoint: "/revoke",
    payload: TokenRevokPayload
  ): Promise<{ msg: string }>;
  async #post(endpoint: string, payload: any) {
    const url = new URL(Auth.authorizationServerAddr + endpoint);

    const payloadStringified = JSON.stringify(payload);
    const options: RequestOptions = {
      host: url.host,
      path: url.pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": payloadStringified.length,
      },
    };

    return new Promise((resolve, reject) => {
      const req = request(options, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          data = JSON.parse(data);
          resolve(data);
        });
      }).on("error", (err) => {
        reject(err.message);
      });

      req.write(payloadStringified);
      req.end();
    });
  }

  initiateOAuth(redirectFn: (url: string) => void) {
    if (!this.#clientId || !this.#clientSecret || !this.#redirectUri) {
      throw new Error(
        "Cannot initiate authorization because 'clientId', 'clientSecret' or 'redirectUri' is missing"
      );
    }
    const url = `${Auth.authorizationServerAddr}/auth?client_id=${this.#clientId}&redirect_uri=${this.#redirectUri}&response_type=code&scope=openid%20profile%20offline_access`;
    redirectFn(url);
  }

  async handleOAuthCallback(query: {[key: string]: string}, tokenGetParam?: any) {
    if (query.error) {
      if (!this.#onAuthFailure) {
        throw new Error(query.error);
      }
      return this.#onAuthFailure(query.error);
    } else {
      if (!this.#onAuthSuccess) {
        throw new Error(
          "'onAuthSuccess' was not provided. Please provide the 'onAuthSuccess' function"
        );
      }
      const { code } = query;
      const payload: TokenRequestPayload = {
        client_id: this.#clientId!,
        client_secret: this.#clientSecret!,
        code: code,
        grant_type: GrantType.AUTHORIZATION_CODE,
        redirect_uri: this.#redirectUri!,
      };
      const result = await this.#post("/token", payload);
      const { access_token: accessToken, refresh_token: refreshToken } = result;
      return this.#onAuthSuccess(accessToken, refreshToken, tokenGetParam);
    }
  }

  async rotateTokens(tokenGetParam?: any) {
    if (!this.#clientId || !this.#clientSecret) {
      throw new Error(
        "Cannot refresh access token because 'clientId' or 'clientSecret' is missing"
      );
    }
    const payload: TokenRotatePayload = {
      client_id: this.#clientId,
      client_secret: this.#clientSecret,
      refresh_token: await this.getRefreshToken(tokenGetParam),
      grant_type: GrantType.REFRESH_TOKEN,
    };
    const result = await this.#post("/token", payload);
    const { access_token: accessToken, refresh_token: refreshToken } = result;
    if (typeof this.#accessToken === "string") {
      this.#accessToken = accessToken;
    }
    if (typeof this.#refreshToken === "string") {
      this.#refreshToken = refreshToken;
    }
    if (this.#tokenChangeCallback) {
      return this.#tokenChangeCallback(accessToken, refreshToken, tokenGetParam);
    }
  }

  async revokeAccessToken(tokenGetParam?: any) {
    if (!this.#clientId || !this.#clientSecret) {
      throw new Error(
        "Cannot revoke access token because 'clientId' or 'clientSecret' is missing"
      );
    }
    const payload: TokenRevokPayload = {
      token: await this.getAccessToken(tokenGetParam),
      token_type_hint: "access_token",
      client_id: this.#clientId,
      client_secret: this.#clientSecret,
    };
    await this.#post("/revoke", payload);
  }

  async revokeRefreshToken(tokenGetParam?: any) {
    if (!this.#clientId || !this.#clientSecret) {
      throw new Error(
        "Cannot revoke access token because 'clientId' or 'clientSecret' is missing"
      );
    }
    const payload: TokenRevokPayload = {
      token: await this.getRefreshToken(tokenGetParam),
      token_type_hint: "refresh_token",
      client_id: this.#clientId,
      client_secret: this.#clientSecret,
    };
    await this.#post("/revoke", payload);
  }
}
