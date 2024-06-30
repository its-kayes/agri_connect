import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hashText } from 'src/util/hashText';
import { EditUserDto } from './dto/edit-user.dto';
import { Photo } from 'src/entities/photo.entity';
import { InsertPhotoDto } from './dto/insert-photo.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
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

  async InsertPhoto(info: InsertPhotoDto) {
    // const userList = await this.userRepository.query(`
    //   SELECT * from public."user"
    // `);

    // console.log(userList);

    const user = await this.userRepository.findOne({
      where: { id: info.user },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const photo = this.photoRepository.create({
      ...info,
      user: user,
    });

    const isSave = await this.photoRepository.save(photo);

    if (!isSave) {
      throw new Error('User not found');
    }

    return isSave;
  }
}
