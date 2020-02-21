import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from './cache/cache.module';
import { ConfigModule } from './config/config.module';
import RenderModule from './render/render.module';

import { PagesModule } from './pages/Pages.module';
import { MongooseModule } from './Mongoose.module';
import { ProductsModule } from './products/Products.module';
import { AuthModule } from './auth/Auth.module';
import { NavbarModule } from './navbar/Navbar.module';

@Module({
  imports: [
    CacheModule,
    ConfigModule,
    RenderModule,
    MongooseModule,
    ProductsModule,
    AuthModule,
    PagesModule,
    NavbarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
