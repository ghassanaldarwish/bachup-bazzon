import { NestFactory } from '@nestjs/core';
import RenderFilter from '@server/render/render.filter';
import RenderMiddleware from '@server/render/render.middleware';
import RenderService from '@server/render/render.service';
import { ValidationFilter } from './filters/Validation.filter';
import { FallbackExceptionFilter } from './filters/Fullback.filter';
import { HttpExceptionFilter } from './filters/Http.filter';
import  helmet from 'helmet';
import  rateLimit from 'express-rate-limit';
import  bodyParser from 'body-parser';
import  path from 'path';

import Next from 'next';
import { AppModule } from './app.module';

async function bootstrap() {
  const dev = process.env.NODE_ENV !== 'production';
  const app = Next({ dev });

  await app.prepare();

  const server = await NestFactory.create(AppModule, { cors: true },);

  const renderService = server.get(RenderService);
  server.enableCors();
  server.use(helmet());
  server.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  server.enableCors();
  server.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter(),
  );

  server.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
      index: false,
      redirect: false,
    });

  server.use(bodyParser.json({ limit: '50mb' }));
  server.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 100000,
    }),
  );
  renderService.setRequestHandler(app.getRequestHandler());
  renderService.setRenderer(app.render.bind(app));
  renderService.setErrorRenderer(app.renderError.bind(app));

  renderService.bindHttpServer(server.getHttpAdapter());

  server.use(new RenderMiddleware(renderService).resolve());
  server.useGlobalFilters(
    new RenderFilter(
      renderService.getRequestHandler()!,
      renderService.getErrorRenderer()!
    )
  );
 const PORT = process.env.PORT || 7000;
  await server.listen(PORT);
   console.log('server start with port: ' + PORT);
}

bootstrap();
