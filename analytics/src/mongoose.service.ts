import { Inject, Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(@Inject('MONGO_URI') private mongoUri: string) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.mongoUri,
    };
  }
}
