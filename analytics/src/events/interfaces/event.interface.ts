import { IData } from './data.interface';

export interface IEvent {
  date: Date;
  origin: string;
  entityId: number;
  device: string;
  data: IData;
}
