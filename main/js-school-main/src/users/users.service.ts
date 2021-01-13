import { Injectable } from '@nestjs/common';
import { User, UserInput } from './entities/user';
import { UsersDao } from '../users-data/users.dao';

@Injectable()
export class UsersService {
  constructor(private readonly usersDao: UsersDao) {}

  async create(userInput: UserInput): Promise<User> {
    return this.usersDao.create(userInput);
  }

  async getById(id: string): Promise<User | null> {
    return this.usersDao.getById(id);
  }

  async addExerciseResult(id: string, exerciseResult): Promise<void> {
    return this.usersDao.addExerciseResult(id, exerciseResult);
  }
}
