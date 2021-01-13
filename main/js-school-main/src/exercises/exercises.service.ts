import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ExercisesDao } from '../exercises-data/exercises.dao';
import { Exercise, ExerciseInput } from './entities/exercise';
import { ExerciseSolutionChecker } from '../exercises-solution-check/exercise-solution-checker';
import { TaskSolution } from '../exercises-solution-check/entities/task-solution';
import { ExerciseSolutionCheckResult } from '../exercises-solution-check/entities/exercise-solution-check-result';
import { UsersService } from '../users/users.service';
import { ExerciseResult } from '../users/entities/exercise-result';

@Injectable()
export class ExercisesService {
  constructor(
    private readonly exercisesDao: ExercisesDao,
    private readonly exerciseSolutionChecker: ExerciseSolutionChecker,
    private readonly usersService: UsersService,
  ) {}

  async getAll(): Promise<Exercise[]> {
    return this.exercisesDao.getAll();
  }

  async getById(exerciseId: string): Promise<Exercise | null> {
    return this.exercisesDao.getById(exerciseId);
  }

  async create(exercise: ExerciseInput): Promise<Exercise> {
    return this.exercisesDao.create(exercise);
  }

  async checkExerciseSolution(
    exerciseId: string,
    userId: string,
    solution: Map<string, TaskSolution>,
  ): Promise<ExerciseSolutionCheckResult> {
    const exercise = await this.exercisesDao.getById(exerciseId);

    if (exercise === null) {
      throw new HttpException(
        `Exercise ${exerciseId} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const exerciseSolutionCheckResult = await this.exerciseSolutionChecker.checkExercise(
      solution,
      exercise,
    );

    this.usersService.addExerciseResult(
      userId,
      ExerciseResult.fromSolutionCheckResult(
        exerciseId,
        exerciseSolutionCheckResult,
      ),
    );

    return exerciseSolutionCheckResult;
  }
}
