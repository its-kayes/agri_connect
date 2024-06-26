import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

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
}
