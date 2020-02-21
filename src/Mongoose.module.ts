import { MongooseModule as Mongoose } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

export const MongooseModule = Mongoose.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (config: ConfigService) => ({
    uri: config.mongoURL,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }),
  inject: [ConfigService],
});
