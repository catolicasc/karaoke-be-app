import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Participant, ParticipantDocument } from './participant.schema';

@Injectable()
export class ParticipantRepository {
  constructor(@InjectModel(Participant.name) private participantModel: Model<ParticipantDocument>) {}

  async findByPhone(phone: string): Promise<Participant | null> {
    return this.participantModel.findOne({ phone }).exec();
  }

  async save(participant: Partial<Participant>): Promise<Participant> {
    const createdParticipant = new this.participantModel(participant);
    return createdParticipant.save();
  }

  async update(phone: string, updateData: Partial<Participant>): Promise<Participant | null> {
    return this.participantModel.findOneAndUpdate({ phone }, updateData, { new: true }).exec();
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
