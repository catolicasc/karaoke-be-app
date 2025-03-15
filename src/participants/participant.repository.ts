import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Participant, ParticipantDocument } from './participant.schema';
import { MusicStatus } from './enums/music-status.enum';

@Injectable()
export class ParticipantRepository {
    constructor(@InjectModel(Participant.name) private participantModel: Model<ParticipantDocument>) { }

    async findByPhone(phone: string): Promise<Participant | null> {
        return this.participantModel.findOne({ phone }).exec();
    }

    async updateMusicStatus(phone: string, songId: string, status: MusicStatus): Promise<Participant | null> {
        return this.participantModel.findOneAndUpdate(
            { phone, "songsSung._id": songId },
            {
                $set: { "songsSung.$.status": status },
                $inc: { score: status === MusicStatus.SANG ? 10 : status === MusicStatus.SKIPPED ? -5 : 0 }
            },
            { new: true }
        ).exec();
    }

    async addMusic(phone: string, name: string, song: string, band: string): Promise<Participant | null> {
        const now = new Date();
        let participant = await this.participantModel.findOne({ phone }).exec();

        if (!participant) {
            participant = new this.participantModel({
                phone,
                name,
                songsSung: [],
                score: 0,
            });
        }
        participant.songsSung.push({ song, band, status: MusicStatus.QUEUE, lastAttempt: now });
        return participant.save();
    }

    async listAll(): Promise<Participant[]> {
        return this.participantModel.find().exec();
    }

    async findByDate(date: Date): Promise<Participant[]> {
        return this.participantModel
            .find({
                lastAttempt: { $gte: date },
            })
            .exec();
    }

}
