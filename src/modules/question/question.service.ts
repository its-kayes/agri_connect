import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions } from 'src/entities/question.entity';
import { Repository } from 'typeorm';
import { AskDto } from '../dto/ask.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Questions)
    private readonly questionsRepository: Repository<Questions>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async ask(info: AskDto) {
    // Fetch the user entity using the user ID from AskDto
    const user = await this.userRepository.findOne({
      where: { id: info.user },
    });
    if (!user) {
      throw new Error('User not found');
    }

    // Create a new question entity and set the properties
    const question = this.questionsRepository.create({
      ...info,
      user: user,
    });

    // Save the question entity
    const isSave = await this.questionsRepository.save(question);

    return isSave;
  }
}
