import { InjectModel } from '@nestjs/mongoose';
import { ExerciseDocument, TaskDocument } from './exercise.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Exercise, ExerciseInput } from '../exercises/entities/exercise';
import { Task } from '../exercises/entities/task';
import SolutionPart from '../exercises/entities/solution-part';

@Injectable()
export class ExercisesDao {
  constructor(
    @InjectModel('Exercise')
    private readonly exerciseModel: Model<ExerciseDocument>,
  ) {}

  async create(exercise: ExerciseInput): Promise<Exercise> {
    const exerciseDocument = await this.exerciseModel.create(exercise);

    return ExercisesDao.toExercise(exerciseDocument);
  }

  async getById(id: string): Promise<Exercise | null> {
    const exerciseDocument = await this.exerciseModel.findById(id).exec();

    return exerciseDocument && ExercisesDao.toExercise(exerciseDocument);
  }

  async getAll(): Promise<Exercise[]> {
    const exerciseDocuments = await this.exerciseModel.find({});

    return exerciseDocuments.map(ExercisesDao.toExercise);
  }

  async update(id: string, update: Partial<Exercise>): Promise<void> {
    return this.exerciseModel.updateOne({ _id: id }, update).exec();
  }

  async delete(id: string): Promise<void> {
    return this.exerciseModel.deleteOne({ _id: id }).exec();
  }

  private static toExercise(exerciseDocument: ExerciseDocument): Exercise {
    return Exercise.fromPlain({
      ...exerciseDocument.toObject(),
      id: exerciseDocument.id,
      tasks: exerciseDocument.tasks.map(ExercisesDao.toTask),
    });
  }

  private static toTask(taskDocument: TaskDocument): Task {
    return Task.fromPlain({
      ...taskDocument.toObject(),
      id: taskDocument.id,
      solutionParts: taskDocument.solutionParts.map(SolutionPart.fromPlain),
    });
  }
}
