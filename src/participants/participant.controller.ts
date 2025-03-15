import { Controller, Post, Get, Body, Param, Patch } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { MusicStatus } from './enums/music-status.enum';

@Controller('participants')
export class ParticipantController {
    constructor(private readonly participantService: ParticipantService) { }

    @Get()
    listAll() {
        return this.participantService.listAll();
    }

    @Post(':phone/music')
    async addMusic(
        @Param('phone') phone: string,
        @Body() body: { name: string; song: string; band: string }
    ) {
        return this.participantService.addMusic(phone, body.name, body.song, body.band);
    }

    @Patch(':phone/music/:songId/status')
    async updateMusicStatus(
        @Param('phone') phone: string,
        @Param('songId') songId: string,
        @Body() body: { status: MusicStatus }
    ) {
        return this.participantService.updateMusicStatus(phone, songId, body.status);
    }

    @Get('today')
    listToday() {
        return this.participantService.listToday();
    }
}
