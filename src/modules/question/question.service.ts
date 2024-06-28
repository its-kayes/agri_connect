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

  async AllQuestions() {
    const questions = await this.questionsRepository.find({
      relations: ['user'],
      select: {
        user: {
          id: true,
          name: true,
          address: true,
          bio: true,
          phoneNumber: true,
        },
      },
    });

    return questions;
  }

  async getQuestionsByLocation(location: string) {
    // Question based filter
    const result = await this.questionsRepository.find({
      where: { address: location },
      relations: ['user'],
      select: {
        user: {
          id: true,
          name: true,
          address: true,
          bio: true,
          phoneNumber: true,
        },
      },
    });

    return result;
  }

  async getQuestionsByUserLocation(location: string) {
    const res = await this.questionsRepository
      .createQueryBuilder('questions')
      .leftJoinAndSelect('questions.user', 'user')
      .select([
        'questions',
        'user.id',
        'user.name',
        'user.address',
        'user.bio',
        'user.phoneNumber',
      ])
      .where('user.address = :location', { location })
      .getMany();

    return res;
  }
}
