import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PagesService } from './Pages.service';
import { PagesController } from './Pages.controller';
import { PageSchema } from './Page.model';
import { UsersModule } from '../users/Users.module';
import { ConfigModule } from '../config/config.module';
import { AdminAuthMiddleware } from '../middlewares/AdminAuth.middleware';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'page', schema: PageSchema }]),
    UsersModule,
    ConfigModule,
  ],
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminAuthMiddleware)

      .forRoutes(
        { path: 'pages', method: RequestMethod.POST },
        { path: 'pages', method: RequestMethod.DELETE },
        { path: 'pages', method: RequestMethod.PUT },
        { path: 'pages', method: RequestMethod.PATCH },
      );
  }
}
