import { NextFunction, Response, Request } from 'express';
import AppError from './app/errors/AppError';

export default function handleAppError(
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction,
): Response {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  // eslint-disable-next-line
  console.log(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
