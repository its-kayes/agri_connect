import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hashText } from 'src/util/hashText';
import { EditUserDto } from './dto/edit-user.dto';

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

  async editUser(id: number, info: EditUserDto) {
    const isUpdate = await this.userRepository.update(id, info);

    if (!isUpdate) throw new HttpException('User not found', 404);
    return isUpdate;
  }
}
