import { Body, Controller, Post } from '@nestjs/common';
import { AskDto } from '../dto/ask.dto';
import { QuestionsService } from './question.service';

@Controller('questions')
export class QuestionsController {
  constructor(private questionService: QuestionsService) {}

  @Post()
  async ask(@Body() info: AskDto) {
    const result = await this.questionService.ask(info);

    console.log(result);

    return result;
  }
}
