import * as request from 'supertest';
import { app, createEvent } from './setup';

describe('Event controller', () => {
  it('returns all events', async () => {
    await createEvent();
    await createEvent();
    await createEvent();
    const response = await request(app.getHttpServer())
      .get('/analytics/api/events/all')
      .send()
      .expect(200);
    expect(response.body.length).toBe(3);
  });

  it('returns a successful created event', async () => {
    const entityId = 50;

    const event = {
      date: '2021-05-23T18:25:43.511Z',
      origin: 'hej',
      entityId,
      device: 'CHROME',
      data: {
        category: 'hello',
        action: 'hello',
        label: 'label',
        value: 'value',
      },
    };
    const response = await request(app.getHttpServer())
      .post('/analytics/api/events')
      .send(event)
      .expect(201);
    expect(response.body.entityId).toBe(entityId);
  });

  it('returns event by entityId', async () => {
    const entityId = 50;
    await createEvent(undefined, undefined, entityId);

    const response = await request(app.getHttpServer())
      .get(`/analytics/api/events/${entityId}`)
      .send()
      .expect(200);

    expect(response.body.entityId).toBe(entityId);
  });
});
