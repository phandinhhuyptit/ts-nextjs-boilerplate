/**
 * @class ApplicationError
 * @classdesc Contains error related to application layer thrown by service classes except ValidationError
 * @type {object}
 * @property {string} code
 * key indicating a list of error types of each field
 * @example
 * // return {
 * //   name: 'ValidationError',
 * //   code: 'LOGIN_FAILED'
 * // }
 * const error = new ApplicationError('LOGIN_FAILED')
 */
export class ApplicationError extends Error {
  public name = 'ApplicationError';
  public code: string;

  constructor(code: string) {
    super();
    this.name = ApplicationError.name;
    this.code = code;
  }
}
