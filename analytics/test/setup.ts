import { MongoMemoryServer } from 'mongodb-memory-server';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as mongoose from 'mongoose';
import { Event, EventSchema } from '../src/events/schemas/events.schema';

let mongo: MongoMemoryServer;
export let app: INestApplication;

beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider('MONGO_URI')
    .useValue(mongoUri)
    .compile();

  app = moduleFixture.createNestApplication();
  app.enableShutdownHooks();
  await app.init();
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await app.close();
  await mongo.stop();
  await mongoose.connection.close();
});

export const createEvent = async (
  date = '2021-05-23T18:25:43.511Z',
  origin = 'web',
  entityId = 0,
  device = 'CHROME',
  category = 'category',
  action = 'action',
  label = 'label',
  value = 'value',
) => {
  if (entityId === 0) {
    entityId = Math.floor(Math.random() * 1000) + 1;
  }
  const event = mongoose.model(Event.name, EventSchema);
  await new event({
    date,
    origin,
    entityId,
    device,
    data: {
      category,
      action,
      label,
      value,
    },
  }).save();
};
