import { ExceptionFilter, ArgumentsHost, Catch } from '@nestjs/common';
import { ValidationException } from './Validation.exception';
import { Response, Request } from 'express';
@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    return response.status(400).json({
      timestamp: new Date().toISOString(),
      statusCode: 400,
      path: request.url,
      createdBy: 'ValidationFilter',
      validationException: exception.validationErrors,
    });
  }
}
