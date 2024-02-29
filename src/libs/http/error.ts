export class HttpError extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class HttpNotFoundError extends HttpError {
  constructor(public message: string = "Not Found") {
    super(404, message);
  }
}

export class HttpBadRequestError extends HttpError {
  constructor(public message: string = "Bad Request") {
    super(400, message);
  }
}

export class HttpApiKeyMissingError extends HttpError {
  constructor(public message: string = "API key is missing") {
    super(403, message);
  }
}

export class HttpApiKeyInvalidError extends HttpError {
  constructor(public message: string = "Invalid API key.") {
    super(401, message);
  }
}
