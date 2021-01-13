import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserInput } from './entities/user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getById(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.getById(id);

    if (user == null) {
      throw new HttpException(`User ${id} not found.`, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Post()
  async create(@Body() user: UserInput): Promise<User> {
    return this.usersService.create(user);
  }
}
