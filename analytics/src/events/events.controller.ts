import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './schemas/events.schema';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('api/events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get('all')
  async findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Post()
  async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.create(createEventDto);
  }

  @Get(':entityId')
  async findOne(@Param() params): Promise<Event> {
    return this.eventsService.findOne(params.entityId);
  }
}
