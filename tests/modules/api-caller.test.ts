import { APICaller } from "../../src/modules/api-caller";
import { Auth } from "../../src/modules/auth";
import * as nock from "nock";
import {
  BadRequest,
  Forbidden,
  NotFound,
  Unauthorized,
  UnprocessableEntity,
} from "../../src/errors";

describe("APICaller module", () => {
  let auth: Auth;
  let apiCaller: APICaller;
  let accessTokenMock: jest.Func;
  let refreshTokenMock: jest.Func;

  const WELCOME_API_BASE_URL = "https://api.welcomesoftware.com/v3";

  const camelCaseObject = {
    someKey: "some_value",
    nestedObject: {
      keyOne: "value_one",
      keyTwo: {
        keyTwoOne: "value_two_one",
      },
    },
    anArray: [
      {
        keyOne: "value_one",
      },
    ],
  };

  const snake_case_object = {
    some_key: "some_value",
    nested_object: {
      key_one: "value_one",
      key_two: {
        key_two_one: "value_two_one",
      },
    },
    an_array: [
      {
        key_one: "value_one",
      },
    ],
  };

  const tokenGetParam = { user: "123" };

  beforeEach(() => {
    accessTokenMock = jest
      .fn()
      .mockResolvedValueOnce("some-access-token-1")
      .mockResolvedValueOnce("some-access-token-2");
    refreshTokenMock = jest.fn();
    auth = new Auth({
      accessToken: accessTokenMock,
      refreshToken: refreshTokenMock,
    });
    auth.rotateTokens = jest.fn();

    apiCaller = new APICaller(auth, true);
  });

  afterEach(() => {
    jest.clearAllMocks();
    nock.cleanAll();
  });

  describe("Object Key Case Conversion", () => {
    it("should convert payload object keys from camel case to snake case and reverse for response object keys", async () => {
      const scope = nock("https://api.optimizely-cmp.com/v3", {
        reqheaders: {
          authorization: "Bearer some-access-token-1",
        },
      })
        .post("/some/endpoint", snake_case_object)
        .reply(201, snake_case_object);

      const response = await apiCaller.post(
        "https://api.optimizely-cmp.com/v3/some/endpoint",
        camelCaseObject,
        tokenGetParam
      );

      expect(response).toStrictEqual(camelCaseObject);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(scope.isDone()).toBe(true);
    });

    it("should not convert payload object keys and response object keys", async () => {
      const payload = {
        camelCaseKey: "valueOne",
        snake_case_key: "value_two",
        "Random String": "Value Three",
      };
      const scope = nock("https://api.optimizely-cmp.com/v3", {
        reqheaders: {
          authorization: "Bearer some-access-token-1",
        },
      })
        .post("/some/endpoint", payload)
        .reply(201, payload);
      const apiCaller = new APICaller(auth, true, false);
      const response = await apiCaller.post(
        "https://api.optimizely-cmp.com/v3/some/endpoint",
        payload,
        tokenGetParam
      );

      expect(response).toStrictEqual(payload);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(scope.isDone()).toBe(true);
    });
  });

  describe("GET", () => {
    it("should properly send GET request to the URL and return the json data", async () => {
      const scope = nock("https://api.optimizely-cmp.com/v3", {
        reqheaders: {
          authorization: "Bearer some-access-token-1",
        },
      })
        .get("/some/endpoint")
        .reply(200, snake_case_object);

      const response = await apiCaller.get(
        "https://api.optimizely-cmp.com/v3/some/endpoint",
        tokenGetParam
      );

      expect(response).toStrictEqual(camelCaseObject);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(scope.isDone()).toBe(true);
    });

    it("should use custom port if present in the url", async () => {
      const scope = nock("https://api.optimizely-cmp.com:3000/v3", {
        reqheaders: {
          authorization: "Bearer some-access-token-1",
        },
      })
        .get("/some/endpoint")
        .reply(200, snake_case_object);

      const response = await apiCaller.get(
        "https://api.optimizely-cmp.com:3000/v3/some/endpoint",
        tokenGetParam
      );

      expect(response).toStrictEqual(camelCaseObject);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(scope.isDone()).toBe(true);
    });

    it("should properly send GET request to the relative URL and return the json data", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token-1",
        },
      })
        .get("/some/endpoint")
        .reply(200, snake_case_object);

      const response = await apiCaller.get("/some/endpoint", tokenGetParam);

      expect(response).toStrictEqual(camelCaseObject);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(scope.isDone()).toBe(true);
    });

    it("should follow redirect response", async () => {
      const scope1 = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token-1",
        },
      })
        .get("/some/endpoint")
        .reply(302, undefined, {
          Location:
            "https://api.welcomesoftware.com/v3/some/redirected/endpoint",
        });

      const scope2 = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token-2",
        },
      })
        .get("/some/redirected/endpoint")
        .reply(200, snake_case_object);

      const response = await apiCaller.get("/some/endpoint", tokenGetParam);

      expect(response).toStrictEqual(camelCaseObject);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(scope1.isDone()).toBe(true);
      expect(scope2.isDone()).toBe(true);
    });

    it.each([
      [400, BadRequest],
      [401, Unauthorized],
      [403, Forbidden],
      [404, NotFound],
      [422, UnprocessableEntity],
    ])("should throw error when http code is %s", async (code, errorClass) => {
      const scope1 = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token-1",
        },
      })
        .get("/some/error")
        .reply(code, {
          message: `${errorClass.name} error`,
        });
      const scope2 = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token-2",
        },
      })
        .get("/some/error")
        .reply(code, {
          message: `${errorClass.name} error`,
        });

      const response = apiCaller.get("/some/error", tokenGetParam);

      await expect(response).rejects.toStrictEqual(
        new errorClass({
          message: `${errorClass.name} error`,
        })
      );
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(scope1.isDone()).toBe(true);
      expect(scope2.isDone()).toBe(code === 401 ? true : false);
    });
  });

  describe("POST", () => {
    it("should properly send POST request to the URL and return the json data", async () => {
      const scope = nock("https://api.optimizely-cmp.com/v3", {
        reqheaders: {
          authorization: "Bearer some-access-token-1",
        },
      })
        .post("/some/endpoint", snake_case_object)
        .reply(201, snake_case_object);

      const response = await apiCaller.post(
        "https://api.optimizely-cmp.com/v3/some/endpoint",
        camelCaseObject,
        tokenGetParam
      );

      expect(response).toStrictEqual(camelCaseObject);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(scope.isDone()).toBe(true);
    });

    it("should properly send POST request to the relative URL and return the json data", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token-1",
        },
      })
        .post("/some/endpoint", snake_case_object)
        .reply(201, snake_case_object);

      const response = await apiCaller.post(
        "/some/endpoint",
        camelCaseObject,
        tokenGetParam
      );

      expect(response).toStrictEqual(camelCaseObject);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(scope.isDone()).toBe(true);
    });

    it.each([
      [400, BadRequest],
      [401, Unauthorized],
      [403, Forbidden],
      [404, NotFound],
      [422, UnprocessableEntity],
    ])("should throw error when http code is %s", async (code, errorClass) => {
      const scope1 = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token-1",
        },
      })
        .post("/some/error", snake_case_object)
        .reply(code, {
          message: `${errorClass.name} error`,
        });
      const scope2 = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token-2",
        },
      })
        .post("/some/error", snake_case_object)
        .reply(code, {
          message: `${errorClass.name} error`,
        });

      const response = apiCaller.post(
        "/some/error",
        camelCaseObject,
        tokenGetParam
      );

      await expect(response).rejects.toStrictEqual(
        new errorClass({
          message: `${errorClass.name} error`,
        })
      );
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(scope1.isDone()).toBe(true);
      expect(scope2.isDone()).toBe(code === 401 ? true : false);
    });
  });

  describe("PUT", () => {
    it("should properly send PUT request to the URL and return the json data", async () => {
      const scope = nock("https://api.optimizely-cmp.com/v3", {
        reqheaders: {
          authorization: "Bearer some-access-token-1",
        },
      })
        .put("/some/endpoint", snake_case_object)
        .reply(200, snake_case_object);

      const response = await apiCaller.put(
        "https://api.optimizely-cmp.com/v3/some/endpoint",
        camelCaseObject,
        tokenGetParam
      );

      expect(response).toStrictEqual(camelCaseObject);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(scope.isDone()).toBe(true);
    });

    it("should properly send PUT request to the relative URL and return the json data", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token-1",
        },
      })
        .put("/some/endpoint", snake_case_object)
        .reply(200, snake_case_object);

      const response = await apiCaller.put(
        "/some/endpoint",
        camelCaseObject,
        tokenGetParam
      );

      expect(response).toStrictEqual(camelCaseObject);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(scope.isDone()).toBe(true);
    });

    it.each([
      [400, BadRequest],
      [401, Unauthorized],
      [403, Forbidden],
      [404, NotFound],
      [422, UnprocessableEntity],
    ])("should throw error when http code is %s", async (code, errorClass) => {
      const scope1 = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token-1",
        },
      })
        .put("/some/error", snake_case_object)
        .reply(code, {
          message: `${errorClass.name} error`,
        });
      const scope2 = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token-2",
        },
      })
        .put("/some/error", snake_case_object)
        .reply(code, {
          message: `${errorClass.name} error`,
        });

      const response = apiCaller.put(
        "/some/error",
        camelCaseObject,
        tokenGetParam
      );

      await expect(response).rejects.toStrictEqual(
        new errorClass({
          message: `${errorClass.name} error`,
        })
      );
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(scope1.isDone()).toBe(true);
      expect(scope2.isDone()).toBe(code === 401 ? true : false);
    });
  });

  describe("PATCH", () => {
    it("should properly send PATCH request to the URL and return the json data", async () => {
      const scope = nock("https://api.optimizely-cmp.com/v3", {
        reqheaders: {
          authorization: "Bearer some-access-token-1",
        },
      })
        .patch("/some/endpoint", snake_case_object)
        .reply(200, snake_case_object);

      const response = await apiCaller.patch(
        "https://api.optimizely-cmp.com/v3/some/endpoint",
        camelCaseObject,
        tokenGetParam
      );

      expect(response).toStrictEqual(camelCaseObject);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(scope.isDone()).toBe(true);
    });

    it("should properly send PATCH request to the relative URL and return the json data", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token-1",
        },
      })
        .patch("/some/endpoint", snake_case_object)
        .reply(200, snake_case_object);

      const response = await apiCaller.patch(
        "/some/endpoint",
        camelCaseObject,
        tokenGetParam
      );

      expect(response).toStrictEqual(camelCaseObject);
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(scope.isDone()).toBe(true);
    });

    it.each([
      [400, BadRequest],
      [401, Unauthorized],
      [403, Forbidden],
      [404, NotFound],
      [422, UnprocessableEntity],
    ])("should throw error when http code is %s", async (code, errorClass) => {
      const scope1 = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token-1",
        },
      })
        .patch("/some/error", snake_case_object)
        .reply(code, {
          message: `${errorClass.name} error`,
        });
      const scope2 = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token-2",
        },
      })
        .patch("/some/error", snake_case_object)
        .reply(code, {
          message: `${errorClass.name} error`,
        });

      const response = apiCaller.patch(
        "/some/error",
        camelCaseObject,
        tokenGetParam
      );

      await expect(response).rejects.toStrictEqual(
        new errorClass({
          message: `${errorClass.name} error`,
        })
      );
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(scope1.isDone()).toBe(true);
      expect(scope2.isDone()).toBe(code === 401 ? true : false);
    });
  });

  describe("DELETE", () => {
    it("should properly send DELETE request to the URL and return the json data", async () => {
      const scope = nock("https://api.optimizely-cmp.com/v3", {
        reqheaders: {
          authorization: "Bearer some-access-token-1",
        },
      })
        .delete("/some/endpoint")
        .reply(204);

      const response = await apiCaller.delete(
        "https://api.optimizely-cmp.com/v3/some/endpoint",
        tokenGetParam
      );

      expect(response).toBeNull();
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(scope.isDone()).toBe(true);
    });

    it("should properly send DELETE request to the relative URL and return the json data", async () => {
      const scope = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token-1",
        },
      })
        .delete("/some/endpoint")
        .reply(204);

      const response = await apiCaller.delete("/some/endpoint", tokenGetParam);

      expect(response).toBeNull();
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(scope.isDone()).toBe(true);
    });

    it.each([
      [400, BadRequest],
      [401, Unauthorized],
      [403, Forbidden],
      [404, NotFound],
      [422, UnprocessableEntity],
    ])("should throw error when http code is %s", async (code, errorClass) => {
      const scope1 = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token-1",
        },
      })
        .delete("/some/error")
        .reply(code, {
          message: `${errorClass.name} error`,
        });
      const scope2 = nock(WELCOME_API_BASE_URL, {
        reqheaders: {
          authorization: "Bearer some-access-token-2",
        },
      })
        .delete("/some/error")
        .reply(code, {
          message: `${errorClass.name} error`,
        });

      const response = apiCaller.delete("/some/error", tokenGetParam);

      await expect(response).rejects.toStrictEqual(
        new errorClass({
          message: `${errorClass.name} error`,
        })
      );
      expect(accessTokenMock).toBeCalledWith(tokenGetParam);
      expect(scope1.isDone()).toBe(true);
      expect(scope2.isDone()).toBe(code === 401 ? true : false);
    });
  });
});
