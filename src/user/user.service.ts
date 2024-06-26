import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hashText } from 'src/util/hashText';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await hashText(createUserDto.password);

    const user = this.userRepository.create(createUserDto);

    const isSave = await this.userRepository.save(user);

    console.log(isSave);

    return isSave;
  }

  async findAll() {
    return await this.userRepository.find({});
  }
}
