import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParticipantModule } from './participants/participant.module';
import * as process from 'node:process';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || '', {
      user: process.env.USER_DB,
      pass: process.env.PASS_DB,
      authSource: process.env.AUTH_SOURCE_DB,
    }),
    ParticipantModule,
  ],
})
export class AppModule {}
