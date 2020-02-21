import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Request, Response } from 'express';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('HTTP exception handler triggered', JSON.stringify(exception));

    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = exception.getStatus();

    return response.status(statusCode).json({
      status: statusCode,
      createdBy: 'HttpExceptionFilter',
      timestamp: new Date().toISOString(),
      path: request.url,
      errorMessage: exception.message.message,
    });
  }
}
