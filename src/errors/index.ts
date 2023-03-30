export interface ErrorResponseBody {
  message: string;
}

class ClientError extends Error {
  responseBody: ErrorResponseBody;
  code: number;
  constructor(responseBody: ErrorResponseBody) {
    super(responseBody.message);
    this.code = 400;
    this.responseBody = responseBody;
  }
}

export class BadRequest extends ClientError {
  constructor(responseBody: ErrorResponseBody) {
    super(responseBody);
    this.code = 400;
  }
}

export class Unauthorized extends ClientError {
  constructor(responseBody: ErrorResponseBody) {
    super(responseBody);
    this.code = 401;
  }
}

export class Forbidden extends ClientError {
  constructor(responseBody: ErrorResponseBody) {
    super(responseBody);
    this.code = 403;
  }
}

export class NotFound extends ClientError {
  constructor(responseBody: ErrorResponseBody) {
    super(responseBody);
    this.code = 404;
  }
}

export class UnprocessableEntity extends ClientError {
  constructor(responseBody: ErrorResponseBody) {
    super(responseBody);
    this.code = 422;
  }
}
