import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { AskDto } from '../dto/ask.dto';
import { QuestionsService } from './question.service';

@Controller('questions')
export class QuestionsController {
  constructor(private questionService: QuestionsService) {}

  @Post()
  async ask(@Body() info: AskDto) {
    try {
      const result = await this.questionService.ask(info);

      return result;
    } catch (error) {
      throw new HttpException('Something went wrong', 520);
    }
  }

  @Get()
  async AllQuestions() {
    try {
      const result = await this.questionService.AllQuestions();

      return result;
    } catch (error) {
      throw new HttpException('Something went wrong', 520);
    }
  }

  @Get('/location/:location')
  async getQuestionsByLocation(@Param('location') location: string) {
    try {
      const result =
        await this.questionService.getQuestionsByLocation(location);

      return result;
    } catch (error) {
      throw new HttpException('Something went wrong', 520);
    }
  }

  @Get('/location/user/:location')
  async getQuestionsByUserLocation(@Param('location') location: string) {
    try {
      const result =
        await this.questionService.getQuestionsByUserLocation(location);

      return result;
    } catch (error) {
      throw new HttpException('Something went wrong', 520);
    }
  }
}
