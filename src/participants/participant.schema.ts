import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MusicStatus } from './enums/music-status.enum';

export type ParticipantDocument = Participant & Document;

@Schema()
export class Participant {
    @Prop({ required: true, unique: true })
    phone: string;

    @Prop({ required: true })
    name: string;

    @Prop({ default: 0 })
    score: number;

    @Prop({
        type: [
            {
                song: String,
                band: String,
                status: { type: String, enum: Object.values(MusicStatus) },
                lastAttempt: Date
            }
        ],
        default: []
    })
    songsSung: { song: string; band: string; status: MusicStatus; lastAttempt: Date }[];
}


export const ParticipantSchema = SchemaFactory.createForClass(Participant);
