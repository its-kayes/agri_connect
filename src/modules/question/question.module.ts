import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from 'src/entities/question.entity';
import { QuestionsController } from './question.controller';
import { QuestionsService } from './question.service';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Questions, User])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
