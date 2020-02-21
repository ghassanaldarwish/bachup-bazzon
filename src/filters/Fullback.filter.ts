import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response, Request } from 'express';
@Catch()
export class FallbackExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(
      'fallback exception handler triggered',
      JSON.stringify(exception),
    );

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    return response.status(500).json({
      timestamp: new Date().toISOString(),
      statusCode: 500,
      path: request.url,
      createdBy: 'FallbackExceptionFilter',
      errorMessage: exception.message
        ? exception.message
        : 'Unexpected error ocurred',
    });
  }
}
