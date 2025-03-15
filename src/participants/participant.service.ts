import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Participant } from './participant.schema';
import { ParticipantRepository } from './participant.repository';

@Injectable()
export class ParticipantService {
    private readonly cooldownMinutes = 30;

    constructor(private readonly repository: ParticipantRepository) { }

    async register(phone: string, name: string, song: string, band: string): Promise<Participant> {
        let participant = await this.repository.findByPhone(phone);

        const now = new Date();

        if (participant) {
            if (participant.lastAttempt) {
                const diffMinutes = (now.getTime() - participant.lastAttempt.getTime()) / 60000;
                if (diffMinutes < this.cooldownMinutes) {
                    throw new HttpException(
                        {
                            statusCode: HttpStatus.TOO_MANY_REQUESTS,
                            message: `You must wait ${this.cooldownMinutes - Math.floor(diffMinutes)} minutes before trying again.`,
                        },
                        HttpStatus.TOO_MANY_REQUESTS
                    );
                }
            }

            const updatedParticipant = await this.repository.update(phone, { song, band, lastAttempt: now });

            if (!updatedParticipant) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'Failed to update participant',
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }

            return updatedParticipant;
        } else {
            return this.repository.save({
                phone,
                name,
                song,
                band,
                status: 'queue',
                score: 0,
                lastAttempt: now,
            });
        }
    }

    async updateStatus(phone: string, status: 'queue' | 'sang' | 'skipped'): Promise<Participant | string> {
        const participant = await this.repository.findByPhone(phone);
        if (!participant) return 'Participant not found';

        const newScore =
            status === 'sang' ? (participant.score ?? 0) + 10 :
                status === 'skipped' ? (participant.score ?? 0) - 5 :
                    participant.score;

        const updatedParticipant = await this.repository.update(phone, { status, score: newScore });

        if (!updatedParticipant) return 'Failed to update participant';

        return updatedParticipant;
    }

    async listAll(): Promise<Participant[]> {
        return this.repository.listAll();
    }

    async listToday(): Promise<Participant[]> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return this.repository.findByDate(today);
    }
}