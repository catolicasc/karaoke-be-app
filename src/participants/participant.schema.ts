import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ParticipantDocument = Participant & Document;

@Schema()
export class Participant {
  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  song: string;

  @Prop({ required: true })
  band: string;

  @Prop({ default: 'queue' })
  status: 'queue' | 'sang' | 'skipped';

  @Prop({ default: 0 })
  score: number;

  @Prop({ type: Date, default: null })
  lastAttempt: Date | null;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
