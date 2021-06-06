import { EventsService } from './events.service';
import { Event } from './schemas/events.schema';
import { CreateEventDto } from './dto/create-event.dto';

import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private eventsService: EventsService) {}

  @Query(() => [Event])
  async findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Mutation(() => Event)
  async create(@Args('input') createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.create(createEventDto);
  }

  @Query(() => Event)
  async findOne(
    @Args('entityId', { type: () => Int }) entityId: number,
  ): Promise<Event> {
    return this.eventsService.findOne(entityId);
  }
}
