import { Request, Response } from "express";
import { IBasicError, BasicError } from "../utils/basicError";

export function handleErrors (err: IBasicError | Error, req: Request, res: Response) {
  //TODO: add something like Winston to log errors in a file.
  if (err instanceof BasicError) {
    return res.status(err.statusCode).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
    });
  } else {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}
