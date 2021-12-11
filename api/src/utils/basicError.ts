export interface IBasicError extends Error {
  statusCode: number;
}


export class BasicError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
      super(message);
      this.message = message;
      this.statusCode = statusCode;
    }
  }