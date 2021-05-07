import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { IEvent } from '../interfaces/event.interface';
import { IData } from '../interfaces/data.interface';

export type EventDocument = IEvent & Document;

@Schema({ strict: true })
@ObjectType()
class Data implements IData {
  @Field()
  @Prop({ required: true })
  category: string;

  @Field()
  @Prop({ required: true })
  action: string;

  @Field()
  @Prop({ required: true })
  label: string;

  @Field()
  @Prop({ required: true })
  value: string;
}

@ObjectType()
@Schema()
export class Event implements IEvent {
  @Field()
  @Prop({ required: true })
  date: Date;

  @Field()
  @Prop({ required: true })
  origin: string;

  @Field()
  @Prop({ required: true })
  entityId: number;

  @Field()
  @Prop({ required: true })
  device: string;

  @Field()
  @Prop({ required: true })
  data: Data;
}

export const EventSchema = SchemaFactory.createForClass(Event);
