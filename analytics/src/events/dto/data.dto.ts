import { IData } from '../interfaces/data.interface';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EventData implements IData {
  @Field()
  category: string;

  @Field()
  action: string;

  @Field()
  label: string;

  @Field()
  value: string;
}
