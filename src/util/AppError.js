const logger = require("pino")();

module.exports = class AppError extends (
  Error
) {
  constructor(message, httpCode, description, isOperational) {
    super(message);

    Error.captureStackTrace(this, this.constructor);
    this.httpCode = httpCode || 500;
    this.description = description;
    this.isOperational = isOperational;
  }
};

class ErrorHandler {
  async handleError(err) {
    logger.error(err);
    await sendMailToAdminIfCritical();
    await saveInOpsQueueIfCritical();
    await determineIfOperationalError();
  }

  isTrustedError(error) {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }
}
