import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Participant } from './participant.schema';
import { ParticipantRepository } from './participant.repository';
import { MusicStatus } from './enums/music-status.enum';

@Injectable()
export class ParticipantService {
    private readonly cooldownMinutes = 1;

    constructor(private readonly repository: ParticipantRepository) { }

    async listAll(): Promise<Participant[]> {
        return this.repository.listAll();
    }

    async listToday(): Promise<Participant[]> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return this.repository.findByDate(today);
    }
    async updateMusicStatus(phone: string, songId: string, status: MusicStatus) {
        const updatedParticipant = await this.repository.updateMusicStatus(phone, songId, status);

        if (!updatedParticipant) {
            throw new HttpException('Participant or song not found', HttpStatus.NOT_FOUND);
        }
        return updatedParticipant;
    }

    async addMusic(phone: string, name: string, song: string, band: string) {
        const participant = await this.repository.findByPhone(phone) ?? null;
        const lastMusic = participant?.songsSung?.[participant.songsSung.length - 1];

        const now = new Date();
        if (lastMusic?.lastAttempt) {
            const diffMinutes = (now.getTime() - lastMusic.lastAttempt.getTime()) / 60000;
            if (diffMinutes < this.cooldownMinutes) {
                throw new HttpException(
                    `You must wait ${this.cooldownMinutes - Math.floor(diffMinutes)} minutes before singing again.`,
                    HttpStatus.TOO_MANY_REQUESTS
                );
            }
        }

        return this.repository.addMusic(phone, name, song, band);
    }
}