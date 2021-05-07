import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { Field, InputType } from '@nestjs/graphql';
import { EventData } from './data.dto';
import { IEvent } from '../interfaces/event.interface';

@InputType()
export class CreateEventDto implements IEvent {
  @Field()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @Field()
  origin: string;

  @Field()
  entityId: number;

  @Field()
  device: string;

  @Field()
  data: EventData;
}
