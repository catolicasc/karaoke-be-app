import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Participant, ParticipantSchema } from './participant.schema';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { ParticipantRepository } from './participant.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Participant.name, schema: ParticipantSchema }])],
  controllers: [ParticipantController],
  providers: [ParticipantService, ParticipantRepository],
})
export class ParticipantModule {}
