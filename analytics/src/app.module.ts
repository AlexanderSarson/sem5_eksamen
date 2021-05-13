import { Global, Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseConfigService } from './mongoose.service';
import { mongoUriProvider } from './mongo.provider';

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
    }),
  ],
  controllers: [],
  providers: [mongoUriProvider],
  exports: [mongoUriProvider],
})
export class AppModule {}
