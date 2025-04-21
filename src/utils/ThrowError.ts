export class ThrowError extends Error {
  status: number;
  code: string;
  isToast: boolean;

  constructor(
    status: number = 500,
    message: string = "Internal Server Error",
    isToast: boolean = true,
    code: string = "INTERNAL_SERVER_ERROR"
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = status;
    this.isToast = isToast;
    Error.captureStackTrace(this, this.constructor);
  }
}
