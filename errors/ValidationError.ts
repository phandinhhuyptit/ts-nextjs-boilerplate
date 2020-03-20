/**
 * @class ValidationError
 * @classdesc Contains information of all of validation error of an object
 * @type {object}
 * @property {string} name - is always "ValidationError"
 * @property {object} details - object with keys indicating fields having errors, and value for each
 * key indicating a list of error types of each field
 * @example
 * // return {
 * //   name: 'ValidationError',
 * //   details: {
 * //     email: ['INVALID_MIN_LENGTH', 'INVALID_EMAIL'],
 * //     password: ['INVALID_LENGTH'],
 * //     name: ['REQUIRED']
 * //   }
 * // }
 * const error = new ValidationError({
 *   email: ['INVALID_MIN_LENGTH', 'INVALID_EMAIL'],
 *   password: ['INVALID_LENGTH'],
 *   name: ['REQUIRED']
 * })
 *
 * // return {
 * //   name: 'ValidationError',
 * //   details: ['INVALID_FILE_SIZE', 'INVALID_FILE_TYPE']
 * // }
 * const error = new ValidationError(['INVALID_FILE_SIZE', 'INVALID_FILE_TYPE'])
 */
export class ValidationError extends Error {
  public name = 'ValidationError';
  public details: {} | [];

  constructor(details: {} | []) {
    super();
    this.name = ValidationError.name;
    this.details = details;
  }
}

export const errorCode = {
  REQUIRED: 'REQUIRED',
  INVALID: 'INVALID',
  EMAIL_EXISTED: 'EMAIL_EXISTED',
  INVALID_LENGTH: 'INVALID_LENGTH',
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  INVALID_FILE_SIZE: 'INVALID_FILE_SIZE',
};
