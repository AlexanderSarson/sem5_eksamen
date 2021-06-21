import { Global, Inject, Injectable, Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import {
  MongooseModule,
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';

const mongoUriProvider = {
  provide: 'MONGO_URI',
  useValue: process.env.MONGODB_URI || null,
};

@Injectable()
class MongooseConfigService implements MongooseOptionsFactory {
  constructor(@Inject('MONGO_URI') private mongoUri: string) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.mongoUri,
    };
  }
}

@Global()
@Module({
  imports: [
    EventsModule,
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    GraphQLModule.forRoot({
      include: [EventsModule],
      autoSchemaFile: true,
      cors: {
        credentials: true,
        origin: true,
      },
    }),
  ],
  controllers: [],
  providers: [mongoUriProvider],
  exports: [mongoUriProvider],
})
export class AppModule {}
