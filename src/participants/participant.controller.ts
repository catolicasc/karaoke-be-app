import { Controller, Post, Get, Patch, Body, Param } from '@nestjs/common';
import { ParticipantService } from './participant.service';

@Controller('participants')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  register(@Body() body: { phone: string; name: string; song: string; band: string }) {
    return this.participantService.register(body.phone, body.name, body.song, body.band);
  }

  @Patch(':phone/status')
  updateStatus(@Param('phone') phone: string, @Body() body: { status: 'queue' | 'sang' | 'skipped' }) {
    return this.participantService.updateStatus(phone, body.status);
  }

  @Get()
  listAll() {
    return this.participantService.listAll();
  }

  @Get('today')
  listToday() {
    return this.participantService.listToday();
  }
}
