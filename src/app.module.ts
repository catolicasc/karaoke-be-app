import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParticipantModule } from './participants/participant.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/karaoke'),
    ParticipantModule,
  ],
})
export class AppModule {}
