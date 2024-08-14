export class GeneralError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GeneralError';
    this.statusCode = 500;
  }
}

export class BadRequestError extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = 400;
  }
}

export class UnauthorizedError extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}

export class NotFoundError extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

export class ConflictError extends GeneralError {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = 409;
  }
}
