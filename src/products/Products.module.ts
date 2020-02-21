import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './Products.service';
import { ProductsController } from './Products.controller';
import { ProductSchema } from './Product.model';
import { ProductMediaSchema } from './ProductMedia.model';
import { ProductReviewSchema } from './ProductReview.model';
import { AdminAuthMiddleware } from '../middlewares/AdminAuth.middleware';
import { UsersModule } from '../users/Users.module';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'product', schema: ProductSchema },
      { name: 'product_review', schema: ProductReviewSchema },
      { name: 'product_media', schema: ProductMediaSchema },
    ]),
    UsersModule,
    ConfigModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminAuthMiddleware)

      .forRoutes(
        { path: 'products', method: RequestMethod.POST },
        { path: 'products', method: RequestMethod.DELETE },
        { path: 'products', method: RequestMethod.PUT },
        { path: 'products', method: RequestMethod.PATCH },
      );
  }
}
