import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserInput } from '../users/entities/user';
import { UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { ExerciseResult } from '../users/entities/exercise-result';

@Injectable()
export class UsersDao {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async create(userInput: UserInput): Promise<User> {
    const userDocument = await this.userModel.create(userInput);

    return UsersDao.toUser(userDocument);
  }

  async getById(id: string): Promise<User | null> {
    const userDocument = await this.userModel.findById(id).exec();

    return userDocument && UsersDao.toUser(userDocument);
  }

  async addExerciseResult(
    id: string,
    exerciseResult: ExerciseResult,
  ): Promise<void> {
    return this.userModel
      .updateOne({ _id: id }, { $push: { exerciseResults: exerciseResult } })
      .exec();
  }

  static toUser(userDocument: UserDocument): User {
    return User.fromPlain({
      ...userDocument.toObject(),
      id: userDocument.id,
    });
  }
}
