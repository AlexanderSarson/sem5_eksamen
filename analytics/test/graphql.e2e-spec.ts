import * as request from 'supertest';
import { app, createEvent } from './setup';

describe('Event controller', () => {
  it('returns all events', async () => {
    await createEvent();
    await createEvent();
    await createEvent();
    const query = `{ 
      findAll 
      {  
        origin
        entityId    
        date   
        data 
        {    
          category   
          action 
          label      
          value   
        }  
      }
    }`;
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query,
      })
      //.set('Accept', 'application/json')
      .expect(200);
    expect(response.body.data.findAll.length).toBe(3);
  });

  it('returns a successful created event', async () => {
    const entityId = 50;
    const variables = `{
      "input": {
          "origin": "test",
          "entityId": ${entityId},
          "date": "2021-03-29T08:25:08.929Z",
          "device": "firefox",
          "data": {
              "category": "send request",
              "action": "action",
              "label": "label",
              "value": "value"
          }
      }
  }`;
    const query = `mutation ($input: CreateEventDto!) {\n  
    create(input: $input) {   
      entityId
      date   
      origin    
      data {      
        action    
      } 
    }
  }`;
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ operationName: null, variables, query })
      .expect(200);
    expect(response.body.data.create.entityId).toBe(entityId);
  });

  it('returns event by entityId', async () => {
    const entityId = 50;
    const variables = `{
      "input": ${entityId}
    }`;
    const query = `query ($input: Int!) {
      findOne(entityId: $input) {   
        date   
        entityId   
        data {     
          category   
        }  
      }
    }`;
    await createEvent(undefined, undefined, entityId);

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables,
        query,
      })
      .expect(200);

    expect(response.body.data.findOne.entityId).toBe(entityId);
  });
});
