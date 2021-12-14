import { NextFunction, Request, Response } from "express";
import { IBasicError, BasicError } from "../utils/basicError";

export function handleErrors (err: IBasicError | Error, req: Request, res: Response, next: NextFunction) {
  //TODO: add something like Winston to log errors in a file.
  const statusCode = (err instanceof BasicError) ? err.statusCode : 500;

  return res.status(statusCode).json({
    status: "error",
    statusCode: statusCode,
    message: err.message,
  });
}
