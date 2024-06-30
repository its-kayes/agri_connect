import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { EditUserDto } from './dto/edit-user.dto';
import { InsertPhotoDto } from './dto/insert-photo.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);

    try {
      const result = await this.userService.create(createUserDto);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.userService.findAll();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Patch(':id')
  async editUser(@Param('id') id: string, @Body() editUser: EditUserDto) {
    try {
      const result = await this.userService.editUser(+id, editUser);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('/photo/insert')
  async createUser(@Body() info: InsertPhotoDto) {
    try {
      const result = await this.userService.InsertPhoto(info);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
